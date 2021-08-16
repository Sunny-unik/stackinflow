import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { user } from '../reducers/userReducer';
import { loading } from '../reducers/loading';

var rootReducer = combineReducers({ user, loading });

var store = createStore(rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
);



export default store;