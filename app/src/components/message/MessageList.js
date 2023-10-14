// MessageList.js
import React, { useEffect } from 'react';
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
  const msgList = useMsgStore((state) => state.msgList);

  useEffect(() => {
    const timer = setInterval(() => {
      if (msgList.length > 0) {
        useMsgStore.getState().popMessage();
      }
    }, 2000);

    return () => clearInterval(timer);
  }, [msgList]);

  return (
    <MessageBox>
      {msgList.map((message, index) => (
        <Message key={index} className="message">
          {message}
        </Message>
      ))}
    </MessageBox>
  );
}

export default MessageList;
