// Dependencies
var express = require("express");

// Set up the Express App
var app = express();
var PORT = process.env.PORT || 8080;

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

// Starts teh server to begin listening
app.listen(PORT, function () {
    console.log("App listening on PORT" + PORT);
});