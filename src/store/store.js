// store.js
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import reunionReducers from '../Reducer/reunionReducers';

const rootReducer = combineReducers({
  reunions: reunionReducers,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
