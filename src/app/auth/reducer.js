import {LOGIN_USER,LOGOUT_USER} from './constans';

const fromLocalStorage = localStorage.getItem("auth");
const intialState =  fromLocalStorage ? JSON.parse(fromLocalStorage) : {user:null, token:null};
export const authReducer = (state = intialState, {type, payload}) => {
    switch(type) {
        case LOGIN_USER:
            return {
                ...state,
                user : payload.user, 
                token:payload.token
            }
        case LOGOUT_USER:
            return {
                ...state,
                user:null,
                token:null
            }
        default : 
        return state;
    } 
}