import Sequelize from "sequelize";
import { sequelize } from "../database/database";
import { Credito } from "./credito";

const garantiaObj = {
  id: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    primaryKey: true,
    autoIncrement : true
  },
  nombre: {
    type: Sequelize.STRING(50),
    allowNull: false
  },
  valoracionReal: {
    type: Sequelize.DECIMAL,
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

const Garantia = sequelize.define('garantia', garantiaObj, {
  timestamps: false,
  tableName: 'garantia'
});

Garantia.belongsTo( Credito, { foreignKey : "idCredito" } );

export { Garantia, garantiaObj };