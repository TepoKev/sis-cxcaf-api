import Sequelize from "sequelize";
import { sequelize } from "../database/database";
import Empleado from "./empleado";
import Credito from "./credito";

const Cuota = sequelize.define('cuota', {
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
}, {
  timestamps: false,
  tableName: 'cuota'
});

Cuota.belognsTo( Empleado, { foreignKey : "idEmpleado" } );
Cuota.belognsTo( Credito, { foreignKey : "idCredito" } );

export default Cuota;