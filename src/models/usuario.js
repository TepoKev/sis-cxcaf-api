import Sequelize from "sequelize";
import { sequelize } from "../database/database";

const usuarioObj = {
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
};

const Usuario = sequelize.define('usuario', usuarioObj, {
  timestamps : false,
  tableName: 'usuario'
});

export { Usuario, usuarioObj };