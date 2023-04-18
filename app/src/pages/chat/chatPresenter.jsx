import React, { useState, useEffect, useRef } from 'react';
import { useChat } from "../../context/chatStore";
import { shallow } from 'zustand/shallow'

import "../../assets/css/chat.css"

function ChatContainer() {
    return (
        <>
            <div className="container">

            </div>
        </>
    )
}

function ChatPresenter({ props, state }) {
    console.log('@ChatPresenter');

    const [chat, setChat] = useState([]);
    let chatList = chat.map((msg) => {
        return (<p key={msg}>{msg}</p>);
    });

    useEffect(() => {
        console.log(chat);
    }, [])

    useChat.subscribe(
        state => {
            setChat(state.conversation);
        },
        state => state.conversation
    ); // text 값이 바뀔 때만 로그가 출력됨



    return (
        <>
            <ChatContainer />
            <div>
                {chatList}
            </div>
        </>
    );
}

export default ChatPresenter;