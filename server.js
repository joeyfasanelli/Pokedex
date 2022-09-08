const express = require('express');
const app = express();
const Pokemon = require('./models/pokemon.js');


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
app.put('/pokedex/:id', (req, res) => {
    Pokemon.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
        },
        (error, updatedPokemon) => {
            res.redirect(`/pokedex/${req.params.id}`)
        }
        )
    })

// CREATE
    
    app.post('/pokedex', (req, res)=>{
        Pokemon.create(req.body, (error, createdPokemon)=>{
            res.redirect('/pokedex');
        });
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
            pokemon: Pokemon,
        });
    });
    
    // Listener
    const PORT = 3000;
    app.listen(PORT, () => {
        console.log(`This server is listening on port: ${PORT}`)
    });