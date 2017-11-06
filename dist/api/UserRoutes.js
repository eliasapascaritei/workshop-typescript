"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by elias on 11/4/17.
 */
var UserRoutes;
(function (UserRoutes) {
    function init(app, firebase) {
        app.get('/api/users', function (req, res) {
            firebase.userActions.getAll(Number(req.query.perPage))
                .then(function (usersList) {
                res.send(usersList);
            }).catch(function (err) { res.status(500).send(err); });
        });
    }
    UserRoutes.init = init;
})(UserRoutes = exports.UserRoutes || (exports.UserRoutes = {}));
