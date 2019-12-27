import Sequelize from "sequelize";

export const sequelize = new Sequelize("institucion_financiera", "root", "password", {
    host : "localhost",
    dialect : "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      }
});