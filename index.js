import express from 'express';
import { pokemonList } from './db.js';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello, Pokemon!');
});

app.get('/api/pokemons/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const pokemon = pokemonList.find(p => p.id === id);
  if (pokemon) {
    res.send("Vous avez demandé le pokemon " + pokemon.name);
  } else {
    res.status(404).send('Pokemon not found');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});