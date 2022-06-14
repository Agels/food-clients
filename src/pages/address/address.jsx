import axios from "axios"
import {conf}  from '../../conf';
export const PostAddress = async(payload) => {
    const {token} = JSON.parse(localStorage.getItem("auth"));
    return await axios.post(`${conf.api_url}/api/v1/deliveryAddress`, payload ,{
        headers :{
            authorization:`Bearer ${token}`
        },
    });
}