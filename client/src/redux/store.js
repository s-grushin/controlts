import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { userLoginReducer } from './user/reducers'

const reducers = combineReducers(
    {
        userLogin: userLoginReducer
    }
);

const initialState = {}

//const composeFunc = process.env.NODE_ENV === "development" ? composeWithDevTools : compose;
const composeFunc = composeWithDevTools
const composeEnhancers = composeFunc(applyMiddleware(thunk))
const store = createStore(reducers, initialState, composeEnhancers);

export default store;