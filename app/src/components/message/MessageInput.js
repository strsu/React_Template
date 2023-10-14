// MessageInput.js
import React, { useState } from 'react';
import { useMsgStore } from '../../context/msgStore';

function MessageInput() {
  const [message, setMessage] = useState('');
  const addMessage = useMsgStore((state) => state.addMessage);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() !== '') {
      addMessage(message);
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="메시지 입력"
      />
      <button type="submit">전송</button>
    </form>
  );
}

export default MessageInput;
