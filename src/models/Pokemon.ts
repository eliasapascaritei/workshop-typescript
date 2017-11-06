import {Equals} from "./equals";
import {Gender, validateGender} from "../constants/Gender";
/**
 * Created by elias on 11/4/17.
 */

export class Pokemon implements Equals<Pokemon> {
    public id?: string;
    public name: string;
    public height: string;
    public weight: string;
    public gender: Gender;
    public abilities: string;
    constructor(pok: Pokemon){
        // this.id = pok.id;
        this.name = pok.name;
        this.height = pok.height;
        this.weight = pok.weight;
        validateGender(pok.gender);
        this.gender = pok.gender;
        this.abilities = pok.abilities;
    }

    public canEqual(that: Pokemon): boolean {
        return this.name === that.name;
    }

    public equals(that: Pokemon):boolean {
        return this.canEqual(that) &&
                this.abilities === that.abilities;
    }
}