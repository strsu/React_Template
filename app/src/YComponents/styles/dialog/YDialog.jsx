import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import YButton from '../button/YButton';

import useApi from '../../../hook/useApi';

const fadeIn = keyframes`
  from {
    opacity: 0
  }
  to {
    opacity: 1
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1
  }
  to {
    opacity: 0
  }
`;

const slideUp = keyframes`
  from {
    transform: translateY(200px);
  }
  to {
    transform: translateY(0px);
  }
`;

const slideDown = keyframes`
  from {
    transform: translateY(0px);
  }
  to {
    transform: translateY(200px);
  }
`;

const DarkBackground = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.8);
  z-index: 100;

  animation-duration: 0.25s;
  animation-timing-function: ease-out;
  animation-name: ${fadeIn};
  animation-fill-mode: forwards;

  ${(props) =>
    props.disappear === 'true' &&
    css`
      animation-name: ${fadeOut};
    `}
`;

const DialogBlock = styled.div`
  // width: 320px;
  padding: 1.5rem;
  background: white;
  border-radius: 0.5rem;
  h3 {
    margin: 0;
    font-size: 1.5rem;
  }
  p {
    font-size: 1.125rem;
  }

  animation-duration: 0.25s;
  animation-timing-function: ease-out;
  animation-name: ${slideUp};
  animation-fill-mode: forwards;

  ${(props) =>
    props.disappear === 'true' &&
    css`
      animation-name: ${slideDown};
    `}
`;

const ButtonGroup = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: flex-end;
`;

const ShortMarginButton = styled(YButton)`
  & + & {
    margin-left: 0.5rem;
  }
`;

const ErrMsg = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  animation-duration: 1s;
  animation-timing-function: ease-out;
  animation-name: ${fadeIn};
  animation-fill-mode: forwards;

  ${(props) => {
    return (
      props.errmsg === '' &&
      css`
        animation-name: ${fadeOut};
      `
    );
  }}
`;

function YDialog({
  title,
  State,
  Component,
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
  visible,
}) {
  const [animate, setAnimate] = useState(false);
  const [localVisible, setLocalVisible] = useState(visible);
  const [errMsg, setErrMsg] = useState('');

  useEffect(() => {
    // visible 값이 true -> false 가 되는 것을 감지
    if (localVisible && !visible) {
      setAnimate(true);
      setTimeout(() => setAnimate(false), 250);
    }
    setLocalVisible(visible);
    setErrMsg('');
  }, [localVisible, visible]);

  if (!animate && !localVisible) return null;

  const handleOnConfirm = async () => {
    onConfirm(State[0])
      .then((res) => {
        console.log('##@@', res);
        if (res === true) {
          window.location.reload();
        } else {
          console.log(res);
          setErrMsg(res);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <DarkBackground disappear={(!visible).toString()}>
      <DialogBlock disappear={(!visible).toString()}>
        <h3>{title}</h3>
        {Component && <Component State={State} />}
        <ErrMsg errmsg={errMsg}>{errMsg}</ErrMsg>
        <ButtonGroup>
          <ShortMarginButton color="gray" onClick={onCancel}>
            {cancelText}
          </ShortMarginButton>
          <ShortMarginButton color="pink" onClick={handleOnConfirm}>
            {confirmText}
          </ShortMarginButton>
        </ButtonGroup>
      </DialogBlock>
    </DarkBackground>
  );
}

YDialog.defaultProps = {
  confirmText: '확인',
  cancelText: '취소',
};

export default YDialog;
