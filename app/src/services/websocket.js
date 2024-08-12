import { useChatStore } from '../context/chatStore';
import { API } from './constants';

const socketHost = `wss://${process.env.REACT_APP_API}`;

export default class WebSocketManager {
  constructor(userName) {
    this.userName = userName;
    this.socket = new WebSocket(`${socketHost}${API.SOCKET.CHAT}/${userName}/`);
    this.socket.onopen = this.onopen.bind(this);
    this.socket.onerror = this.onopen.bind(this);
    this.socket.onmessage = this.onmessage.bind(this);
    this.socket.onclose = this.onclose.bind(this);
  }

  getReadyState() {
    return this.socket.readyState;
  }

  connect() {
    this.socket = new WebSocket(`${API.SOCKET.CHAT}/${this.userName}/`);
    this.socket.onopen = this.onopen.bind(this);
    this.socket.onerror = this.onopen.bind(this);
    this.socket.onmessage = this.onmessage.bind(this);
    this.socket.onclose = this.onclose.bind(this);
  }

  onopen(event) {
    //console.log('WebSocket connection opened:', event);
    //document.getElementById('chat-message-input').removeAttribute('readonly');
    //document.getElementById("chat-message-input").focus();
    //document.addEventListener('mousemove', getMousePosition);
  }

  onmessage(event) {
    const data = JSON.parse(event.data);

    if (Object.keys(data).includes('msg')) {
      useChatStore.getState().onMessage(data);
    }
    console.log(data);
    // this.receiver.actor(data);
  }

  onerror(event) {
    console.log('WebSocket connection error:', event);
  }

  onclose(event) {
    console.log(
      'Socket closed with code:',
      event.code,
      'reason:',
      event.reason
    );
  }

  send(data) {
    if (this.socket.readyState == 1) {
      this.socket.send(data);
    }

    if (this.socket.readyState > 1) {
      this.connect();
    }
  }

  sendText(message) {
    let base = {
      name: this.userName,
      time: new Date(),
    };

    let data = {
      data: Object.assign({}, base, message),
    };
    this.send(JSON.stringify(data));
  }

  sendBytes(data) {
    this.send(data);
  }
}
