import Sequelize from "sequelize";
import {sequelize} from "../database/database";

const TipoActivo = sequelize.define('tipo_activo', {
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
  timestamps : false,
  tableName: 'tipo_activo'
});

export default TipoActivo;