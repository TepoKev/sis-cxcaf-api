import Sequelize from "sequelize";
import { sequelize } from "../database/database";
import Persona from "./persona";

const Cliente = sequelize.define('cliente', {
  id: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  tipo: {
    type: Sequelize.ENUM('Persona Natural','Persona Jurídica'),
    allowNull: false
  },
  idPersona: {
    type: Sequelize.INTEGER(11),
    allowNull: true,
    references: {
      model: 'persona',
      key: 'id'
    }
  },
  clasificacion: {
    type: Sequelize.STRING(1),
    allowNull: false
  }
}, {
  timestamps: false,
  tableName: 'cliente'
});

Cliente.belongsTo(Persona, {foreignKey: 'idPersona'});

export default Cliente;