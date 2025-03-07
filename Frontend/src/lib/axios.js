import axios from 'axios';

export const api = axios.create({
    baseURL:'http://24.199.78.112/api/'
})