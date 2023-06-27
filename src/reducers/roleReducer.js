const SET_ROLE = "SET_ROLE"

const defaultState = {
    role: ""
}

export default function roleReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_ROLE:
            return {
                ...state,
                role: action.playload.role,
            }
        default:
            return state;
    }
}

export const setRole = role => ({ type: SET_ROLE, playload: role })