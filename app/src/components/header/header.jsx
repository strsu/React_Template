import React from 'react';
import styles from './header.module.css';

import { HiMenu, HiOutlineUser, HiOutlineBell } from 'react-icons/hi';

import { authApi } from '../../services/auth/auth';

function Header() {
  return (
    <div className={styles.header}>
      <div className={styles.left}>
        <div className={styles.icon}>
          <HiMenu size={20} />
        </div>
        <div>사이트 제목</div>
      </div>

      <div className={styles.right}>
        <div className={styles.icon}>
          <HiOutlineBell size={20} />
        </div>
        <div className={styles.icon} onClick={authApi.logout}>
          <HiOutlineUser size={20} />
        </div>
      </div>
    </div>
  );
}

export default Header;
