import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './author.module.css';
import useStore from '../../context/store';

const Author = ({ idx, author }) => {
  const navigate = useNavigate();

  const goToProfile = () => {
    useStore.getState().setFeedIdx(idx);
    navigate('/profile', { state: { author: author } });
  };

  return (
    <div className={styles.container}>
      <div className={styles.avatar}>
        <div className={styles.avatar_img} onClick={goToProfile} />
        <div>{author.name}</div>
      </div>
      <div></div>
    </div>
  );
};

export default Author;
