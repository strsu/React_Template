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

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (room) {
        roomsApi
          .conversation(room.id)
          .then((res) => {
            useChatStore.getState().setConversation(room.id, res);
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
        <RoomConversation room={room} />
      </div>
    </div>
  );
}

export default RoomsList;
