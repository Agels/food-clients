import axios from "axios"
import {conf} from '../../../conf';
const Login = async(payload) => {
    return await axios.post(`${conf.api_url}/api/v1/auth/login`, payload);
}

export default Login;