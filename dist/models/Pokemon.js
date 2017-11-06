"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Gender_1 = require("../constants/Gender");
/**
 * Created by elias on 11/4/17.
 */
var Pokemon = /** @class */ (function () {
    function Pokemon(pok) {
        // this.id = pok.id;
        this.name = pok.name;
        this.height = pok.height;
        this.weight = pok.weight;
        Gender_1.validateGender(pok.gender);
        this.gender = pok.gender;
        this.abilities = pok.abilities;
    }
    Pokemon.prototype.canEqual = function (that) {
        return this.name === that.name;
    };
    Pokemon.prototype.equals = function (that) {
        return this.canEqual(that) &&
            this.abilities === that.abilities;
    };
    return Pokemon;
}());
exports.Pokemon = Pokemon;
