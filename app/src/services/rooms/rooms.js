import { API } from '../constants';
import request from '../api';

export const roomsApi = {
  list: async () => {
    return request
      .request('get', API.GOODS.ROOMS)
      .then((res) => {
        if (res.status == 200) {
          return res.data;
        }
        return false;
      })
      .catch((err) => {
        return err;
      });
  },
  conversation: async (id) => {
    return request
      .request('get', `${API.GOODS.ROOMS}${id}/conversation/`)
      .then((res) => {
        if (res.status == 200) {
          return res.data;
        }
        return false;
      })
      .catch((err) => {
        return err;
      });
  },
};
