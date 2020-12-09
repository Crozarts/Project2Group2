// Dependencies

// Sequelize (capital) reference the standard library
var Sequelize = require("sequelize");
// sequelize (lowercase) reference my connection to DB

// Creates a "product" model that matches up with DB
var Product = sequelize.define("product", {
    name: Sequelize.STRING,
    price: Sequelize.DECIMAL(10, 2),
    sell: Sequelize.BOOLEAN,
    trade: Sequelize.BOOLEAN
});

// Syncs with DB
Product.sync();

// Makes the Product Model available for other files (will also create a table)
module.exports = Product;