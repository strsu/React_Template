import React, { useState } from 'react';
import styles from './login.module.css';

import { authApi } from '../../services/auth/auth';

import MessageList from '../../components/message/MessageList';

function Login() {
  const [user, setUser] = useState({ email: '', password: '' });

  const handleLogin = () => {
    authApi.login(user);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((user) => ({ ...user, [name]: value }));
  };

  const handleInputKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // 폼의 기본 제출 동작을 막습니다.
      handleLogin();
    }
  };

  return (
    <div className={styles.login_outer}>
      <MessageList />
      <div className={styles.login_inner}>
        <div className={styles.login_title}>
          <div>관리</div>
        </div>
        <div className={styles.login}>
          <input
            type="text"
            name="email"
            placeholder="아이디"
            onChange={handleInputChange}
            onKeyUp={handleInputKeyPress}
          />
          <input
            type="password"
            name="password"
            placeholder="비밀번호"
            onChange={handleInputChange}
            onKeyUp={handleInputKeyPress}
          />
          <div id={styles.msx_box}></div>
          <button onClick={() => handleLogin()}>로그인</button>
        </div>
      </div>
    </div>
  );
}

export default Login;
