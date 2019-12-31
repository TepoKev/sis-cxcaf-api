import Sequelize from "sequelize";
import {sequelize} from "../database/database";

const Politica = sequelize.define('politica', {
  id: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    primaryKey: true,
    autoIncrement : true
  },
  tasaMora: {
    type: Sequelize.DECIMAL,
    allowNull: false
  },
  diasIncobrabilidad: {
    type: Sequelize.INTEGER(11),
    allowNull: false
  },
  montoInicial: {
    type: Sequelize.DECIMAL,
    allowNull: false
  },
  montoFinal: {
    type: Sequelize.DECIMAL,
    allowNull: false
  },
  diasCobro: {
    type: Sequelize.INTEGER(11),
    allowNull: false
  },
  tasaInteres: {
    type: Sequelize.DECIMAL,
    allowNull: false
  }
}, {
  timestamps : false,
  tableName: 'politica'
});

export default Politica;