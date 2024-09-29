import { useChatStore } from '../context/chatStore';

const socketHost = `wss://${process.env.REACT_APP_API}`;

export default class WebSocketManager {
  constructor(path) {
    this.path = `${socketHost}${path}`;
    this.socket = new WebSocket(this.path);
    this.socket.onopen = this.onopen.bind(this);
    this.socket.onerror = this.onopen.bind(this);
    this.socket.onmessage = this.onmessage.bind(this);
    this.socket.onclose = this.onclose.bind(this);
  }

  getReadyState() {
    return this.socket.readyState;
  }

  connect() {
    this.socket = new WebSocket(this.path);
    this.socket.onopen = this.onopen.bind(this);
    this.socket.onerror = this.onopen.bind(this);
    this.socket.onmessage = this.onmessage.bind(this);
    this.socket.onclose = this.onclose.bind(this);
  }

  onopen(event) {
    console.log('WebSocket connection opened:', event);
    // document.getElementById('chat-message-input').removeAttribute('readonly');
    // document.getElementById('chat-message-input').focus();
    // document.addEventListener('mousemove', getMousePosition);
  }

  onmessage(event) {
    const data = JSON.parse(event.data);

    if (Object.keys(data).includes('type')) {
      if (data.type == 'message') {
        useChatStore.getState().onMessage(data.data);
      }
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
