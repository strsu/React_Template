import axios from 'axios';

import { authApi } from './auth/auth';

import { useAuthStore } from '../context/authStore';

const apiHost = `https://${process.env.REACT_APP_API}`;

export const customAxios = axios.create({
  baseURL: apiHost,
  timeout: 1000 * 60,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

const request = {
  handleAuth: async () => {
    const response = await authApi.verify();
    useAuthStore.getState().setVerify(response);
    return response;
  },
  handleError: async (err, method, url, data) => {
    if (Object.keys(err).includes('response')) {
      if (err.response.status === 401) {
        const is_verified = await request.handleAuth();
        if (!is_verified) {
          return false;
        }
        return await request.request(method, url, data, true);
      } else {
        return err.response;
      }
    } else {
      console.log('###', err.message);
    }
  },
  request: async (method, url, data, is_retry = false) => {
    if (method === 'get') {
      return await request.get(url, is_retry);
    } else if (method === 'post') {
      return await request.post(url, data, is_retry);
    } else if (method === 'put') {
      return await request.put(url, data, is_retry);
    } else if (method === 'patch') {
      return await request.patch(url, data, is_retry);
    } else if (method === 'delete') {
      return await request.delete(url, is_retry);
    } else {
      // 오류 처리
      return false;
    }
  },
  get: async (url, is_retry = false) => {
    try {
      return await customAxios.get(url).then((res) => {
        return res;
      });
    } catch (err) {
      if (!is_retry) {
        return await request.handleError(err);
      }
      return err;
    }
  },
  post: async (url, data, is_retry = false) => {
    try {
      return await customAxios.post(url, data).then((res) => {
        return res;
      });
    } catch (err) {
      if (is_retry) return err;
      return await request.handleError(err);
    }
  },
  put: async (url, data, is_retry = false) => {
    try {
      return await customAxios.put(url, data).then((res) => {
        return res;
      });
    } catch (err) {
      if (is_retry) return err;
      return await request.handleError(err);
    }
  },
  patch: async (url, data, is_retry = false) => {
    try {
      return await customAxios.patch(url, data).then((res) => {
        return res;
      });
    } catch (err) {
      if (is_retry) return err;
      return await request.handleError(err);
    }
  },
  delete: async (url, is_retry = false) => {
    try {
      return await customAxios.delete(url).then((res) => {
        return res;
      });
    } catch (err) {
      if (is_retry) return err;
      return await request.handleError(err);
    }
  },
};

export default request;
