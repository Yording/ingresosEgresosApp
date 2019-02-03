import { Action } from "@ngrx/store";
import { User } from "./user.model";

export const SET_USER = "[Auth] set user"

export class SetUserAction implements Action {
    readonly type =  SET_USER
    
    constructor(public payload: User){}
}

export type actions = SetUserAction