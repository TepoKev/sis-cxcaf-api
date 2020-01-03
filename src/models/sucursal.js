import Sequelize from "sequelize";
import { sequelize } from "../database/database";

const sucursalObj = {
  id: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    primaryKey: true,
    autoIncrement : true
  },
  nombre: {
    type: Sequelize.STRING(25),
    allowNull: false
  },
  codigo: {
    type: Sequelize.STRING(5),
    allowNull: false
  }
};

const Sucursal = sequelize.define('sucursal', sucursalObj, {
  timestamps : false,
  tableName: 'sucursal'
});

export { Sucursal, sucursalObj };