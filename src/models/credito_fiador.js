import Sequelize from "sequelize";
import { sequelize } from "../database/database";
import { Credito } from "./credito";
import { Fiador } from "./fiador";

const creditoFiadorObj = {
  id: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    primaryKey: true,
    autoIncrement : true
  },
  idFiador: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    references: {
      model: 'fiador',
      key: 'id'
    }
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

const CreditoFiador = sequelize.define('credito_fiador', creditoFiadorObj, {
  timestamps: false,
  tableName: 'credito_fiador'
});

CreditoFiador.belongsTo( Credito, { foreignKey : "idCredito" } );
CreditoFiador.belongsTo( Fiador, { foreignKey : "idFiador" }) ;

export { CreditoFiador, creditoFiadorObj };