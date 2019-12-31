import Sequelize from "sequelize";
import { sequelize } from "../database/database";

const Departamento = sequelize.define('departamento', {
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
}, {
  timestamps: false,
  tableName: 'departamento'
});

export default Departamento;