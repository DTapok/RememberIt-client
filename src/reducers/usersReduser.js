const SET_USERS = "SET_USERS"

const defaultState = {
    users: {},
}

export default function userReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_USERS:
            return {
                ...state,
                users: action.playload,
            }
        default:
            return state;
    }
}

export const setUsers = users => ({ type: SET_USERS, playload: users })