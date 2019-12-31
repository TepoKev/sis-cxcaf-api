import Sequelize from "sequelize";
import { sequelize } from "../database/database";
import Persona from "./persona";

const Empleado = sequelize.define('empleado', {
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
  },
  idUsuario: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    references: {
      model: 'usuario',
      key: 'id'
    },
    unique: true
  }
}, {
  timestamps: false,
  tableName: 'empleado'
});

Empleado.belongsTo(Persona, { foreignKey : "idPersona" });

export default Empleado;