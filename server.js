// Dependencies
var express = require("express");

// Set up the Express App
var app = express();
var PORT = process.env.PORT || 8080;

// Requiring models for syncing
var db = require("./models");

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

//Static directory to be served
app.use(express.static("./public"));

//Routes
// HTML routing to serve different HTML files
require("./routes/htmlRoutes.js")(app);

require("./routes/apiRoutes.js")(app);

// Syncing our sequelize model and then starting our Express app
db.sequelize.sync().then(function() {
    app.listen(PORT, function () {
        console.log("App listening on PORT " + PORT);
    });
});