import Sequelize from "sequelize";
import { sequelize } from "../database/database";

const Usuario = sequelize.define('usuario', {
  id: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    primaryKey: true,
    autoIncrement : true
  },
  username: {
    type: Sequelize.STRING(24),
    allowNull: false,
    unique: true
  },
  password: {
    type: Sequelize.STRING(255),
    allowNull: false
  }
}, {
  timestamps : false,
  tableName: 'usuario'
});

export default Usuario;