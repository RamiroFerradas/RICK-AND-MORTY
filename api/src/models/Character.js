const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "character",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false, // CAMPO OBLIGATORIO
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        // allowNull: false,
      },
      species: {
        type: DataTypes.STRING,
        // allowNull: false,
      },
      origin: {
        type: DataTypes.STRING,
        // allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        // allowNull: false,
      },
      created: {
        type: DataTypes.STRING,
        // allowNull: false,
      },
      created: {
        type: DataTypes.STRING,
        // allowNull: false,
      },
      createdInDb: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      createdAt: false,
      updatedAt: false,
    }
  );
};