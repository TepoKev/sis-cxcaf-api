import Sequelize from "sequelize";
import { sequelize } from "../database/database";
import { Persona } from "./persona";

const clienteObj = {
  id: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    primaryKey: true,
    autoIncrement : true
  },
  tipo: {
    type: Sequelize.ENUM('Persona Natural','Persona Jurídica'),
    allowNull: false
  },
  clasificacion: {
    type: Sequelize.STRING(1),
    allowNull: false
  },
  idPersona: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    references: {
      model: 'persona',
      key: 'id'
    },
    unique: true
  }
};

const Cliente = sequelize.define('cliente', clienteObj, {
  timestamps: false,
  tableName: 'cliente'
});

Cliente.belongsTo( Persona, { foreignKey: 'idPersona' } );

export { Cliente, clienteObj };