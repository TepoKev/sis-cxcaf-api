import Sequelize from "sequelize";
import { sequelize } from "../database/database";

const rolObj = {
  id: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    primaryKey: true,
    autoIncrement : true
  },
  nombre: {
    type: Sequelize.STRING(50),
    allowNull: false
  }
};

const Rol = sequelize.define('rol', rolObj, {
  timestamps : false,
  tableName: 'rol'
});

export { Rol, rolObj };