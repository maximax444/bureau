import axios from "axios"


export const $host = axios.create({
    baseURL: 'http://localhost:3500',
    // withCredentials: false,
    // headers: {
    //     'Access-Control-Allow-Origin': '*',
    //     'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    //     "Access-Control-Allow-Headers": 'Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token',
    // }
})
$host.interceptors.request.use((config) => {
    config.headers.Authorization = `Basic ${localStorage.getItem("token")}`
    return config
})
$host.interceptors.response.use(response => {
    return response;
}, error => {
    if (error.response.status === 403) {
        console.log("asd");

        window.location.href = "/login";
    }
    return error;
});