"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var morgan = require("morgan");
var bodyParser = require("body-parser");
var App = /** @class */ (function () {
    function App(config) {
        this.config = config;
        this.app = express();
    }
    App.prototype.init = function () {
        this.app.set("port", this.config.PORT || 3000);
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(morgan('dev'));
    };
    App.prototype.startService = function () {
        this.app.get("/", function (req, res) {
            res.send({ serviceStaturs: 'working' });
        });
    };
    App.prototype.startServer = function () {
        var _this = this;
        this.app.listen(this.app.get("port"), function () {
            console.log("Racheta pe port " + _this.app.get("port"));
        });
    };
    App.prototype.allowCorse = function () {
        this.app.use(function (req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-auth");
            next();
        });
    };
    return App;
}());
exports.App = App;
