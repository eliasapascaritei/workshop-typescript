import {Request, Response, NextFunction} from 'express'
import {FireBaseAdmin} from "../firebase/admin";
import * as admin from "firebase-admin";
/**
 * Created by elias on 11/4/17.
 */

export interface AuthRequest extends Request {
    user: admin.auth.DecodedIdToken
}
export function addMiddlewareFActory(firebase: FireBaseAdmin) {
    return function (req: AuthRequest, res: Response, next: NextFunction) {
        const authToken = req.headers['x-auth'] || req.query['-auth']

        if(authToken){
            firebase.userActions.decodeToken(authToken)
                .then((user) => {
                    req.user = user;
                    next()
                }).catch((err) => res.status(401).send({message:'Invalid Toke '}))
        } else {
            res.status(401).send({message:'nu ai auth'})
        }
    }
}