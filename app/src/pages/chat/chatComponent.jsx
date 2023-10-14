import React, { Component } from 'react';
import ChatPresenter from './chatPresenter';
import { useChatStore } from '../../context/chatStore';
class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: useChatStore.getState().conversation,
    };
  }

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    return <ChatPresenter props={this.props} state={this.state} />;
  }
}

export default Chat;
