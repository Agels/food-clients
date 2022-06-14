import axios from 'axios';
import { conf } from '../../../conf';
export const logout = async() => {
    const {token } = JSON.parse(localStorage.getItem("auth"));
    return await axios.post(`${conf.api_url}/api/v1/auth/logout`,null, {
        Headers : {
            authorization : `Bearer ${token}`
        }
    })

    .then((res) => {
       localStorage.removeItem("auth")
       return res
    })
}