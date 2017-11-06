/**
 * Created by elias on 11/4/17.
 */

import * as fs from 'fs'
import * as path from 'path'
import * as admin from 'firebase-admin'
import {UserActions} from './UserActions'
import {PokemonActions} from "./PokemonActions";

export class FireBaseAdmin {
    private keyLocation: string;
    private accountConfig: any;
    private firebase: admin.app.App;
    public userActions: UserActions;
    public pokemonActions: PokemonActions;
    constructor(keyLoc:string) {
        this.keyLocation = keyLoc;
        this.accountConfig = JSON.parse(fs.readFileSync(path.join(__dirname, `../../${keyLoc}`)).toString());
        this.firebase = admin.initializeApp(
            {
                credential: admin.credential.cert(this.accountConfig),
                databaseURL: `http://${this.accountConfig.project_id}.firebaseio.com`
            });

        this.userActions = new UserActions(this.firebase);
        this.pokemonActions = new PokemonActions(this.firebase);
    }

}