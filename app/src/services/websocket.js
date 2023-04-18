//import socketIOClient from 'socket.io-client';

const apiWebsocket = `wss://${process.env.REACT_APP_API}`;

export const socket = {
    connect: (url) => {
        console.log(`${apiWebsocket}/${url}`);
        /*return socketIOClient(`${apiWebsocket}/${url}`, {
            withCredentials: true,
            cors: {
                origin: "https://localhost",
            }
        });*/

        return new WebSocket(`${apiWebsocket}/${url}`);
    }
}
