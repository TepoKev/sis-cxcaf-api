import Sequelize from "sequelize";
import { sequelize } from "../database/database";
import { Rol } from "./rol";

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
  },
  idRol: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    references: {
      model: 'rol',
      key: 'id'
    }
  }
};

const Usuario = sequelize.define('usuario', usuarioObj, {
  timestamps : false,
  tableName: 'usuario'
});

Usuario.belongsTo( Rol, { foreignKey : 'idRol' } );

export { Usuario, usuarioObj };