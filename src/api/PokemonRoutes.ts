import {Express, Request, Response} from 'express'
import {FireBaseAdmin} from "../firebase/admin";
import {Pokemon} from "../models/Pokemon";
import {addMiddlewareFActory} from '../seurity/firebaseAuth'
import {AuthRequest} from '../seurity/firebaseAuth'
/**
 * Created by elias on 11/4/17.
 */

export namespace PokemonRoutes {
    export function init(app: Express, firebase: FireBaseAdmin):void {
        const authMiddleware = addMiddlewareFActory(firebase);
        app.get('/api/pokemons', authMiddleware,(req: AuthRequest, res: Response) => {
            firebase.pokemonActions.getAll(req.user.user_id)
                .then((pokemonList) => {
                    res.send(pokemonList)
                }).catch((err) => {
                res.status(500).send(err)
            })
        });
        app.get('/api/pokemon/:id',authMiddleware, (req: AuthRequest, res: Response) => {
            firebase.pokemonActions.getOne(req.user.user_id, req.params.id)
                .then((pokemon) => {
                    res.send(pokemon)
                }).catch((err) => {res.status(500).send(err)})
        });

        app.post('/api/pokemon',authMiddleware, (req: AuthRequest, res: Response) => {
            try {
                const newPokemon = new Pokemon(req.body);
                firebase.pokemonActions.addPokemon(req.user.user_id, newPokemon)
                    .then((snap) => {
                        res.send({
                            success: true,
                            pokemon: Object.assign(
                                {id: snap.key}, newPokemon
                            )
                        }).catch((err) => {res.status(500).send(err)})
                    })
            } catch (err) {
                res.status(500).send(`err:${err}`)
            }


        });

        app.put('/api/pokemon/:id',authMiddleware, (req: AuthRequest, res: Response) => {

            firebase.pokemonActions.updatePokemon(req.user.user_id,req.params.id, req.body)
                .then((snap) => {
                    res.send({success: true}).catch((err) => {
                        res.status(500).send(err)
                    })

                })
        });
        app.delete('/api/pokemon/:id',authMiddleware, (req: AuthRequest, res: Response) => {

            firebase.pokemonActions.deletePokemon(req.user.user_id,req.params.id)
                .then((snap) => {
                    res.send({success: true}).catch((err) => {
                        res.status(500).send(err)
                    })

                })
        });


    }
}