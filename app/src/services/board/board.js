import { API } from '../constants';
import request from '../api';

export const boardApi = {
  list: async () => {
    return request
      .request('get', API.BOARD)
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
  image: async (name) => {
    return request
      .request('get', `${API.MEDIA}board/${name}`)
      .then((res) => {
        if (res.status == 200) {
          return res;
        }
        return false;
      })
      .catch((err) => {
        return err;
      });
  },
};
