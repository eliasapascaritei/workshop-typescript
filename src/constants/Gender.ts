/**
 * Created by elias on 11/4/17.
 */

export type Gender = 'M' | 'F' | 'Male' | 'Female'
export function validateGender(g: Gender):void {
    switch (g){
        case 'M':
        case 'Male':
        case 'F':
        case 'Female': break;
        default: throw new Error("Gen necunoscut!")
    }
}