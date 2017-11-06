"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UserActions = /** @class */ (function () {
    function UserActions(firebase) {
        this.firebase = firebase;
    }
    UserActions.prototype.getAll = function (perPage) {
        if (perPage === void 0) { perPage = 50; }
        return this.firebase.auth().listUsers(perPage);
    };
    UserActions.prototype.decodeToken = function (idToken) {
        return this.firebase.auth().verifyIdToken(idToken);
    };
    return UserActions;
}());
exports.UserActions = UserActions;
