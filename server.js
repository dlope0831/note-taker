const express = require('express');
const { notes } = require('./Develop/data/db.json');

// const htmlRoutes = require('./routes/htmlRoutes');
// const apiRoutes = require('./routes/apiRoutes');
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static('public'));

// app.use('/api', apiRoutes);
// app.use('/', htmlRoutes);

app.get('/api/notes', (req, res) => {
    let result = notes;
        res.json(result);
    
  });

app.post('/api/notes', (req, res) =>{
    req.body = notes.length.toString();
  // if any data in req.body is incorrect, send 400 error back

    const notes = createNewNote(req.body, notes);
    res.json(notes);
});


app.listen(PORT, () => {
    console.log(`Note server now on port ${PORT}!`);
});

