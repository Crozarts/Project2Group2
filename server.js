// Dependencies
var express = require("express");
var fs = require("fs");

// Set up the Express App
var app = express();
var PORT = process.env.PORT || 8080;

// Requiring models for syncing
var db = require("./models");


// force: true will drop the table if it already exists
// db.sequelize.sync({
//     force: true
// }).then(() => {
//     //Give any image name here.
//     var imageData = null;
//     try {
//         imageData = fs.readFileSync(__dirname + '/assets/images');
//     } catch (error) {
//         console.log(error);
//     }
//     if (!imageData) {
//         db.Image.create({
//             type: 'png',
//             name: 'JSA Banner',
//             data: imageData
//         }).then(image => {
//             try {
//                 fs.writeFileSync(__dirname + '/assets/tmp', image.data);

//                 // exit node.js app
//                 // process.exit(0);
//             } catch (e) {
//                 console.log(e);
//             }
//         }).catch(function (err) {
//             console.log(err);
//         })
//     }
// });


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
db.sequelize.sync().then(function () {
    app.listen(PORT, function () {
        console.log("App listening on PORT " + PORT);
    });
});