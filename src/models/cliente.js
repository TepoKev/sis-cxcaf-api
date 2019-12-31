import Sequelize from "sequelize";
import { sequelize } from "../database/database";
import Persona from "./persona";
import Usuario from "./usuario";

const Cliente = sequelize.define('cliente', {
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
  idPersona: {
    type: Sequelize.INTEGER(11),
    allowNull: true,
    references: {
      model: 'persona',
      key: 'id'
    },
    unique: true
  },
  clasificacion: {
    type: Sequelize.STRING(1),
    allowNull: false
  },
  idUsuario: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    references: {
      model: 'usuario',
      key: 'id'
    },
    unique: true
  }
}, {
  timestamps: false,
  tableName: 'cliente'
});

Cliente.belongsTo( Persona, { foreignKey: 'idPersona' } );
Cliente.belongsTo( Usuario, { foreignKey : 'idUsuario' } );

export default Cliente;