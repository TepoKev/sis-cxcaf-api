import Sequelize from "sequelize";
import { sequelize } from "../database/database";
import { Persona } from "./persona";

const empleadoObj = {
  id: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    primaryKey: true,
    autoIncrement : true
  },
  cargo: {
    type: Sequelize.ENUM('administrador/a','empleado/a'),
    allowNull: false
  },
  idPersona: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    references: {
      model: 'persona',
      key: 'id'
    },
    unique: true
  }
};

const Empleado = sequelize.define('empleado', empleadoObj , {
  timestamps: false,
  tableName: 'empleado'
});

Empleado.belongsTo( Persona, { foreignKey : "idPersona" } );

export { Empleado, empleadoObj };