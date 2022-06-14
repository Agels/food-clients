import {applyMiddleware, compose, createStore} from 'redux';
import thunk from 'redux-thunk';

import { reducer } from './combine';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSIONS_COMPOSE || compose;
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

export default store;