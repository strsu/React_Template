import React from 'react';
import styles from './loading.module.css';

const Loading = ({ loading }) => {
  return (
    <div className={styles.container}>
      <div
        className={`${styles.loader} ${
          loading ? styles.visible : styles.hidden
        }`}
      />
      <div className={styles.contents}></div>
    </div>
  );
};

export default Loading;
