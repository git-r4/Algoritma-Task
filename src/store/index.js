import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import orderReducer from "../reducers/order";
import menuReducer from "../reducers/menu";
import personalOrderReducer from "../reducers/personalOrder";
import ReduxThunk from 'redux-thunk';


const store = createStore(
    combineReducers({orderReducer, menuReducer, personalOrderReducer}), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export default store;