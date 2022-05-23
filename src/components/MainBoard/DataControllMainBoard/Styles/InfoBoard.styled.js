import styled from "styled-components";

export const Board = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-content: flex-start;
  align-items: flex-start;
  justify-items: flex-start;
  margin: 10px;
`;

export const BoardData = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-content: center;
  margin: 10px;
  font: 18px "Fira Sans", sans-serif;
  
  div{
    margin: 2.5px;
  }
`;

export const BoardMenu = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-content: center;
  margin-left: 84%;
`;