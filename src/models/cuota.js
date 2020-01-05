import Sequelize from "sequelize";
import { sequelize } from "../database/database";
import { Empleado } from "./empleado";
import { Credito } from "./credito";

const cuotaObj = {
  id: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    primaryKey: true,
    autoIncrement : true
  },
  fecha: {
    type: Sequelize.DATEONLY,
    allowNull: true
  },
  enMora: {
    type: Sequelize.INTEGER(1),
    allowNull: false
  },
  idEmpleado: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    references: {
      model: 'empleado',
      key: 'id'
    }
  },
  estado: {
    type: Sequelize.ENUM('cancelado','pendiente'),
    allowNull: false
  },
  idCredito: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    references: {
      model: 'credito',
      key: 'id'
    }
  }
};

const Cuota = sequelize.define('cuota', cuotaObj, {
  timestamps: false,
  tableName: 'cuota'
});

Cuota.belongsTo( Empleado, { foreignKey : "idEmpleado" } );
Cuota.belongsTo( Credito, { foreignKey : "idCredito" } );

export { Cuota, cuotaObj };