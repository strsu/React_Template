import React, { useState, useEffect, useRef } from 'react';
import styled, { css, keyframes } from 'styled-components';

const SelectBox = styled.div`
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
  padding-top: calc((1.5em + 1rem + 2px) / 4);
  padding-right: 5px;
  white-space: nowrap;
`;

const MiddleRow = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  margin-bottom: 20px;
`;

const RightRow = styled.div`
  display: flex;
  justify-content: center;
  white-space: nowrap;
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

const SelectError = styled.div`
  display: flex;
  height: 20px;
  align-items: center;
  padding-left: 10px;
  color: red;
  opacity: 0;
  font-size: 12px;
  font-weight: 700;
  animation: ${({ isFadingOut }) =>
    isFadingOut
      ? css`
          ${fadeIn} 1s ease-in-out forwards
        `
      : css`
          ${fadeOut} 1s ease-in-out forwards
        `};
`;

const Select = styled.select`
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

  height: calc(1.5em + 1rem + 2px);

  transition: ease background 1s;

  /* 클릭 애니메이션 */
  transition: transform 0.2s ease-in-out;

  /* 클릭 시 변화된 스타일 */
  &:active {
    transform: scale(0.95); /* 클릭 시 버튼 크기를 조금 축소하는 애니메이션 */
  }
`;
const YSelect = ({
  State,
  options,
  helpText,
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
  const selectRefs = useRef(null);
  const tooltipRefs = useRef(null);

  useEffect(() => {
    if (isTooltipVisible && selectRefs.current && tooltipRefs.current) {
      const selectRect = selectRefs.current.getBoundingClientRect();
      const tooltipRect = tooltipRefs.current.getBoundingClientRect();

      if (tooltipRect.right > window.innerWidth) {
        tooltipRefs.current.style.left = `${
          selectRect.left - tooltipRect.width
        }px`;
      }

      if (tooltipRect.bottom > window.innerHeight) {
        tooltipRefs.current.style.top = `${
          selectRect.top - tooltipRect.height
        }px`;
      }
    }
  }, [isTooltipVisible]);

  const handleSelectFocus = () => {
    setIsTooltipVisible(!isTooltipVisible);
  };

  const handleSelectBlur = () => {
    setIsTooltipVisible(!isTooltipVisible);
  };

  const handleSelectChange = (e) => {
    const currentValue = e.target.value;
    setValue((oldState) => ({ ...oldState, [name]: currentValue }));
  };
  return (
    <SelectBox>
      <TopLine>{top}</TopLine>
      <MiddleLine>
        {left && <LeftRow>{left}</LeftRow>}
        <MiddleRow>
          {isTooltipVisible && tooltip && (
            <Tooltip ref={tooltipRefs}>{tooltip}</Tooltip>
          )}
          <Select value={value[name]} {...rest} onChange={handleSelectChange}>
            <option value={null}>{helpText}</option>
            {options?.map((option, idx) => {
              return (
                <option value={option[0]} key={idx}>
                  {option[1]}
                </option>
              );
            })}
          </Select>
        </MiddleRow>
        {right && <RightRow>{right}</RightRow>}
      </MiddleLine>
      <BottomLine>{bottom}</BottomLine>
    </SelectBox>
  );
};
export default YSelect;
