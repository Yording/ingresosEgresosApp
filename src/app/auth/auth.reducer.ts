import * as fromActions from './auth.actions'
import { User } from './user.model';

export interface AuthState {
    user: User
}

const initialState: AuthState = {
    user: null
}

export function reducer(state = initialState, action: fromActions.actions): AuthState{
    switch (action.type) {
        case fromActions.SET_USER:
            return {
                user: {...action.payload}
            }
    
        default:
            return state;
    }
}