import React, { useState, useEffect, useRef } from 'react';
import styled, { css, keyframes } from 'styled-components';

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  color: darkslategray;
`;

const TopLine = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px !important;
  letter-spacing: -0.35px;
  padding-left: 5px;
  white-space: nowrap;
`;

const MiddleLine = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const BottomLine = styled.div`
  display: flex;
  font-size: 16px !important;
  letter-spacing: -0.35px;
  padding-left: 5px;
`;

const LeftRow = styled.div`
  display: flex;
  margin-bottom: 20px;
  padding-right: 5px;
  white-space: nowrap;
  align-items: center;
`;

const MiddleRow = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
`;

const RightRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  white-space: nowrap;
  margin-bottom: 20px;
  background-color: #ebedef;
  border: 1px solid #eef0f3;
  border-radius: 0.5rem;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border: 1px solid #c2cad5;
  padding: 0 2px;
  border-left: 0;
`;

const Tooltip = styled.div`
  position: absolute;
  background-color: #333;
  color: #fff;
  border-radius: 4px;
  padding: 5px 10px;
  opacity: 1;
  transition: opacity 0.2s;
  white-space: nowrap;
  bottom: 105%; /* 버튼 아래에 표시 */
  z-index: 5;
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const InputError = styled.div`
  display: flex;
  height: 20px;
  align-items: center;
  padding-left: 10px;
  color: red;
  opacity: 0;
  font-size: 12px;
  font-weight: 700;
  animation: ${({ isfadingout }) =>
    isfadingout
      ? css`
          ${fadeIn} 1s ease-in-out forwards
        `
      : css`
          ${fadeOut} 1s ease-in-out forwards
        `};
`;

const Input = styled.input`
  /* 공통 스타일 */
  display: inline-flex;
  align-items: center;
  justify-content: center;

  border: 1px solid #c2cad5;
  border-radius: 0.5rem;
  color: black;
  font-weight: bold;
  padding: 1px 2px;
  padding-left: 5px;

  width: 100%;
  height: calc(1.5em + 1rem + 2px);

  transition: ease background 1s;

  /* 클릭 애니메이션 */
  transition: transform 0.2s ease-in-out;

  /* 클릭 시 변화된 스타일 */
  &:active {
    transform: scale(0.95); /* 클릭 시 버튼 크기를 조금 축소하는 애니메이션 */
  }

  /* type이 date인 경우에만 스타일 적용 */
  ${(props) =>
    props.type === 'date' &&
    css`
      &::-webkit-calendar-picker-indicator {
        background: transparent;
        bottom: 0;
        color: transparent;
        cursor: pointer;
        height: auto;
        left: 0;
        position: absolute;
        right: 0;
        top: 0;
        width: auto;
      }
    `}

  ${(props) => {
    return (
      props.right &&
      css`
        width: 95%;
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
      `
    );
  }}
`;
const YInput = ({
  State,
  top,
  left,
  right,
  bottom,
  type,
  name,
  tooltip,
  color,
  size,
  outline,
  ...rest
}) => {
  const [value, setValue] = State;

  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const [isError, setIsErr] = useState(false);

  let errorMsg = '';

  const inputRefs = useRef(null);
  const tooltipRefs = useRef(null);

  if (type === undefined) {
    type = 'text';
  }

  if (type) {
    if (type == 'korean') {
      errorMsg = '한글만 입력이 가능합니다.';
    } else if (type == 'english') {
      errorMsg = '영어만 입력이 가능합니다.';
    } else if (type == 'number') {
      errorMsg = '숫자만 입력이 가능합니다.';
    } else if (type == 'koreannumber') {
      errorMsg = '한글, 숫자만 입력이 가능합니다.';
    } else if (type == 'englishnumber') {
      errorMsg = '영어, 숫자만 입력이 가능합니다.';
    }
  }

  useEffect(() => {
    if (isTooltipVisible && inputRefs.current && tooltipRefs.current) {
      const inputRect = inputRefs.current.getBoundingClientRect();
      const tooltipRect = tooltipRefs.current.getBoundingClientRect();

      if (tooltipRect.right > window.innerWidth) {
        tooltipRefs.current.style.left = `${
          inputRect.left - tooltipRect.width
        }px`;
      }

      if (tooltipRect.bottom > window.innerHeight) {
        tooltipRefs.current.style.top = `${
          inputRect.top - tooltipRect.height
        }px`;
      }
    }
  }, [isTooltipVisible]);

  const handleInputFocus = () => {
    setIsTooltipVisible(!isTooltipVisible);
  };

  const handleInputBlur = () => {
    setIsTooltipVisible(!isTooltipVisible);
  };

  const handleInputChange = (e) => {
    const currentValue = e.target.value;

    const regex = {
      text: /.*/,
      password: /.*/,
      number: /^[0-9.]+/g,
      english: /^[a-zA-Z\s]+/g,
      korean: /^[ㄱ-ㅎ가-힣\s]+/g,
      englishnumber: /^[a-zA-Z0-9\s]+/g,
      koreannumber: /^[가-힣0-9\s]+/g,
    };

    const appliedRegex = type ? regex[type] : regex.text;

    if (setValue) {
      if (currentValue == '') {
        setValue((oldState) => ({ ...oldState, [name]: currentValue }));
        return;
      }

      if (errorMsg) {
        // 에러 메세지가 있는건 정규식 적용이 필요
        const Matches = currentValue.match(appliedRegex); // 정규식을 사용하여 한글만 추출
        if (Matches) {
          if (Matches.join('') == currentValue) {
            setValue((oldState) => ({ ...oldState, [name]: Matches.join('') }));
            setIsErr(false);
          } else {
            setIsErr(true);
            return;
          }
        } else {
          setIsErr(true);
          return;
        }
      } else {
        setValue((oldState) => ({ ...oldState, [name]: currentValue }));
      }
    }
  };
  return (
    <InputBox>
      <TopLine>{top}</TopLine>
      <MiddleLine>
        {left && <LeftRow>{left}</LeftRow>}
        <MiddleRow>
          {isTooltipVisible && tooltip && (
            <Tooltip ref={tooltipRefs}>{tooltip}</Tooltip>
          )}
          <Input
            type={
              type == 'password' ? 'password' : type == 'number' ? 'text' : type
            }
            name={name}
            value={value[name]}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            ref={inputRefs}
            right={right}
            {...rest}
          />
          <InputError isfadingout={isError.toString()}>
            <ul style={{ paddingLeft: '15px' }}>
              {isError && <li>{errorMsg}</li>}
            </ul>
          </InputError>
        </MiddleRow>
        {right && <RightRow>{right}</RightRow>}
      </MiddleLine>
      <BottomLine>{bottom}</BottomLine>
    </InputBox>
  );
};
export default YInput;
