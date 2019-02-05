import * as reducerUi from './shared/ui.reducers'
import * as reducerAuth from './auth/auth.reducer'
import * as reducerEntryExit from './entry-exit/entry-exit.reducer'
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
    ui: reducerUi.State,
    auth: reducerAuth.AuthState
    entryExit: reducerEntryExit.EntryExitState
}

export const appReducers: ActionReducerMap<AppState> = {
    ui: reducerUi.reducer,
    auth: reducerAuth.reducer,
    entryExit: reducerEntryExit.reducer
}