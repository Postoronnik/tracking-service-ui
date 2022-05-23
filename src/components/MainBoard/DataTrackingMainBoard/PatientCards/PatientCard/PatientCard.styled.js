import styled from "styled-components";

export const PatientCard = styled.div`
  width: 20rem;
  height: 20rem;
  border-radius: 25px;
  margin: 10px;
  border: 2px grey solid; // make it dynamic
  box-shadow: 0 3px 3px rgba(0, 0, 0, 0.25); // make it dynamic
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-content: center;
  justify-content: space-around;
  padding: 1rem;
`;