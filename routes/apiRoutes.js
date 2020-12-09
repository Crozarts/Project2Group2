// Dependencies
const express = require("express");

var app = express();

app.get("/", function(req,res){
    res.send("../public/index");
});

app.get("/market", function(req,res){
    res.send("../public/market");
});

app.get("/myStore", function(req,res){
    res.send("../public/myStore");
});

app.get("/user", function(req,res){
    res.send("../public/user");
});