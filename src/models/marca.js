import Sequelize from "sequelize";
import { sequelize } from "../database/database";

const marcaObj = {
  id: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    primaryKey: true,
    autoIncrement : true
  },
  nombre: {
    type: Sequelize.STRING(25),
    allowNull: false
  }
};

const Marca = sequelize.define('marca', marcaObj, {
  timestamps : false,
  tableName: 'marca'
});

export { Marca, marcaObj };