var fileFromServer;

function initialLoad(){
    var xhttp = new XMLHttpRequest();
}

function load(){
    // var x = document.createElement("INPUT");
    // x.setAttribute("type", "file");
    // document.getElementById("buttons").appendChild(x);
    // var loadButton = document.getElementsByID("load");   // Get the first <h1> element in the document
    // var att = document.createAttribute("class");       // Create a "class" attribute
    // att.value = "browse";                           // Set the value of the class attribute
    // loadButton.setAttributeNode(att);
    var doc = document.forms["proteinList"].elements["selection"];
    var pdb = doc[doc.selectedIndex].text;

    if(pdb == "Browse for a new file..."){
      var elem = document.getElementById("hiddenInput");
      var evt = document.createEvent("MouseEvents");
      evt.initEvent("click", true, false);
      elem.dispatchEvent(evt);
    }
    else{
      console.log("loading file from server...");
      getFileFromServer("PDB/PDB_BLOB/"+pdb, function(text) {
        if (text === null) {
            console.log("an error occured");
        }
        else {
          console.log("loading file...");
          // pdb = fileFromServer.response;
          console.log(pdb);
          stage.loadFile("PDB/PDB_BLOB/"+pdb, {defaultRepresentation: true}).then( function( comp){
              console.log("loading successful");
              listeProts.push(comp);
              // displayProteins();
              addChoice("mySelect1");
              addChoice("mySelect2");
          });
        }
      });
    }


}

function getFileFromServer(url, doneCallback) {

    fileFromServer = new XMLHttpRequest();
    fileFromServer.onreadystatechange = handleStateChange;
    fileFromServer.open("GET", url, true);
    fileFromServer.send();

    function handleStateChange() {
        if (fileFromServer.readyState === 4) {
            doneCallback(fileFromServer.status == 200 ? fileFromServer.responseText : null);
        }
    }
}

function loadFromUser(){
    var elem = document.getElementById("hiddenInput");
    pdb = elem.files[0];
    console.log(elem.files);
    console.log(pdb);
    stage.loadFile(pdb, {defaultRepresentation: true}).then( function( comp){
        console.log("loading successful");
        listeProts.push(comp);
        // displayProteins();
        addChoice("mySelect1");
        addChoice("mySelect2");
    });
}

function addChoice(selectName){
    var dropdownSelected = document.getElementById(selectName);
    var option = document.createElement("option");
    option.class = "option";
    option.text = listeProts[listeProts.length-1].name;
    dropdownSelected.add(option);
}

function clearChoice(selectName){
    dropdownSelected = document.getElementById(selectName);
    while (dropdownSelected.children[1]) {
        dropdownSelected.removeChild(dropdownSelected.children[1]);
    }
}

// function displayProteins(){
//     var names = "";
//     console.log(listeProts);
//     for (i=0;i<listeProts.length;i++) {
//         console.log(listeProts[i].name);
//         names += listeProts[i].name + "<br />";
//     }
//     document.getElementById("proteins").innerHTML = names;
// }

function changeRepresentation(representation){
    stage.eachComponent(function( o ){
        o.removeAllRepresentations();
        o.addRepresentation( representation );
        o.autoView();
    });
}

function clear(){
    stage.removeAllComponents();
    listeProts = [];
    // displayProteins();
    clearChoice("mySelect1");
    clearChoice("mySelect2");
}

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function dropdown(){
    document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {

    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
  // if (!event.target.matches('.dockButton') && !event.target.matches('.dockProts') && !event.target.matches('.option')) {
  //
  //   var dropdowns = document.getElementsByClassName("dockProts");
  //   var i;
  //   for (i = 0; i < dropdowns.length; i++) {
  //     var openDropdown = dropdowns[i];
  //     if (openDropdown.classList.contains('show')) {
  //       openDropdown.classList.remove('show');
  //     }
  //   }
  // }
}

document.addEventListener("load", initialLoad());

function dock(){
    var prot1 = document.getElementById("mySelect1")
    var prot1pdb = prot1.options[prot1.selectedIndex].text

    var prot2 = document.getElementById("mySelect2")
    var prot2pdb = prot2.options[prot2.selectedIndex].text

    if (prot1pdb === "Select first protein..." || prot2pdb === "Select second protein..."){
        alert("Please select two protein files for docking.")
    }
    else{
        window.confirm("Confirm that you want to dock?");
        // TODO : Docking code
    }
}


document.getElementById("load").addEventListener("click", load);
document.getElementById("clear").addEventListener("click", clear);
document.getElementById("backbone").addEventListener("click", function(){
    changeRepresentation("backbone");
});
document.getElementById("ballStick").addEventListener("click", function(){
    changeRepresentation("ball+stick");
});
document.getElementById("cartoon").addEventListener("click", function(){
    changeRepresentation("cartoon");
});
//document.getElementById("dock").addEventListener("click", dock);

/*resets the value to address navigating away from the page
and choosing to upload the same file */
$('#hiddenInput').on('click touchstart' , function(){
    $(this).val('');
});


//Trigger now when you have selected any file
$("#hiddenInput").change(function(e) {
  loadFromUser();
});

// $("#hiddenFileName").change(function(e){
//   loadFromServer();
// });
