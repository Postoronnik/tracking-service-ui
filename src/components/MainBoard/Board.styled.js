import styled from "styled-components";
import { Layout, Menu } from 'antd';
import {MenuOutlined} from "@ant-design/icons";

export const InnerLayout = styled(Layout)`
  margin-top: 5rem;
  background: white;
`;

export const Header = styled(Layout.Header)`
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

export const ContentBoard = styled(Layout.Content)`
  background: white;
  margin: 24px 16px;
  padding: 24px;
  width: 2000px;
  height: 1050px;
`;

export const Trigger = styled(MenuOutlined)`
  padding: 0 24px;
  font-size: 18px;
  line-height: 64px;
  cursor: pointer;
  transition: color 0.3s;
  color: white;
  
`;