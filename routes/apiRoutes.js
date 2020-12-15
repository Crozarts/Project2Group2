// Dependencies
var db = require("../models");

module.exports = function (app) {

    // get all products
    app.get("/api/all", function (req, res) {
        db.Product.findAll({}).then(function (results) {
            res.json(results);
        });
    });

    // Get a specific product
    app.get("/api/:product", function (req, res) {
        db.Product.findAll({
            where: {
                name: req.param.product
            }
        }).then(function (results) {
            res.json(results);
        });
    });

    // Get all products for sale
    app.get("/api/:sell", function (req, res) {
        db.Product.findAll({
            where: {
                sell: true
            }
        }).then(function (results) {
            res.json(results);
        });
    });

    // Get all products for trade
    app.get("/api/:trade", function (req, res) {
        db.Product.findAll({
            where: {
                trade: true
            }
        }).then(function (results) {
            res.json(results);
        });
    });

    // Get all products $50 or less
    app.get("/api/products/cheaper", function (req, res) {
        db.Product.findAll({
            where: {
                price: {
                    $lte: 50
                }
            },
            order: [
                ["price", "DESC"]
            ]
        }).then(function (results) {
            res.json(results);
        });
    });

    // Get all products $50 or more
    app.get("/api/products/expensive", function (req, res) {
        db.Product.findAll({
            where: {
                price: {
                    $gte: 50
                }
            },
            order: [
                ["price", "ASC"]
            ]
        }).then(function (results) {
            res.json(results);
        });
    });

    // Add a product
    app.post("/api/new", function (req, res) {
        db.Product.create({
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            sell: req.body.sell,
            trade: req.body.trade
        }).then(function (results) {
            res.json(results);
        });
    });

    // Delete a product
    app.delete("/api/product/:id", function (req, res) {
        db.Product.destroy({
            where: {
                id: req.params.id
            }
        }).then(function () {
            res.end();
        });
    });
};