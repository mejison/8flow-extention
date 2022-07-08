import axios from "axios";

const config = {
    name: 'dev87341',
    username: 'admin',
    password: 'h7a7ZWbG*/Fd',
}

const API_DOMAIN = `https://${config.name}.service-now.com`;

const getFromTable = async (table) =>  {
    return axios.get(`${API_DOMAIN}/api/now/v1/table/${table}`, 
    {
        auth: {
            username: config.username,
            password: config.password
        }
    })
}

const insertToTable = async (table, data) => {
    return axios.post(`${API_DOMAIN}/api/now/v1/table/${table}`, data,
    {
        auth: {
            username: config.username,
            password: config.password
        },

    })
}

export  {
    getFromTable,
    insertToTable,
}