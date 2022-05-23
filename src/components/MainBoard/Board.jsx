import React, {useState} from 'react';
import { Layout, Menu } from 'antd';
import {
  UserOutlined,
  CopyOutlined,
} from '@ant-design/icons';

import * as Styled from './Board.styled';
import PatientCards from "./DataTrackingMainBoard/PatientCards/PatientCards";
import DataControlMainBoard from "./DataControllMainBoard/DataControlMainBoard";

const {Sider} = Layout;

const Board = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [boardType, setBoardType] = useState("1");

  const toggle = () => {
    setCollapsed(prev=>!prev);
  };

  const selectBoard = (e) => {
    if (e.key === boardType) {
      return;
    }
    setBoardType(e.key);
    console.log(e.key);
  }

  return (
      <Layout>
        <Styled.Header>
          <Styled.Trigger onClick={toggle}/>
          <label>Patients Heath Tracker</label>
        </Styled.Header>
        <Styled.InnerLayout>
          <Sider trigger={null} collapsible collapsed={collapsed} collapsedWidth = '0' style={{background : 'white'}}>
            <Menu theme="white" mode="inline" selectedKeys={boardType}>
              <Menu.Item key="1" icon={<UserOutlined />} onClick={selectBoard} >
                Patients Tracker
              </Menu.Item>
              <Menu.Item key="2" icon={<CopyOutlined />} onClick={selectBoard}>
                Patient Data
              </Menu.Item>
            </Menu>
          </Sider>
          <Styled.ContentBoard>
            {boardType === "1" ?
                <PatientCards>
                </PatientCards>
                :
                <DataControlMainBoard>

                </DataControlMainBoard>
            }
          </Styled.ContentBoard>
        </Styled.InnerLayout>
      </Layout>
  )};

export default Board;