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
    let files = fs.readdir(__dirname + "/public", (err, files) => {
        fs.writeFile(__dirname + "/public/test.txt", files.map(x =>  x));
    })
})

app.get("/subpart/proteins", (req, res) => {
            console.log("Proteins")
            res.sendFile(__dirname + "/public/subpart/proteins/proteins.html");
})

app.listen(process.env.PORT || 8080);