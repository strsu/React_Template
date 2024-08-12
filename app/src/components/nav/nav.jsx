import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import styles from './nav.module.css';

import { HiChevronDown, HiChevronLeft, HiEmojiHappy } from 'react-icons/hi';

function Nav() {
  const [page, setPage] = useState('');
  const [submenu, SetSubmenu] = useState({
    resource: false,
    sub2: false,
  });

  const MyLink = ({ ICON, mypage, to }) => {
    return (
      <Link
        className={`${styles.navItem} ${page == mypage ? styles.me : ''}`}
        to={`/${to}`}
        onClick={() => setPage(mypage)}
      >
        <div className={styles.itemBox}>
          <div className={styles.innerIcon}>
            {ICON ? <ICON size={25} /> : <div>&nbsp;</div>}
            <div>{mypage}</div>
          </div>
          <div>&nbsp;</div>
        </div>
      </Link>
    );
  };

  const toggle = (menu) => {
    SetSubmenu((submenu) => {
      let newSubmenu = { ...submenu };
      newSubmenu[menu] = !submenu[`${menu}`];
      return newSubmenu;
    });
  };

  return (
    <div>
      <ul className={styles.navigation}>
        <li>
          <MyLink ICON={HiEmojiHappy} mypage={'Home'} to={''} />
        </li>
        <li>
          <MyLink ICON={HiEmojiHappy} mypage={'Chat'} to={'chat'} />
        </li>
        <li>
          <MyLink ICON={HiEmojiHappy} mypage={'Board'} to={'board'} />
        </li>
        {/* <li>
          <MyLink ICON={HiEmojiHappy} mypage={'집합관리'} to={'group'} />
        </li>
        <li>
          <a className={`${styles.navItem}`} onClick={() => toggle('resource')}>
            <div className={styles.itemBox}>
              <div className={styles.innerIcon}>
                <HiEmojiHappy size={25} />
                <div>자원관리</div>
              </div>
              <div className={styles.innerIcon}>
                {submenu.resource ? (
                  <HiChevronDown size={25} />
                ) : (
                  <HiChevronLeft size={25} />
                )}
              </div>
            </div>
          </a>
          <ul
            className={`${styles.dropdown_items} ${
              submenu.resource ? styles.visiable : styles.hidden
            }`}
          >
            <li>
              <MyLink mypage={'자원목록'} to={'resource'} />
            </li>
          </ul>
        </li> */}
      </ul>
    </div>
  );
}

export default Nav;
