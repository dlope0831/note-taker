const express = require('express');
const path = require('path');
const fs = require('fs');
const util = require('util');
const { json } = require('express');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static('./develop/public'));

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);


app.get("/api/notes", function(req, res) {
readFileAsync("./develop/db/db.json", "utf-8")
.then(function(data) {
    notes= [].concat(JSON.parse(data))
    res.json(notes)
    })
});

app.post("/api/notes", function(req,res) {
    const note = req.body;
    readFileAsync("./develop/db/db.json", "utf-8")
    .then(function(data) {
        const notes = [].concat(JSON.parse(data));
        for (let i = 0; i < notes.length; i++);
        notes.push(note);
        return notes 
    })
    .then (function(notes) {
        writeFileAsync("./develop/db/db.json", JSON.stringify(notes))
        res.json(notes);
    })
})


app.listen(PORT, () => {
    console.log(`Note server now on port ${PORT}!`);
});

