const SET_SETS = "SET_SETS"



const defaultState = {
    setsCard: {}
}

export default function savedCardReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_SETS:
            return {
                ...state,
                setsCard: action.playload.set,
            }
        default:
            return state;
    }
}

export const setSavedSets = set => ({ type: SET_SETS, playload: set })