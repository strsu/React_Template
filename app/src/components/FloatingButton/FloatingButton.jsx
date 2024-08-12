import React, { useState, useEffect } from 'react';
import styles from './FloatingButton.module.css';

const FloatingButton = ({ function_list }) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggle = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className={styles.floating_container}>
      <div className={styles.floating_button} onClick={toggle}></div>
      {
        <div
          className={`${styles.secondary_buttons} ${
            isVisible ? styles.visiable : ''
          }`}
        >
          {function_list?.map((func, idx) => {
            return (
              <button key={idx} onClick={func}>
                1
              </button>
            );
          })}
        </div>
      }
    </div>
  );
};

export default FloatingButton;
