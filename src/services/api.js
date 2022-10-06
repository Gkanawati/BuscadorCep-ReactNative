import React from "react";
import axios from "axios";

// https://viacep.com.br/ws/13860023/json
//https://viacep.com.br/ws/
// 13860023/json

const api = axios.create({
    baseURL:'https://viacep.com.br/ws/'
})

export default api;