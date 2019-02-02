import { Action } from "@ngrx/store";


export const ACTIVE_LOADING = "[APP] active loading"
export const DESACTIVE_LOADING = "[APP] desactive loading"

export class ActiveLoadingAction implements Action {
    readonly type = ACTIVE_LOADING
}

export class DesactiveLoadingAction implements Action {
    readonly type = DESACTIVE_LOADING
}

export type actions = ActiveLoadingAction |
    DesactiveLoadingAction