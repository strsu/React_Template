import React, { useState } from 'react';
import styles from './roomconversation.module.css';

import { useChatStore } from '../../../context/chatStore';

import { timeAgo } from '../../../utils/date';

const msgManager = {
  my: (room, msg) => {
    return (
      <div className={styles.my_line} key={msg.timestamp}>
        <div className={styles.my_time}>{timeAgo(msg.timestamp)}</div>
        <div className={styles.msg}>{msg.message}</div>
      </div>
    );
  },
  you: (room, msg) => {
    return (
      <div className={styles.you_line} key={msg.timestamp}>
        <div className={styles.avatar}>
          <img src={room.product.image} />
        </div>
        <div className={styles.msg}>{msg.message}</div>
        <div className={styles.you_time}>{timeAgo(msg.timestamp)}</div>
      </div>
    );
  },
  send: (msg) => {
    useChatStore.getState().sendMessage(msg);
  },
};

export const RoomConversation = ({ room, data }) => {
  const [text, setText] = useState('');

  // 엔터 키가 눌리면 실행될 함수
  const handleEnterPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  // input 값이 변경될 때 상태 업데이트
  const handleChange = (e) => {
    setText(e.target.value);
  };

  // 엔터키가 눌리면 실행할 함수 예시
  const handleSubmit = () => {
    if (text) {
      const message = {
        type: 'message',
        data: {
          room: room.id,
          msg: text,
        },
      };
      msgManager.send(JSON.stringify(message));
      setText(''); // 전송 후 input 필드 비우기
    }
  };

  if (data.length == 0) {
    return <div className={styles.container}></div>;
  }
  return (
    <div className={styles.container}>
      <div className={styles.conversation}>
        {data.map((msg, idx) => {
          if (msg.is_my) {
            return msgManager.my(room, msg);
          } else {
            return msgManager.you(room, msg);
          }
        })}
      </div>
      <div>
        <div className={styles.inputArea}>
          <div className={styles.function}></div>
          <div className={styles.textField}>
            <input
              type="text"
              value={text}
              onChange={handleChange}
              onKeyUp={handleEnterPress}
              placeholder="메시지를 입력하세요"
            />
          </div>
          <div className={styles.send}></div>
        </div>
      </div>
    </div>
  );
};
