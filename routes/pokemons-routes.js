import { Pokemon } from "../sequelize.js";

export function findAllPokemons(app) {
  app.get('/api/pokemons', (req, res) => {
    Pokemon.findAll().then(pokemons => {
      const message = 'La liste des pokémons a bien été récupérée.';
      res.json({ message, data: pokemons });
    });
  });
}

export function findPokemonByPk(app) {
    app.get('/api/pokemons/:id', (req, res) => {
      let pokemonId = req.params.id;
      Pokemon.findByPk(pokemonId)
        .then(pokemon => {
          if (pokemon === null) {
            const message = "Aucun pokemon n'a été trouvé !";
            return res.status(404).json({ message });
          }
          const message = 'Un pokémon a bien été trouvé.';
          res.json({ message, data: pokemon });
        })
        .catch(error => {
          const message = "Aucun pokemon n'a été trouvé !";
          res.status(500).json({ message, data: error });
        });
    });
  }

export function createPokemon(app) {
  app.post('/api/pokemons', (req, res) => {
    Pokemon.create(req.body)
      .then(pokemon => {
        const message = `Le pokémon ${req.body.name} a bien été créé.`;
        res.json({ message, data: pokemon });
      });
  });
}

export function updatePokemon(app) {
  app.put('/api/pokemons/:id', (req, res) => {
    const id = req.params.id;
    Pokemon.update(req.body, {
      where: { id: id }
    })
      .then(_ => {
        return Pokemon.findByPk(id).then(pokemon => {
          const message = `Le pokémon ${pokemon.name} a bien été modifié.`;
          res.json({ message, data: pokemon });
        });
      })
      .catch(error => {
        const msg = "le pokemon n'a pas pu être modifié.";
        res.status(500).json({ msg, data: error });
      });
  });
}

export function deletePokemon(app) {
  app.delete('/api/pokemons/:id', (req, res) => {
    const id = req.params.id;
    Pokemon.destroy({
      where: { id: id }
    })
      .then(_ => {
        const message = `Le pokémon avec l'identifiant n°${id} a bien été supprimé.`;
        res.json({ message, data: id });
      });
  });
}