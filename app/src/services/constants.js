const API_PREFIX = 'api';
const WS_PREFIX = 'ws';

export const API = {
  AUTH: {
    BASE: `/${API_PREFIX}/v1/user/token/`,
    VERIFY: `/${API_PREFIX}/v1/user/token/verify/`,
    REFRESH: `/${API_PREFIX}/v1/user/token/refresh/`,
  },
  RESOURCE: {
    LIST: `/${API_PREFIX}/resource/`,
  },
  SOCKET: {
    MAFIA: `${WS_PREFIX}/chat/mafia/asdf/`,
  },
};
