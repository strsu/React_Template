import { API } from '../constants';
import { request } from '../api';

export const resourceApi = {
  list: async () => {
    request
      .request('get', API.SOCCER.LIST)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
