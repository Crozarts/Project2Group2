// Dependencies
var path = require("path");

//Routes
module.export = function (app) {
    //Each route below handles the HTML page the user gets sent to

    //index route loads index.html
    app.get("/", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/index.html"));
    });

    //market route loads market.html
    app.get("/market", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/market.html"));
    });

    //myStore route loads myStore.html
    app.get("/myStore", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/myStore.html"));
    });

    //user route loads user.html
    app.get("/user", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/user.html"));
    });

};