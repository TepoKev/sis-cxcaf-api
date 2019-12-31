import Sequelize from "sequelize";
import { sequelize } from "../database/database";

const Marca = sequelize.define('marca', {
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
}, {
  timestamps : false,
  tableName: 'marca'
});

export default Marca;