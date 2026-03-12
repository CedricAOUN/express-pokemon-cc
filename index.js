import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { initDb } from './sequelize.js';
import * as pokemonsRoutes from './routes/pokemons-routes.js';
import * as usersRoutes from './routes/users-routes.js';
import authMdlr from './auth/auth.js';

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

usersRoutes.userLogin(app);

app.use(authMdlr);

pokemonsRoutes.findAllPokemons(app);
pokemonsRoutes.createPokemon(app);
pokemonsRoutes.findPokemonByPk(app);
pokemonsRoutes.updatePokemon(app);
pokemonsRoutes.deletePokemon(app);

app.use((req, res) => {
  const message = "Impossible de trouver la ressource demandée !";
  res.status(404).json({ message });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});