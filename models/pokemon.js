export const pokemon_model = (sequelize, DataTypes) => {
  return sequelize.define('pokemon', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    hp: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: { msg: "utilisez uniquement des nombres entiers pour les points de vie" },
        notNull: { msg: "les points de vie ne doivent pas être nuls" }
      }
    },
    cp: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: { msg: "utilisez uniquement des nombres entiers pour les dégâts" },
        notNull: { msg: "les dégâts ne doivent pas être nuls" }
      }
    },
    picture: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    types: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    timestamps: true,
    createdAt: 'created',
    updatedAt: false
  });
};