import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { userLoginReducer } from './user/reducers'

const reducers = combineReducers(
    {
        user: userLoginReducer
    }
);



//const composeFunc = process.env.NODE_ENV === "development" ? composeWithDevTools : compose;
const composeFunc = composeWithDevTools
const composeEnhancers = composeFunc(applyMiddleware(thunk))
const store = createStore(reducers, {}, composeEnhancers);

export default store;