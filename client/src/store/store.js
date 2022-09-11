import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { user } from '../reducers/userReducer';
import { loading } from '../reducers/loading';

const rootReducer = combineReducers({ user, loading });

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
