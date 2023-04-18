const API_PREFIX = "api";
const WS_PREFIX = "ws";

export const API = {
    AUTH: {
        BASE: `/${API_PREFIX}/v1/user/token/`
    },
    SOCCER: {
        LIST: `/${API_PREFIX}/v1/soccer/`
    },
    SOCKET: {
        MAFIA: `${WS_PREFIX}/chat/mafia/asdf/`
    }
}