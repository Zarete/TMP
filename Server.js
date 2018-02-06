let express = require("express");
let path = require("path");
let fs = require("fs");

app = express();

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/public/css'));
app.use(express.static(__dirname + '/public/js'));
app.use("/", index)

app.get("/acceuil", (req, res) => {
    console.log("Welcome");
    res.sendFile(__dirname + "/public/index.html");
})

app.get("/subpart/proteins", (req, res) => {
            console.log("Proteins")
            let files = fs.readdir(__dirname + "/public", (err, files) => {
            fs.writeFile(__dirname + "/public/test.txt", files.map(x =>  x));
            })

            res.sendFile(__dirname + "/public/subpart/proteins/proteins.html");
})

app.listen(8080);