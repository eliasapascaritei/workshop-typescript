/**
 * Created by elias on 11/4/17.
 */

export interface Equals<T> {
    equals(that: T): boolean
    canEqual(that: T): boolean
}