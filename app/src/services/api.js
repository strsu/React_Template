import axios from "axios";

const apiHost = `https://${process.env.REACT_APP_API}`;

export const request = axios.create({
    baseURL: apiHost,
    timeout: 1000 * 60,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});