// MessageList.js
import React, { useEffect, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { useMsgStore } from '../../context/msgStore';

const MessageBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 200px;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 999;
  margin-right: 15px;
`;

const Message = styled.div`
  display: flex;
  width: 200px;
  padding: 10px;
  margin: 5px;
  margin-right: 10px;
  background: #f5c5c5;
  border-radius: 0.5rem;
`;

function MessageList() {
  const [msgs, setMsgs] = useState({});
  const msgShowTime = 5;

  useEffect(() => {
    if (Object.keys(msgs).length) {
      const timer = setInterval(() => {
        let remainMsgs = {};
        let msgFinishAt = new Date();
        msgFinishAt.setSeconds(msgFinishAt.getSeconds() - msgShowTime); // 초 더하기
        for (let msg in msgs) {
          let msgReceiveAt = msgs[msg];

          if (msgReceiveAt > msgFinishAt) {
            remainMsgs[msg] = msgs[msg];
          }
        }
        setMsgs(remainMsgs);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [msgs]);

  useMsgStore.subscribe((state) => {
    let msg = state.popMessage();
    if (msg) {
      setMsgs((prevMsgs) => ({
        ...prevMsgs,
        [msg]: new Date(),
      }));
    }
  });

  return (
    <MessageBox>
      {Object.keys(msgs).map((message, index) => (
        <Message key={index} className="message">
          {message}
        </Message>
      ))}
    </MessageBox>
  );
}

export default MessageList;
