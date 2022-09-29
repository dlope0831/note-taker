const express = require('express');
const path = require('path');
const fs = require('fs');
const util = require('util');
const getRoutes = require('./Develop/Routes/routes');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static('./Develop/public'));
app.use('/', getRoutes);

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
        const notes = JSON.parse(data);

        notes.push(note);
        console.log(notes)
        return notes 
    })
    .then (function(notes) {
        writeFileAsync("./develop/db/db.json", JSON.stringify(notes))
        res.json(notes)
    })
    .catch(function(err) {
        res.status(500).json(err)
    })
});


app.listen(PORT, () => {
    console.log(`Note server now on port ${PORT}!`);
});

