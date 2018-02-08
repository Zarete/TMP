let express = require("express");
let path = require("path");
let fs = require("fs");

app = express();

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/public/css'));
app.use(express.static(__dirname + '/public/js'));

app.get("/", (req, res) => {
    console.log("Welcome");
    res.sendFile(__dirname + "/public/index.html");
})

app.get("/subpart/life_cycle", (req, res) => {
    console.log("Life Cycle")
    res.sendFile(__dirname + "/public/subpart/life_cycle/life_cycle.html");
})

app.get("/subpart/annotation", (req, res) => {
    console.log("Genome Annotation")
    res.sendFile(__dirname + "/public/subpart/annotation/annotation.html");
})

app.get("/subpart/proteins", (req, res) => {
            console.log("Proteins")
            res.sendFile(__dirname + "/public/subpart/proteins/proteins.html");
})

app.get("/subpart/metabolism", (req, res) => {
    console.log("Metabolism")
    res.sendFile(__dirname + "/public/subpart/metabolism/metabolism.html");
})

app.get("/subpart/movement", (req, res) => {
    console.log("Movement")
    res.sendFile(__dirname + "/public/subpart/movement/movement.html");
})

fs.readdir(__dirname + "/public/subpart/proteins/PDB/PDB_BLOB", (err, files) => {
    fs.writeFile(__dirname + "/public/subpart/proteins/proteinList.txt", files.map(x =>  x));
  })

app.listen(process.env.PORT || 8080);