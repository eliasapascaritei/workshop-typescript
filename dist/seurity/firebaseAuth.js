"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function addMiddlewareFActory(firebase) {
    return function (req, res, next) {
        var authToken = req.headers['x-auth'] || req.query['-auth'];
        if (authToken) {
            firebase.userActions.decodeToken(authToken)
                .then(function (user) {
                req.user = user;
                next();
            }).catch(function (err) { return res.status(401).send({ message: 'Invalid Toke ' }); });
        }
        else {
            res.status(401).send({ message: 'nu ai auth' });
        }
    };
}
exports.addMiddlewareFActory = addMiddlewareFActory;
