// Dependencies
var path = require("path");

//Routes
module.exports = function (app) {
    //Each route below handles the HTML page the user gets sent to

    //index route loads index.html
    app.get("/", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/home.html"));
    });

    //market route loads market.html
    app.get("/market", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/market.html"));
    });

    //myStore route loads myStore.html
    app.get("/activesales", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/activesales.html"));
    });

    //user route loads user.html
    app.get("/user", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/user.html"));
    });

};