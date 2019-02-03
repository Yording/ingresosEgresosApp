import * as reducerUi from './shared/ui.reducers'
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
    ui: reducerUi.State
}

export const appReducers: ActionReducerMap<AppState> = {
    ui: reducerUi.reducer
}