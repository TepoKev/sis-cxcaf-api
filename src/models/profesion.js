import Sequelize from "sequelize";
import {sequelize} from "../database/database";

const profesionObj = {
  id: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: Sequelize.STRING(45),
    allowNull: false
  }
};

const Profesion = sequelize.define('profesion', profesionObj, {
  timestamps: false,
  tableName: 'profesion'
});

export { Profesion, profesionObj };