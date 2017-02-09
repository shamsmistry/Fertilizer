"use strict";

var fs = require("fs");
var path = require("path");
var Sequelize = require("sequelize");
//var env       = process.env.NODE_ENV || "development";
//var config    = require(path.join(__dirname, '..', 'config', 'config.json'))[env];
//var dbConnection = require('../helpers/dbConnection');
var sequelize = require('../helpers/dbConnection').sequelizeConn();
var __dirname = './models/sequelize/';
var db = {};
fs
    .readdirSync(__dirname)
    .filter(function (file) {
        return (file.indexOf(".") !== 0) && (file !== "index.js");
    })
    .forEach(function (file) {
        __dirname = './sequelize/';
        var model = sequelize.import(path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach(function (modelName) {
    if ("associate" in db[modelName]) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;

module.exports = db;