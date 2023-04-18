import { API } from "../constants";
import { request } from "../api";

export const soccerApi = {

    list: async () => {
        request.get(API.SOCCER.LIST).then((res) => {
            console.log(res)
        }).catch((err) => {
            console.log(err);
        })
    }
}