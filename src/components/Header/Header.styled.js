import styled from "styled-components";

export const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 5rem;
  background-color: #1E90FF;
  color: white;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0 1%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
  z-index: 10;
  
  & label {
    font-size: 30px;
    font-weight: bold;
  }
`;