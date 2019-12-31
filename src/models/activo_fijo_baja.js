import Sequelize from "sequelize";
import { sequelize } from "../database/database";
import ActivoFijo from "./activo_fijo";

const ActivoFijoBaja = sequelize.define('activo_fijo_baja', {
  idActivoFijo: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    primaryKey: true,
    references: {
      model: 'activo_fijo',
      key: 'id'
    }
  },
  motivo: {
    type: Sequelize.STRING(100),
    allowNull: false
  },
  fecha: {
    type: Sequelize.DATEONLY,
    allowNull: false
  }
}, {
  timestamps: false,
  tableName: 'activo_fijo_baja'
});

ActivoFijoBaja.belongsTo( ActivoFijo, { foreignKey : "idActivoFijo" } );

export default ActivoFijoBaja;