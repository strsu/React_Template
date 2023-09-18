import React, { useState, useEffect, useRef } from 'react';
import { useChat } from '../../context/chatStore';
import { shallow } from 'zustand/shallow';

import '../../assets/css/chat.css';

function ChatContainer() {
  return (
    <>
      <div className="container"></div>
    </>
  );
}

function ChatPresenter({ props, state }) {
  console.log('@ChatPresenter');

  const [chat, setChat] = useState([]);
  let chatList = chat.map((msg) => {
    return <p key={msg}>{msg}</p>;
  });

  useEffect(() => {
    useChat.subscribe(
      (state) => {
        setChat(state.conversation.map((v) => v));
        /*
                    state.conversation 은 call by reference 라서 react에서 감지를 못 함
                    때문에 map으로 새로운 객체를 만들어줘야 re-render가 발생한다.
                */
      },
      (state) => state.conversation
    ); // text 값이 바뀔 때만 로그가 출력됨
  }, []);

  return (
    <>
      <ChatContainer />
      <div>{chatList}</div>
    </>
  );
}

export default ChatPresenter;
