import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import styles from './nav.module.css';

import { HiChevronDown, HiChevronLeft, HiEmojiHappy } from 'react-icons/hi';

function Nav() {
  const [page, setPage] = useState('');
  const [submenu, SetSubmenu] = useState({
    sub1: false,
    sub2: false,
  });

  const MyLink = ({ mypage, to }) => {
    return (
      <Link
        className={`${styles.navItem} ${page == mypage ? styles.me : ''}`}
        to={`/${to}`}
        onClick={() => setPage(mypage)}
      >
        <div className={styles.itemBox}>
          <div className={styles.innerIcon}>
            <HiEmojiHappy size={25} />
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
          <MyLink mypage={'Home'} to={''} />
        </li>
        <li>
          <MyLink mypage={'Chat'} to={'chat'} />
        </li>
        <li>
          <a className={`${styles.navItem}`} onClick={() => toggle('sub1')}>
            <div className={styles.itemBox}>
              <div className={styles.innerIcon}>
                <HiEmojiHappy size={25} />
                <div>자원관리</div>
              </div>
              <div className={styles.innerIcon}>
                {submenu.sub1 ? (
                  <HiChevronDown size={25} />
                ) : (
                  <HiChevronLeft size={25} />
                )}
              </div>
            </div>
          </a>
          <ul
            className={`${styles.dropdown_items} ${
              submenu.sub1 ? styles.visiable : styles.hidden
            }`}
          >
            <li>
              <MyLink mypage={'자원등록'} to={'1'} />
            </li>
            <li>
              <MyLink mypage={'2'} to={'2'} />
            </li>
          </ul>
        </li>
        <li>
          <a className={`${styles.navItem}`} onClick={() => toggle('sub2')}>
            <div className={styles.itemBox}>
              <div>서브메뉴2</div>
              <div>
                {submenu.sub2 ? (
                  <HiChevronDown size={25} />
                ) : (
                  <HiChevronLeft size={25} />
                )}
              </div>
            </div>
          </a>
          <ul
            className={`${styles.dropdown_items} ${
              submenu.sub2 ? styles.visiable : styles.hidden
            }`}
          >
            <li>
              <MyLink mypage={'3'} to={'3'} />
            </li>
            <li>
              <MyLink mypage={'4'} to={'4'} />
            </li>
            <li>
              <MyLink mypage={'5'} to={'5'} />
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
}

export default Nav;
