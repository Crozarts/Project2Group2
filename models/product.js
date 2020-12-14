const {
    Sequelize
} = require("sequelize/types")

module.exports = function (sequelize, DataTypes) {
    var Product = sequelize.define("Product", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },

        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },

        description: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
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

    Product.associate = function (models) {
        // We're saying that a Product should belong to an Merchant
        // A Product can't be created without an Merchant due to the foreign key constraint
        Product.belongsTo(models.Merchant, {
            foreignKey: {
                allowNull: false
            }
        });
    };


    return Product;
};