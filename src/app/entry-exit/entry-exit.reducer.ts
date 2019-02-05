import * as fromEntryExit from './entry-exit.actions'
import { EntryExit } from './entry-exit.model';

export interface EntryExitState {
    items: EntryExit[]
}

const initialState: EntryExitState = {
    items: []
}

export function reducer(state = initialState, action: fromEntryExit.actions): EntryExitState {
     switch (action.type) {
         case fromEntryExit.SET_ITEMS:
             return { items: [...action.payload.map(
                 item => {
                    return {
                        ...item
                    }
            })]}
         case fromEntryExit.UNSET_ITEMS:
             return {
                 items: []
             }
         default:
             return state
     }
}