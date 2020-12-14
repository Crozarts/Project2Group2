const {
    Sequelize
} = require("sequelize/types")

module.exports = function (sequelize, DataTypes) {
    var Product = sequelize.define("product", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 50]
            }
        },

        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },

        sell: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },

        trade: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    });

    return Product
};