import { Sequelize } from 'sequelize';
import { pokemon_model } from './models/pokemon.js';
import { pokemonList } from './db.js';

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

const initDb = () => sequelize.sync({ force: true }).then(() => { 
  console.log('Synchronisation du modele Pokemon réussie');
  pokemonList.map(pokemon => Pokemon.create({
    name: pokemon.name,
    hp: pokemon.hp,
    cp: pokemon.cp,
    picture: pokemon.picture,
    types: pokemon.type.join()
    }).then(pokemon => console.log(`Pokemon ${pokemon.name} has been created`)));
  })
  .catch(err => console.error('Echec', err)
);

export { initDb, Pokemon };