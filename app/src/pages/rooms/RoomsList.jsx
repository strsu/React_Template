import React, { useEffect, useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import { roomsApi } from '../../services/rooms/rooms';

import { useChatStore } from '../../context/chatStore';

import styles from './roomslist.module.css';

import { RoomBox } from './component/RoomBox';
import { RoomConversation } from './component/RoomConversation';

function RoomsList() {
  const [room, setRoom] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [conversation, setConversation] = useState([]);

  const conversationHandler = (id) => {
    setRoom(id);
  };

  useEffect(() => {
    const fetchData = async () => {
      roomsApi
        .list()
        .then((res) => {
          setRooms(res);
        })
        .catch((err) => {});
    };

    useChatStore.subscribe(
      (state) => {
        setConversation(state.conversation[room.id].map((v) => v));
        /*
          state.conversation 은 call by reference 라서 react에서 감지를 못 함
          때문에 map으로 새로운 객체를 만들어줘야 re-render가 발생한다.
        */
      },
      (state) => state.conversation
    ); // text 값이 바뀔 때만 로그가 출력됨

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (room) {
        roomsApi
          .conversation(room.id)
          .then((res) => {
            setConversation(res);
          })
          .catch((err) => {});
      }
    };

    fetchData();
  }, [room]);

  return (
    <div className={styles.container}>
      <div className={styles.leftArea}>
        {rooms.map((data, idx) => {
          return (
            <RoomBox
              key={data.id}
              data={data}
              onClick={() => conversationHandler(data)}
            />
          );
        })}
      </div>
      <div className={styles.rightArea}>
        <RoomConversation room={room} data={conversation} />
      </div>
    </div>
  );
}

export default RoomsList;
