import express from 'express';
import morgan from 'morgan';
import { success, getUniqueId } from './helper.js';
import dotenv from 'dotenv';
import { initDb, Pokemon } from './sequelize.js';
import { pokemonList } from './db.js';
import * as pokemonRoutes from './routes/findAllPokemons.js';

dotenv.config();

initDb();

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

// Routes 
pokemonRoutes.findAllPokemons(app);

app.get('/api/pokemons/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const pokemon = pokemonList.find(p => p.id === parseInt(id));
  const message = "Un pokemon a bien été trouvé";
  res.json(success(message, pokemon));
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