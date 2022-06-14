import axios from "axios";
// import { useState } from "react";
import { conf } from "../../../conf";
const Register = async(payload) => {
    return await axios.post(`${conf.api_url}/api/v1/auth/register`, payload)
}

export default Register;
