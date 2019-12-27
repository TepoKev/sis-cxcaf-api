import Sequelize from "sequelize";
import {sequelize} from "../database/database";
import Profesion from "../models/profesion";

const Persona = sequelize.define('persona', {
  id: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  nombres: {
    type: Sequelize.STRING(50),
    allowNull: false
  },
  apellidos: {
    type: Sequelize.STRING(50),
    allowNull: false
  },
  dui: {
    type: Sequelize.STRING(12),
    allowNull: false
  },
  telefono: {
    type: Sequelize.STRING(12),
    allowNull: false
  },
  genero: {
    type: Sequelize.ENUM('masculino','femenino','',''),
    allowNull: false
  },
  salario: {
    type: Sequelize.DECIMAL,
    allowNull: false
  },
  idProfesion: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    references: {
      model: 'profesion',
      key: 'id'
    }
  },
  nit: {
    type: Sequelize.STRING(20),
    allowNull: false
  },
  fechaN: {
    type: Sequelize.DATEONLY,
    allowNull: false
  },
  direccion: {
    type: Sequelize.STRING(250),
    allowNull: false
  },
  zona: {
    type: Sequelize.ENUM('occidental','central','paracentral','oriental'),
    allowNull: false
  },
  estadoCivil: {
    type: Sequelize.ENUM('soltero/a','casado/a','acompañado/a','viudo/a','divorciado/a'),
    allowNull: false
  }
}, {
  timestamps: false,
  tableName: 'persona'
});

Persona.belongsTo(Profesion, {foreignKey: 'idProfesion'});

export default Persona;