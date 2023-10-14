import React, { useState, useEffect } from 'react';
import styles from './home.module.css';

import YButton from '../../YComponents/styles/button/YButton';
import YInput from '../../YComponents/styles/input/YInput';
import YDialogActor from '../../YComponents/service/dialog/YDialogActor';

import PlantRegist from '../resource/components/PlantRegist';
import useApi from '../../hook/useApi';

function HomePresenter(props) {
  const state = useState({ a: '12' });

  const onConfirm = async () => {
    console.log('확인');
  };

  return (
    <div className={styles.container}>
      <YInput
        name="a"
        type="korean"
        top="상단 타이틀 - 한글만 입력가능"
        State={state}
      />
      <YInput name="b" type="password" left="왼쪽 라벨" State={state} />

      <div>
        <YButton size="large">BUTTON</YButton>
        <YButton>버튼의 길이는 텍스트에 맞도록</YButton>
        <YButton size="small">BUTTON</YButton>
      </div>
      <div>
        <YButton color="gray" size="large">
          BUTTON
        </YButton>
        <YButton color="gray">BUTTON</YButton>
        <YButton color="gray" size="small">
          BUTTON
        </YButton>
      </div>
      <div>
        <YButton color="pink" size="large">
          BUTTON
        </YButton>
        <YButton color="pink">BUTTON</YButton>
        <YButton color="pink" size="small">
          BUTTON
        </YButton>
      </div>
      <div>
        <YButton color="pink" size="large" outline>
          BUTTON
        </YButton>
        <YButton color="pink" outline>
          BUTTON
        </YButton>
        <YButton color="pink" size="small" outline>
          BUTTON
        </YButton>
      </div>
      <div>
        <YButton color="pink" size="large" fullwidth>
          BUTTON
        </YButton>
        <YButton color="pink" fullwidth>
          BUTTON
        </YButton>
        <YButton color="pink" size="small" fullwidth disabled>
          BUTTON
        </YButton>
      </div>

      <YDialogActor
        title="정말로 삭제하시겠습니까?"
        State={state}
        Component={PlantRegist}
        confirmText="삭제"
        cancelText="취소"
        onConfirm={onConfirm}
      >
        삭제
      </YDialogActor>
    </div>
  );
}

export default HomePresenter;
