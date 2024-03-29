import Sequelize from "sequelize";
import { sequelize } from "../database/database";

const tipoActivoObj = {
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

const TipoActivo = sequelize.define('tipo_activo', tipoActivoObj, {
  timestamps : false,
  tableName: 'tipo_activo'
});

export { TipoActivo, tipoActivoObj };