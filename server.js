const express = require('express');
const app = express();
const Pokemon = require('./models/pokemon.js');
const methodOverride = require("method-override")

// MIDDLEWARE
app.use(methodOverride("_method"))
app.use(express.urlencoded({extended: false}))

// INDEX
app.get('/pokedex', (req, res) => {
    res.render('index.ejs', { 
        data: Pokemon,
    });
});


// NEW
app.get('/pokedex/new', (req, res) => {
    res.render('new.ejs')
});

// DELETE
app.delete('/pokedex/:id', (req, res) => {
    Pokemon.splice(req.params.id, 1)
        res.redirect('/pokedex');
})

// UPDATE 
app.put("/pokedex/:id", (req, res) => {
    Pokemon[req.params.id.id] = req.body.id,
    Pokemon[req.params.id.name] = req.body.name,
    Pokemon[req.params.id.type] = req.body.type,
    Pokemon[req.params.id.stats.hp] = req.body.stats.hp,
    Pokemon[req.params.id.stats.attack] = req.body.stats.attack,
    Pokemon[req.params.id.stats.defense] = req.body.stats.defense,
    res.redirect('/pokedex')
});

// CREATE
app.post('/pokedex', (req, res) => {
    Pokemon.push(req.body)
    res.redirect('/pokedex')
});
    

// EDIT
app.get("/pokedex/:id/edit", (req, res) =>{
    res.render("edit.ejs",
    {
        pokemon: Pokemon[req.params.id],
        index: req.params.id,
    });
});


    
    // SHOW
    app.get('/pokedex/:id', (req, res) => {
        res.render('show.ejs', { 
            data: Pokemon[req.params.id],
            index: req.params.id,
        });
    });
    
    // Listener
    const PORT = 3000;
    app.listen(PORT, () => {
        console.log(`This server is listening on port: ${PORT}`)
    });