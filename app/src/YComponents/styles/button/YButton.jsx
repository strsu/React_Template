import React, { useState } from 'react';
import styled, { css, keyframes } from 'styled-components';

const theme = {
  blue: {
    default: '#3f51b5',
    hover: '#283593',
  },
  pink: {
    default: '#e91e63',
    hover: '#ad1457',
  },
  gray: {
    default: '#495057',
    hover: '#283593',
  },
};

const colorStyles = css`
  ${({ color }) => {
    const selected = theme[color].default;
    return css`
      background: ${selected};
      &:hover {
        background: ${theme[color].hover};
      }
      &:disabled {
        cursor: default;
        opacity: 0.7;
      }
      ${(props) =>
        props.outline &&
        css`
          color: ${selected};
          background: none;
          border: 1px solid ${selected};
          &:hover {
            background: ${selected};
            color: white;
          }
        `}
    `;
  }}
`;

const sizes = {
  large: {
    height: '3rem',
    fontSize: '1.25rem',
  },
  medium: {
    height: '2.25rem',
    fontSize: '1rem',
  },
  small: {
    height: '1.75rem',
    fontSize: '0.875rem',
  },
};

const sizeStyles = css`
  ${({ size }) => css`
    height: ${sizes[size].height};
    font-size: ${sizes[size].fontSize};
  `}
`;

const fullWidthStyle = css`
  ${(props) =>
    props.fullwidth &&
    css`
      width: 100%;
    `}
`;

// 클릭 애니메이션 정의
const clickAnimation = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(0.9);
  }
  100% {
    transform: scale(1);
  }
`;

const Button = styled.button`
  /* 공통 스타일 */
  display: inline-flex;
  align-items: center;
  justify-content: center;

  outline: none;
  border: none;
  border-radius: 0.5rem;
  color: white;
  font-weight: bold;
  cursor: pointer;
  padding: 0.75rem 1rem;
  margin: 0.5rem 0.5rem;

  white-space: nowrap;

  transition: ease background 1s;

  /* 로딩 애니메이션 */
  animation: ${clickAnimation} 0.5s ease-in-out;

  /* 클릭 애니메이션 */
  transition: transform 0.2s ease-in-out;

  /* 클릭 시 변화된 스타일 */
  &:active {
    transform: scale(0.95); /* 클릭 시 버튼 크기를 조금 축소하는 애니메이션 */
  }

  /* 크기 */
  ${sizeStyles}

  /* 색상 */
  ${colorStyles}

  /* 기타 */
  // & + & {
  //   margin-left: 1rem;
  // }

  ${fullWidthStyle}
`;

const YButton = ({ children, color, size, outline, fullwidth, ...rest }) => {
  return (
    <Button
      color={color}
      size={size}
      outline={outline}
      fullwidth={fullwidth}
      {...rest}
    >
      {children}
    </Button>
  );
};

Button.defaultProps = {
  color: 'blue',
  size: 'medium',
};

export default YButton;
