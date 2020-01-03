import Sequelize from "sequelize";
import { sequelize } from "../database/database";
import { Persona } from "./persona";

const fiadorObj = {
  id: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    primaryKey: true,
    autoIncrement : true
  },
  idPersona: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    references: {
      model: 'persona',
      key: 'id'
    },
    unique : true
  }
};

const Fiador = sequelize.define('fiador', fiadorObj, {
  timestamps: false,
  tableName: 'fiador'
});

Fiador.belongsTo(Persona, { foreignKey : "idPersona" });

export { Fiador, fiadorObj };