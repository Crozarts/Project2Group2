var db = require("../models");

module.exports = function (app) {
    // Find all Merchants and return them to the user with res.json
    app.get("/api/merchants", function (req, res) {
        db.Merchant.findAll({}).then(function (dbMerchant) {
            res.json(dbMerchant);
        });
    });

    app.get("/api/merchants/:id", function (req, res) {
        // Find one Merchant with the id in req.params.id and return them to the user with res.json
        db.Merchant.findOne({
            where: {
                id: req.params.id
            }
        }).then(function (dbMerchant) {
            res.json(dbMerchant);
        });
    });

    app.post("/api/merchants", function (req, res) {
        // Create an Merchant with the data available to us in req.body
        console.log(req.body);
        db.Merchant.create(req.body).then(function (dbMerchant) {
            res.json(dbMerchant);
        });
    });

    app.delete("/api/merchants/:id", function (req, res) {
        // Delete the Merchant with the id available to us in req.params.id
        db.Merchant.destroy({
            where: {
                id: req.params.id
            }
        }).then(function (dbMerchant) {
            res.json(dbMerchant);
        });
    });

};