// src/components/DashboardLayout.jsx
import React from 'react';
import { Layout, Menu, Typography, Avatar, Space } from 'antd';
import {
  DashboardOutlined,
  UserOutlined,
  LogoutOutlined,
  SolutionOutlined,
} from '@ant-design/icons';

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

const DashboardLayout = ({ children, pageTitle }) => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible>
        <div style={{ height: '32px', margin: '16px', color: 'white', textAlign: 'center', fontSize: '18px' }}>
          ODOO
        </div>
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item key="1" icon={<DashboardOutlined />}>
            My Expenses
          </Menu.Item>
          <Menu.Item key="2" icon={<SolutionOutlined />}>
            Approvals
          </Menu.Item>
          <Menu.Item key="3" icon={<LogoutOutlined />}>
            Logout
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: '0 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Title level={4} style={{ margin: 0 }}>{pageTitle}</Title>
          <Space>
            <Avatar icon={<UserOutlined />} />
            <span>Admin User</span>
          </Space>
        </Header>
        <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;