import React, { useEffect, useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import { boardApi } from '../../services/board/board';

import styles from './boardlist.module.css';

import BoardBox from './component/BoardBox';
import FloatingButton from '../../components/FloatingButton/FloatingButton';

function BoardList() {
  const [board, setBoard] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      boardApi
        .list()
        .then((res) => {
          setBoard(res.results);
        })
        .catch((err) => {});
    };

    fetchData();
  }, []);

  const navigate = useNavigate();

  const moveWrite = () => {
    // 여기서 페이지 이동
    navigate(`/board/write/`);
  };

  return (
    <div className={styles.container}>
      {board.map((data, idx) => {
        return <BoardBox key={idx} data={data} />;
      })}
      <FloatingButton function_list={[moveWrite]} />
    </div>
  );
}

export default BoardList;
