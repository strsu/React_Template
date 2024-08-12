import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import styles from './boardbox.module.css';

import { boardApi } from '../../../services/board/board';

const BoardBox = ({ data }) => {
  const [base64, setBase64] = useState('');
  const navigate = useNavigate();

  const loadBoard = () => {
    // 여기서 페이지 이동
    navigate(`/board/${data.id}`, { state: { data: data } });
    // navigate({
    //   pathname: `/resource/${id}`,
    //   search: '{ id: id }',
    // });
  };

  useEffect(() => {
    const fetchData = async () => {
      boardApi
        .image(data.media[0])
        .then((res) => {
          setBase64(res.data);
        })
        .catch((err) => {});
    };

    if (data.media.length) {
      fetchData();
    }
  }, []);

  return (
    <div className={styles.container} onClick={loadBoard}>
      <div>{data.title}</div>
      <div className={styles.image}>
        <img src={base64} />
      </div>
    </div>
  );
};

export default BoardBox;
