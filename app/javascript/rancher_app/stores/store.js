import { createStore, combineReducers } from 'redux';
import plotsReducer from '../reducers/plotsReducer';

const rancher_app = combineReducers({
  plotsReducer
});

const store = createStore(rancher_app, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;
