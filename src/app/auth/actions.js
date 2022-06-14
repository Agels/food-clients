import {LOGIN_USER, LOGOUT_USER} from './constans';

export const userLogin = (data) => ({
    type:LOGIN_USER,
    payload: data
   
}) 

export const userLogout = () => ({
    type:LOGOUT_USER,
   
}) 