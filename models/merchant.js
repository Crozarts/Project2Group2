module.exports = function(sequelize, DataTypes) {
    var Merchant = sequelize.define("Merchant", {
      // Giving the Merchant model a name of type STRING
      name: DataTypes.STRING
    });
  
    Merchant.associate = function(models) {
      // Associating Merchant with Posts
      // When an Merchant is deleted, also delete any associated Posts
      Merchant.hasMany(models.Post, {
        onDelete: "cascade"
      });
    };
  
    return Merchant;
  };
  