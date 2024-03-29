import Sequelize from "sequelize";
import { sequelize } from "../database/database";
import { Departamento } from "./departamento";
import { Marca } from "./marca";
import { Sucursal } from "./sucursal";
import { TipoActivo } from "./tipo_activo";

const activoFijoObj = {
  id: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    primaryKey: true,
    autoIncrement : true
  },
  nombre: {
    type: Sequelize.STRING(60),
    allowNull: false
  },
  descripcion: {
    type: Sequelize.STRING(300),
    allowNull: false
  },
  procedencia: {
    type: Sequelize.ENUM('NUEVO','USADO','DONADO NUEVO','DONADO USADO'),
    allowNull: false
  },
  precio: {
    type: Sequelize.DECIMAL,
    allowNull: false
  },
  idDepartamento: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    references: {
      model: 'departamento',
      key: 'id'
    }
  },
  idTipo: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    references: {
      model: 'tipo_activo',
      key: 'id'
    }
  },
  idMarca: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    references: {
      model: 'marca',
      key: 'id'
    }
  },
  idSucursal: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    references: {
      model: 'sucursal',
      key: 'id'
    }
  },
  fechaAdquisicion: {
    type: Sequelize.DATEONLY,
    allowNull: false
  },
  uso: {
    type: Sequelize.INTEGER(11),
    allowNull: true,
  },
};

const ActivoFijo = sequelize.define('activo_fijo', activoFijoObj, {
  timestamps: false,
  tableName: 'activo_fijo'
});

ActivoFijo.belongsTo( Departamento, { foreignKey : "idDepartamento" } );
ActivoFijo.belongsTo( Marca, { foreignKey : "idMarca" } );
ActivoFijo.belongsTo( Sucursal, { foreignKey : "idSucursal" } );
ActivoFijo.belongsTo( TipoActivo, { foreignKey : "idTipo" } );

export { ActivoFijo, activoFijoObj };