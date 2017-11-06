"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PokemonActions = /** @class */ (function () {
    function PokemonActions(firebase) {
        this.firebase = firebase;
        this.dbRef = firebase.database().ref('workshop-typescript').child('pokemons');
    }
    PokemonActions.prototype.getAll = function (userId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.dbRef.child(userId).once('value', function (snap) {
                var pokes = snap.val();
                var pokesArray = [];
                for (var key in pokes) {
                    if (pokes.hasOwnProperty(key)) {
                        pokesArray.push(Object.assign({ id: key }, pokes[key]));
                    }
                }
                resolve(pokesArray);
            });
        });
    };
    PokemonActions.prototype.getOne = function (userId, id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.dbRef.child(userId).child(id).once('value', function (snap) {
                resolve(snap.val());
            });
        });
    };
    PokemonActions.prototype.addPokemon = function (userId, pok) {
        return this.dbRef.child(userId).push(pok);
    };
    PokemonActions.prototype.updatePokemon = function (userId, id, pok) {
        return this.dbRef.child(userId).child(id).update(pok);
    };
    PokemonActions.prototype.deletePokemon = function (userId, id) {
        return this.dbRef.child(userId).child(id).remove();
    };
    return PokemonActions;
}());
exports.PokemonActions = PokemonActions;
