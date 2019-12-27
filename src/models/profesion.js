import Sequelize from "sequelize";
import {sequelize} from "../database/database";

const Profesion = sequelize.define('profesion', {
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
}, {
  timestamps: false,
  tableName: 'profesion'
});

export default Profesion;