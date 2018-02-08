let express = require("express");
let path = require("path");
let fs = require("fs");
let getIP = require('ipware')().get_ip;

app = express();

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/public/css'));
app.use(express.static(__dirname + '/public/js'));

app.get("/", (req, res) => {
    console.log("Welcome");
    res.sendFile(__dirname + "/public/index.html");
})

app.get("/subpart/life_cycle", (req, res) => {
    let user_ip = getIP(req)
    console.log("Life Cycle : " + user_ip.clientIp.substring(7));
    res.sendFile(__dirname + "/public/subpart/life_cycle/life_cycle.html");
})

app.get("/subpart/annotation", (req, res) => {
    let user_ip = getIP(req)
    console.log("Genome Annotation : " + user_ip.clientIp.substring(7))
    res.sendFile(__dirname + "/public/subpart/annotation/annotation.html");
})

app.get("/subpart/proteins", (req, res) => {
    let user_ip = getIP(req)
    console.log("Proteins : " + user_ip.clientIp.substring(7))
    res.sendFile(__dirname + "/public/subpart/proteins/proteins.html");
})

app.get("/subpart/metabolism", (req, res) => {
    let user_ip = getIP(req)
    console.log("Metabolism : " + user_ip.clientIp.substring(7))
    res.sendFile(__dirname + "/public/subpart/metabolism/metabolism.html");
})

app.get("/subpart/movement", (req, res) => {
    let user_ip = getIP(req)
    console.log("Movement : " + user_ip.clientIp.substring(7))
    res.sendFile(__dirname + "/public/subpart/movement/movement.html");
})

fs.readdir(__dirname + "/public/subpart/proteins/PDB/PDB_BLOB", (err, files) => {
    fs.writeFile(__dirname + "/public/subpart/proteins/proteinList.txt", files.map(x => x));
})

app.listen(process.env.PORT || 8080);