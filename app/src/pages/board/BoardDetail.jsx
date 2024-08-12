import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { boardApi } from '../../services/board/board';

function BoardDetail() {
  const [images, setImages] = useState([]);

  const { state } = useLocation();

  if (!state) {
    alert('비정삭적인 접근방식입니다.');
    window.location.href = '/board/';
  }

  console.log(state);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     boardApi
  //       .list()
  //       .then((res) => {
  //         setBoard(res.results);
  //       })
  //       .catch((err) => {});
  //   };

  //   fetchData();
  // }, []);

  return <div></div>;
}

export default BoardDetail;
