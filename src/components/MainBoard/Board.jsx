import { Layout, Menu } from 'antd';
import React, { useState } from 'react';
import { CopyOutlined, UploadOutlined, UserOutlined } from '@ant-design/icons';

import * as Styled from './Board.styled';

import 'antd/dist/antd.css';

const { Sider } = Layout;

const Board = () => {
  const [collapsed, setCollapsed] = useState();

  const toggle = () => {
    setCollapsed((prev) => !prev);
  };

  return (
    <Layout>
      <Styled.Header>
        <Styled.Trigger onClick={toggle} />
        <label>Patients Heath Tracker</label>
      </Styled.Header>
      <Styled.InnerLayout>
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          collapsedWidth="0"
          style={{ background: 'white' }}
        >
          <Menu theme="white" mode="inline">
            <Menu.Item key="1" icon={<UserOutlined />}>
              Patients Tracker
            </Menu.Item>
            <Menu.Item key="2" icon={<CopyOutlined />}>
              Patient Data
            </Menu.Item>
            <Menu.Item key="3" icon={<UploadOutlined />}>
              Data emulator
            </Menu.Item>
          </Menu>
        </Sider>
        <Styled.ContentBoard />
      </Styled.InnerLayout>
    </Layout>
  );
};

export default Board;
