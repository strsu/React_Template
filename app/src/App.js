import { BrowserRouter, Routes, Route } from 'react-router-dom';

import styles from './App.module.css';

import Loading from './components/loading/loading';

import Login from './pages/login/login';

import Home from './pages/home/HomeComponent';
import Chat from './pages/chat/chatComponent';

import NotFound from './pages/notFound';

import Nav from './components/nav/nav';
import Header from './components/header/header';

import { useAuthStore } from './context/authStore';
import { useModalStore } from './context/modalStore';
import { useChatStore } from './context/chatStore';

import MessageInput from './components/message/MessageInput';
import MessageList from './components/message/MessageList';

const Modal = ({ Component, onClose }) => {
  return (
    <>
      {!!Component && (
        <div id="myModal" className={styles.modal}>
          <div className={styles.modal_content}>
            <span className={styles.close} onClick={onClose}>
              &times;
            </span>
            <div className={styles.modal_inner}>
              <Component />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

function App() {
  const is_verified = useAuthStore((state) => state.is_verified);
  const modalState = useModalStore((state) => state);

  if (is_verified == null) {
    return <Loading loading={true} />;
  }

  if (!is_verified) {
    return <Login />;
  }

  useChatStore.getState().onConnect();

  return (
    <div className={styles.App}>
      <Modal Component={modalState.render} onClose={modalState.close} />
      <MessageList />

      <BrowserRouter>
        <div className={styles.App}>
          <div className={styles.menu}>
            <Nav />
          </div>
          <div className={styles.body}>
            <div className={styles.head}>
              <Header />
            </div>
            <div className={styles.content}>
              <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/chat/*" element={<Chat />}></Route>
                {/* 상단에 위치하는 라우트들의 규칙을 모두 확인, 일치하는 라우트가 없는경우 처리 */}
                <Route path="*" element={<NotFound />}></Route>
              </Routes>
            </div>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
