// This file initiates the connection to MYSQL

// Dependencies
var Sequelize - require("sequelize");

var sequelize = new Sequelize("trade_post", "root", "password", {
    host: "localhost",
    port: 3306,
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
});

// Exports the connection to other files to use
module.exports = sequelize;