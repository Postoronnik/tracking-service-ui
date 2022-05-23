import styled from 'styled-components';

export const Bar = styled.div`
  width: 100%;
  height: 3.1rem;
  border-bottom: 0.5px #1e90ff solid;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const ShortData = styled.div`
  width: 80%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-content: center;
  margin: 1%;
  font: 18px 'Fira Sans', sans-serif;

  div {
    margin-right: 10px;
  }
`;

export const BarMenu = styled.div`
  width: 10%;
  height: 100%;
  margin: 5px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-content: center;

  input[type='checkbox'] {
    transform: scale(2);

    margin: 11px;
  }
`;
