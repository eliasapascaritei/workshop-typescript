"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Pokemon_1 = require("../models/Pokemon");
var firebaseAuth_1 = require("../seurity/firebaseAuth");
/**
 * Created by elias on 11/4/17.
 */
var PokemonRoutes;
(function (PokemonRoutes) {
    function init(app, firebase) {
        var authMiddleware = firebaseAuth_1.addMiddlewareFActory(firebase);
        app.get('/api/pokemons', authMiddleware, function (req, res) {
            firebase.pokemonActions.getAll(req.user.user_id)
                .then(function (pokemonList) {
                res.send(pokemonList);
            }).catch(function (err) {
                res.status(500).send(err);
            });
        });
        app.get('/api/pokemon/:id', authMiddleware, function (req, res) {
            firebase.pokemonActions.getOne(req.user.user_id, req.params.id)
                .then(function (pokemon) {
                res.send(pokemon);
            }).catch(function (err) { res.status(500).send(err); });
        });
        app.post('/api/pokemon', authMiddleware, function (req, res) {
            try {
                var newPokemon_1 = new Pokemon_1.Pokemon(req.body);
                firebase.pokemonActions.addPokemon(req.user.user_id, newPokemon_1)
                    .then(function (snap) {
                    res.send({
                        success: true,
                        pokemon: Object.assign({ id: snap.key }, newPokemon_1)
                    }).catch(function (err) { res.status(500).send(err); });
                });
            }
            catch (err) {
                res.status(500).send("err:" + err);
            }
        });
        app.put('/api/pokemon/:id', authMiddleware, function (req, res) {
            firebase.pokemonActions.updatePokemon(req.user.user_id, req.params.id, req.body)
                .then(function (snap) {
                res.send({ success: true }).catch(function (err) {
                    res.status(500).send(err);
                });
            });
        });
        app.delete('/api/pokemon/:id', authMiddleware, function (req, res) {
            firebase.pokemonActions.deletePokemon(req.user.user_id, req.params.id)
                .then(function (snap) {
                res.send({ success: true }).catch(function (err) {
                    res.status(500).send(err);
                });
            });
        });
    }
    PokemonRoutes.init = init;
})(PokemonRoutes = exports.PokemonRoutes || (exports.PokemonRoutes = {}));
