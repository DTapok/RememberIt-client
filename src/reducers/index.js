import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension"
import thunk from "redux-thunk"
import userReducer from "./userReducer";
import cardReducer from "./cardReducer";

const rootReducer = combineReducers({
    user: userReducer,
    card: cardReducer
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))