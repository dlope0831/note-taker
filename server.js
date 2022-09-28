const express = require('express');
const path = require('path');
const fs = require('fs');
const util = require('util');

const PORT = process.env.PORT || 3001;
const app = express();


app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static('./develop/public'));


// app.get("/api/notes", function(req, res) {

// })

app.listen(PORT, () => {
    console.log(`Note server now on port ${PORT}!`);
});

