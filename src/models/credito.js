import Sequelize from "sequelize";
import { sequelize } from "../database/database";
import { Politica } from "./politica";
import { Cliente } from "./cliente";
import { Empleado } from "./empleado";

const creditoObj = {
  id: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    primaryKey: true,
    autoIncrement : true
  },
  monto: {
    type: Sequelize.DECIMAL,
    allowNull: false
  },
  fecha: {
    type: Sequelize.DATEONLY,
    allowNull: false
  },
  cobro: {
    type: Sequelize.DECIMAL,
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
  idPolitica: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    references: {
      model: 'politica',
      key: 'id'
    }
  },
  estado: {
    type: Sequelize.ENUM('cancelado','en cobro','incobrable'),
    allowNull: false
  },
  idCliente: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    references: {
      model: 'cliente',
      key: 'id'
    }
  },
  tipoCredito: {
    type: Sequelize.ENUM('PERSONAL','HIPOTECARIO','NOMINA','DE INVERSION','DE VIVIENDA','DE CONSUMO','DE ESTUDIO','DE AVIO','AGRARIO'),
    allowNull: false
  }
};

const Credito = sequelize.define('credito', creditoObj, {
  timestamps: false,
  tableName: 'credito'
});

Credito.belongsTo(Politica , { foreignKey : "idPolitica" });
Credito.belongsTo(Cliente , { foreignKey : "idCliente" });
Credito.belongsTo(Empleado , { foreignKey : "idEmpleado" });

export { Credito, creditoObj };