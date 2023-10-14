import { Link, useNavigate } from 'react-router-dom';
import styled, { css, keyframes } from 'styled-components';

const gridStyles = css`
  ${({ grid }) => {
    return css`
      grid-template-columns: ${grid};
    `;
  }}
`;

const Table = styled.table`
  /* 공통 스타일 */
  display: grid;

  position: relative;
  border-collapse: collapse;
  overflow: auto;

  background: white;
  cursor: pointer;

  & > thead {
    display: contents;

    & > tr {
      display: contents;

      & > th {
        display: flex;
        padding: 6px 12px;
        border-bottom: 1px solid #dde2eb;
        white-space: nowrap;
      }
    }
  }

  & > tbody {
    display: contents;

    & > tr {
      display: contents;
      color: #757575;

      &:hover {
        color: #141414;
      }

      & > td {
        display: flex;
        padding: 6px 12px;
        border-bottom: 1px solid #dde2eb;
        white-space: nowrap;
      }
    }
  }

  /* 색상 */
  ${gridStyles}
`;

const YTable = ({ grid, columns, datas, tr_url, ...rest }) => {
  const navigate = useNavigate();

  const matches = tr_url?.match(/\${(.*?)}/g);

  if (!grid) {
    grid = `repeat(${columns.length}, minmax(50px, 200px))`;
  }

  return (
    <Table grid={grid}>
      <thead>
        <tr>
          {columns.map((col, idx) => {
            return <th key={idx}>{col.label}</th>;
          })}
        </tr>
      </thead>
      <tbody>
        {datas.map((data, idx) => {
          const param = {};
          let new_url = tr_url;
          if (new_url && matches) {
            matches.forEach((match) => {
              const key = match.match(/\${(.*?)}/)[1]; // `${}` 안의 문자열 추출
              new_url = new_url.replace(match, data[key]);
              param[key] = data[key];
            });
          }

          const loadResource = () => {
            navigate(new_url, { state: param });
          };

          return (
            <tr key={idx} onClick={new_url && loadResource}>
              {columns.map((row, idx) => {
                return <td key={idx}>{row.renderCell(data)}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default YTable;
