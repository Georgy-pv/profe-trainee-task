import { createStore, combineReducers, applyMiddleware } from "redux";
import thunkMiddleware from 'redux-thunk';
import repositoriesReducer from "./repositories-reducer";


let reducersPatch = combineReducers({
    repositoriesPage: repositoriesReducer
});

  
let store = createStore(reducersPatch, applyMiddleware(thunkMiddleware));
window.store = store;
export default store;