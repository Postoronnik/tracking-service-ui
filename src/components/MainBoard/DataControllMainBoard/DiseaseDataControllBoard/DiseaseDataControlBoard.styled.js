import styled from 'styled-components';
import { Radio } from 'antd';

const RadioGroup = Radio.Group;

export const DiseaseBoardLayer = styled.div`
  width: 49%;
  height: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  border: 1px #1e90ff solid;
  border-radius: 20px;
  margin-right: 15px;
`;

export const MenuLayer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-end;
  align-content: center;
  font-size: 15px;
  font-weight: bold;

  width: 100%;
  height: 4%;
  border-bottom: 1px #1e90ff solid;
`;

export const ComponentsLayer = styled(RadioGroup)`
  display: flex;
  flex: 1;
  flex-direction: column;
  flex-wrap: nowrap;
  min-height: 92%;

  width: 100%;
`;

export const PaginationLayer = styled.div`
  display: flex;
  flex: 1;
  flex-wrap: nowrap;
  justify-content: center;
  align-content: center;
  height: 4%;
  width: 100%;
`;
