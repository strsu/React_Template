import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { boardApi } from '../../services/board/board';

import YGrid from '../../YComponents/styles/grid/YGrid';
import YInput from '../../YComponents/styles/input/YInput';
import YButton from '../../YComponents/styles/button/YButton';

const BoardWriting = () => {
  const state = useState([]);

  // const { state } = useLocation();

  // if (!state) {
  //   alert('비정삭적인 접근방식입니다.');
  //   window.location.href = '/board/';
  // }

  const [text, setText] = useState('');
  const [image, setImage] = useState(null);

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const onClickSave = () => {};

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <YInput type="text" name="title" top="제목" State={state} />
      <YInput type="text" name="text" top="내용" State={state} />
      <div></div>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <YGrid grid="1fr 1fr">
        <YButton onClick={onClickSave}>취소</YButton>
        <YButton onClick={onClickSave}>저장</YButton>
      </YGrid>
    </form>
  );
};

export default BoardWriting;
