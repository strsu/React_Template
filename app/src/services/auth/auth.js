import { Cookies } from 'react-cookie';

import { API } from '../constants';
import { customAxios } from '../api';

import { useAuthStore } from '../../context/authStore';

export const authApi = {
  login: (user) => {
    return customAxios
      .post(API.AUTH.BASE, {
        email: user.email,
        password: user.password,
      })
      .then((res) => {
        const access = res.data.access;
        const refresh = res.data.refresh;

        useAuthStore.getState().setAccess(access);
        useAuthStore.getState().setVerify(true);

        localStorage.setItem('refresh', refresh); // localStorage에 토큰 저장
        customAxios.defaults.headers.common[
          'Authorization'
        ] = `Bearer ${access}`;

        const cookies = new Cookies();
        cookies.set('X-Authorization', access, {
          domain: 'localhost',
        });

        return true;
      })
      .catch((err) => {
        console.log(err);
        if (err.code === 'ERR_NETWORK') {
          return false;
        }
        if (err.response.status >= 500) {
          return false;
        } else if (err.response.status >= 400) {
          return false;
        }
      });
  },

  logout: () => {
    useAuthStore.getState().setVerify(false);
    localStorage.removeItem('refresh'); // localStorage에 토큰 저장
  },

  verify: () => {
    return customAxios
      .post(API.AUTH.VERIFY, {
        token: useAuthStore.getState().access,
      })
      .then((res) => {
        return true;
      })
      .catch((err) => {
        return authApi.refresh();
      });
  },

  refresh: () => {
    return customAxios
      .post(API.AUTH.REFRESH, {
        refresh: useAuthStore.getState().refresh,
      })
      .then((res) => {
        const access = res.data.access;
        customAxios.defaults.headers.common[
          'Authorization'
        ] = `Bearer ${access}`;
        useAuthStore.getState().setAccess(access);
        useAuthStore.getState().setVerify(true);

        const cookies = new Cookies();
        cookies.set('X-Authorization', access, {
          domain: 'localhost',
        });

        return true;
      })
      .catch((err) => {
        if (err.code === 'ERR_NETWORK') {
          return false;
        }

        if (err.response.status >= 500) {
          return false;
        } else if (err.response.status >= 400) {
          return false;
        }
      });
  },
};
