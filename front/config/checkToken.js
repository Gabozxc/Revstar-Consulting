import axiosInstance from "./axios"

export default function (token){
    if(token){
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }else {
        delete axiosInstance.defaults.headers.common["Authorization"];
    }
}