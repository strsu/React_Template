import React, { useState } from 'react';
import styles from './login.module.css';

import { authApi } from '../../services/auth/auth';

function Login() {
  const [user, setUser] = useState({ email: '', password: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((user) => ({ ...user, [name]: value }));
  };

  return (
    <div className={styles.login_outer}>
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
          />
          <input
            type="password"
            name="password"
            placeholder="비밀번호"
            onChange={handleInputChange}
          />
          <div id={styles.msx_box}></div>
          <button onClick={() => authApi.login(user)}>로그인</button>
        </div>
      </div>
    </div>
  );
}

export default Login;
