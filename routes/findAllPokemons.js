import { Pokemon } from "../sequelize.js";

const findAllPokemons = (app) => {
  app.get('/api/pokemons', (req, res) => {
    Pokemon.findAll().then(pokemons => {
      const message = 'La liste des pokémons a bien été récupérée.';
      res.json({ message, data: pokemons });
    })
  });
}

export { findAllPokemons };