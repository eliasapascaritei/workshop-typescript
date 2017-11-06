"use strict";
/**
 * Created by elias on 11/4/17.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
var admin = require("firebase-admin");
var UserActions_1 = require("./UserActions");
var PokemonActions_1 = require("./PokemonActions");
var FireBaseAdmin = /** @class */ (function () {
    function FireBaseAdmin(keyLoc) {
        this.keyLocation = keyLoc;
        this.accountConfig = JSON.parse(fs.readFileSync(path.join(__dirname, "../../" + keyLoc)).toString());
        this.firebase = admin.initializeApp({
            credential: admin.credential.cert(this.accountConfig),
            databaseURL: "http://" + this.accountConfig.project_id + ".firebaseio.com"
        });
        this.userActions = new UserActions_1.UserActions(this.firebase);
        this.pokemonActions = new PokemonActions_1.PokemonActions(this.firebase);
    }
    return FireBaseAdmin;
}());
exports.FireBaseAdmin = FireBaseAdmin;
