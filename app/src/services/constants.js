const API_PREFIX = 'api/v1';
const WS_PREFIX = 'ws';

export const API = {
  AUTH: {
    BASE: `/${API_PREFIX}/user/token/`,
    VERIFY: `/${API_PREFIX}/user/token/verify/`,
    REFRESH: `/${API_PREFIX}/user/token/refresh/`,
  },
  BOARD: `/${API_PREFIX}/board/`,
  SOCKET: {
    CHAT: `/${WS_PREFIX}/chat/test`,
  },
};
