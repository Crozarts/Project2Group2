module.exports = function (sequelize, Datatypes) {
    var Product = sequelize.define("Product", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 50]
            }
        }
        // // Creates a "product" model that matches up with DB
        //     price: Sequelize.DECIMAL(10, 2),
        //     sell: Sequelize.BOOLEAN,
        //     trade: Sequelize.BOOLEAN
    });
    return Product
};