// Dependencies
var db = require("../models");

module.exports = function (app) {

    // GET route for getting all of the products
    app.get("/api/products", function (req, res) {
        var query = {};
        if (req.query.merchant_id) {
            query.MerchantId = req.query.merchant_id;
        }
        db.Product.findAll({
            where: query
        }).then(function (dbProduct) {
            res.json(dbProduct);
        });
    });

    // Get route for retrieving a single product
    app.get("/api/products/:id", function (req, res) {
        db.Product.findOne({
            where: {
                id: req.params.id
            }
        }).then(function (dbProduct) {
            console.log(dbProduct);
            res.json(dbProduct);
        });
    });

    // POST route for saving a new product
    app.post("/api/products", function (req, res) {
        db.Product.create(req.body).then(function (dbProduct) {
            res.json(dbProduct);
        });
    });

    // DELETE route for deleting products
    app.delete("/api/products/:id", function (req, res) {
        db.Product.destroy({
            where: {
                id: req.params.id
            }
        }).then(function (dbProduct) {
            res.json(dbProduct);
        });
    });

    // PUT route for updating products
    app.put("/api/products", function (req, res) {
        db.Product.update(
            req.body, {
                where: {
                    id: req.body.id
                }
            }).then(function (dbProduct) {
            res.json(dbProduct);
        });
    });
};