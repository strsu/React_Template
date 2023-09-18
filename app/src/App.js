import { BrowserRouter, Routes, Route } from 'react-router-dom';

import styles from './App.module.css';

import Login from './pages/login/login';
import Home from './pages/home/HomeComponent';
import Chat from './pages/chat/chatComponent';
import NotFound from './pages/notFound';

import Nav from './components/nav/nav';
import Header from './components/header/header';

import { useAuthStore } from './context/authStore';

function App() {
  useAuthStore.getState().init();
  const is_verified = useAuthStore((state) => state.is_verified);
  if (!is_verified) {
    return <Login />;
  }

  return (
    <div className="App">
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
