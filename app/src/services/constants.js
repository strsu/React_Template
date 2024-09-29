const API_PREFIX = 'api/v1';
const WS_PREFIX = 'ws';
const MEDIA_PREFIX = 'media';

export const API = {
  AUTH: {
    BASE: `/${API_PREFIX}/user/token/`,
    VERIFY: `/${API_PREFIX}/user/token/verify/`,
    REFRESH: `/${API_PREFIX}/user/token/refresh/`,
  },
  BOARD: `/${API_PREFIX}/board/`,
  GOODS: {
    ROOMS: `/${API_PREFIX}/goods/rooms/`,
  },
  MEDIA: `/${MEDIA_PREFIX}/`,
  SOCKET: {
    CHAT: `/${WS_PREFIX}/chat`,
    GOODS: `/${WS_PREFIX}/goods/`,
  },
};
