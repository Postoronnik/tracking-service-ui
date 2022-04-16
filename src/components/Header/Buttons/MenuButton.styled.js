import styled from "styled-components";
import {Button} from "antd";
import {MenuOutlined} from "@ant-design/icons";

export const MenuButton = styled(Button)`
  
  margin-right: 30px;
  margin-left: 30px;
  
  &:hover{
    transform: scale(1.5);
  }
`;

export const MenuIcon = styled(MenuOutlined)`
  font-size: 40px;
  color: white;
`;
