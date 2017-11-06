"use strict";
/**
 * Created by elias on 11/4/17.
 */
Object.defineProperty(exports, "__esModule", { value: true });
function validateGender(g) {
    switch (g) {
        case 'M':
        case 'Male':
        case 'F':
        case 'Female': break;
        default: throw new Error("Gen necunoscut!");
    }
}
exports.validateGender = validateGender;
