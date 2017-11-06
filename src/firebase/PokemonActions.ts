/**
 * Created by elias on 11/4/17.
 */
import * as admin from 'firebase-admin'
import {Pokemon} from "../models/Pokemon";


export class PokemonActions {
    firebase: admin.app.App;
    dbRef: admin.database.Reference;
    constructor(firebase: admin.app.App){
        this.firebase = firebase;
        this.dbRef = firebase.database().ref('workshop-typescript').child('pokemons');
    }

    public getAll(userId: string): Promise<any>{
        return new Promise((resolve: (value:Pokemon[]) => void, reject: (err: any) => void) => {

            this.dbRef.child(userId).once('value',(snap) => {
                const pokes = snap.val();
                const pokesArray: Pokemon[] = [];
                for(const key in pokes){
                    if(pokes.hasOwnProperty(key)){
                        pokesArray.push(Object.assign({id: key}, pokes[key]))
                    }
                }
                resolve(pokesArray);
            })
        })
    }

    public getOne(userId: string,id: String): Promise<Pokemon>{
        return new Promise((resolve: (value:Pokemon[]) => void, reject: (err: any) => void) => {

            this.dbRef.child(userId).child(id).once('value',(snap) => {

                resolve(snap.val());
            })
        })
    }

    public addPokemon(userId: string, pok: Pokemon): Promise<any> {
        return this.dbRef.child(userId).push(pok);
    }

    public updatePokemon(userId: string,id: string, pok: Pokemon): Promise<void>{
        return this.dbRef.child(userId).child(id).update(pok);
    }

    public deletePokemon(userId: string,id:string):Promise<void> {
        return this.dbRef.child(userId).child(id).remove();
    }
}