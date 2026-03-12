import express from 'express';
import morgan from 'morgan';
import { pokemonList } from './db.js';
import { success, getUniqueId } from './helper.js';

const app = express();
const port = 3000;

const logger = (req, res, next) => {
  console.log(`url de la req = ${req.url}`);
  next();
}

app.use(logger);
app.use(morgan('dev'));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, Pokemon!');
});

app.get('/api/pokemons', (req, res) => {
  console.log(`nombre de pokemon dans notre db ${pokemonList.length}`);
  res.status(200).json(success(`nombre de pokemon = ${pokemonList.length}`, pokemonList));
});

app.get('/api/pokemons/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const pokemon = pokemonList.find(p => p.id === parseInt(id));
  const message = "Un pokemon a bien été trouvé";
  res.json(success(message, pokemon));
});

app.post('/api/pokemons', (req, res) => {
  const id = getUniqueId(pokemonList);
  const pokemonCreated = { ...req.body, ...{ id: id, created: new Date() } };
  pokemonList.push(pokemonCreated);
  const message = `Le pokemon ${pokemonCreated.name} a bien été créé.`;
  res.json(success(message, pokemonCreated));
});

app.put('/api/pokemon/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const pokemonUpdated = { ...req.body, id: id };
  pokemonList[id] = pokemonUpdated;
  const message = `Le pokemon ${pokemonUpdated.name} a bien été modifié.`;
  res.json(success(message, pokemonUpdated));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});