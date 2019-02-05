import { Action } from "@ngrx/store";
import { EntryExit } from './entry-exit.model';

export const SET_ITEMS = "[EntryExit] set items"
export const UNSET_ITEMS = "[EntryExit] unset items"

export class SetItemsAction implements Action {
    readonly type = SET_ITEMS
    constructor(public payload: EntryExit[]){}
}

export class UnsetItemsAction implements Action {
    readonly type = UNSET_ITEMS
}

export type actions = SetItemsAction | UnsetItemsAction