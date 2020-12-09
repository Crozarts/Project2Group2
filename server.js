// Dependencies
var express = require("express");

// Set up the Express App
var app = express();
var PORT = process.env.PORT || 8080;

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

//Static directory to be served
app.use(express.static("Project2Group2/public"));

//Routes
require("./Project2Group2/routes/apiRoutes.js")(app);

// HTML routing to serve different HTML files
require(".Project2Group2/routes/htmlRoutes.js")(app);

// Starts teh server to begin listening
app.listen(PORT, function () {
    console.log("App listening on PORT" + PORT);
});

module.exports = express;