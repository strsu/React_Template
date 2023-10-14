const API_PREFIX = 'api/v1';
const WS_PREFIX = 'wss:/';

export const API = {
  AUTH: {
    BASE: `/${API_PREFIX}/user/token/`,
    VERIFY: `/${API_PREFIX}/user/token/verify/`,
    REFRESH: `/${API_PREFIX}/user/token/refresh/`,
  },
  BOARD: `/${API_PREFIX}/board/`,
  SOCKET: {
    CHAT: `${WS_PREFIX}/192.168.1.230/ws/chat/test`,
  },
};
