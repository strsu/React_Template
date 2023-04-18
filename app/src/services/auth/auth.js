import { API } from "../constants";
import { request } from "../api";

export const authApi = {

    login: async (user) => {
        console.log(API.AUTH.BASE);
        request.post(API.AUTH.BASE, {
            email: user.email,
            password: user.password
        }).then((res) => {
            const token = res.data.access;

            localStorage.setItem("token", token); // localStorage에 토큰 저장
            request.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            return true;
        }).catch((err) => {
            console.log(err);
        })
    }
}