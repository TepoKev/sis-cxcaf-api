import Sequelize from "sequelize";
import { sequelize } from "../database/database";

const departamentoObj = {
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

const Departamento = sequelize.define('departamento', departamentoObj, {
  timestamps: false,
  tableName: 'departamento'
});

export { Departamento, departamentoObj };