import * as fromActions from "./ui.actions";

export interface State {
    isLoading: boolean
}

const initialState: State = {
    isLoading: false
}

export function reducer(state = initialState, action: fromActions.actions): State{
    switch (action.type) {
        case fromActions.ACTIVE_LOADING:
            return {
                isLoading: true
            }
        case fromActions.DESACTIVE_LOADING:
            return {
                isLoading: false
            }
        default:
            return state
    }
}
