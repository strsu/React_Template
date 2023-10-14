import styled, { css, keyframes } from 'styled-components';

const gridStyles = css`
  ${({ row, col, grid }) => {
    if (grid) {
      return css`
        grid-template-columns: ${grid};
      `;
    } else {
      return css`
        grid-template-columns: repeat(${col}, 1fr);
        grid-template-rows: repeat(${row}, minmax(0px, auto));
      `;
    }
  }}
`;

const YGrid = styled.div`
  /* 공통 스타일 */
  display: grid;

  gap: 10px 20px;
  margin: 1em 0;

  white-space: nowrap;

  /* 색상 */
  ${gridStyles}
`;

YGrid.defaultProps = {
  row: 1,
  col: 3,
  grid: null,
};

export default YGrid;
