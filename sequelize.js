import { Sequelize } from 'sequelize';
import { pokemon_model } from './models/pokemon.js';
import user_model from './models/user.js';
import { pokemonList } from './db.js';
import bcrypt from 'bcrypt';

const sequelize = new Sequelize(
  process.env.DB_NAME || 'pokedex',
  process.env.DB_USER || 'root',
  process.env.DB_PASSWORD || '',
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: process.env.DB_DIALECT || 'mariadb',
    dialectOptions: {
      timezone: 'Etc/GMT-2',
      allowPublicKeyRetrieval: true,
    },
    logging: false
  }
);

sequelize.authenticate().then(() => console.log('Connection has been established successfully.')).catch(err => console.error('Unable to connect to the database:', err));

const Pokemon = pokemon_model(sequelize, Sequelize.DataTypes);
const User = user_model(sequelize, Sequelize.DataTypes);

const initDb = () => sequelize.sync({ force: true }).then(_ => {
  pokemonList.map(pokemon => {
    Pokemon.create({
      name: pokemon.name,
      hp: pokemon.hp,
      cp: pokemon.cp,
      picture: pokemon.picture,
      types: pokemon.type.join()
    })
      .then(pokemon => console.log(pokemon.toJSON()))
      .catch(error => console.error(`bug de creation dun pokemon avec l'erreur ${error}`));
  });
  console.log('La base de donnée a bien été initialisée !');

  bcrypt.hash('pikachu', 10).then(hash => {
    return User.create({
      username: 'pikachu',
      password: hash,
    });
  })
    .then(user => console.log(user.toJSON()))
    .catch(error => console.error(`erreur lors de la create de l'utilisateur ${error}`));
})
  .catch(err => console.error('Echec', err));

export { initDb, Pokemon, User };