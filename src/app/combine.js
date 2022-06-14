import {combineReducers} from 'redux';
import{chartReducer} from './chart/reducer';
import counterReducer from './counter/reducer';
import { addressReducer } from './address/reducer';
import { authReducer } from './auth/reducer';
import { taggsReducer } from './tags/reducer';
export const reducer = combineReducers({
    chart:chartReducer,
    cartQty:counterReducer,
    address:addressReducer,
    auth:authReducer,
    tags:taggsReducer
});