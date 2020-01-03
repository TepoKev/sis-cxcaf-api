import Sequelize from "sequelize";
import { sequelize } from "../database/database";
import { ActivoFijo } from "./activo_fijo";

const activoFijoBajaObj = {
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
}

const ActivoFijoBaja = sequelize.define('activo_fijo_baja', activoFijoBajaObj, {
  timestamps: false,
  tableName: 'activo_fijo_baja'
});

ActivoFijoBaja.belongsTo( ActivoFijo, { foreignKey : "idActivoFijo" } );

export { ActivoFijoBaja, activoFijoBajaObj };