import React, { Component } from 'react';
import ChatPresenter from './chatPresenter';
import { useChat } from '../../context/chatStore';

import { API } from '../../services/constants';
import { socket } from '../../services/websocket';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: useChat.getState().conversation,
      socket: socket.connect(API.SOCKET.MAFIA),
    };
    this.state.socket.onopen = this.onopen.bind(this);
    this.state.socket.onerror = this.onopen.bind(this);
    this.state.socket.onmessage = this.onmessage.bind(this);
    this.state.socket.onclose = this.onclose.bind(this);
  }

  componentDidMount() {}

  componentWillUnmount() {}

  onopen(event) {
    console.log('WebSocket connection opened:', event);
  }

  onmessage(event) {
    const data = JSON.parse(event.data);
    if (data.msg) {
      useChat.getState().onMessage(data.msg.message);
    }
    //console.log(useChat.getState().conversation);
    //this.receiver.actor(data);
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

  render() {
    return <ChatPresenter props={this.props} state={this.state} />;
  }
}

export default Chat;
