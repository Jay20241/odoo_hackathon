// src/pages/LoginPage.jsx
import React from 'react';
import { Form, Input, Button, Card, Typography, message } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import apiClient from '../api/apiClient';

const { Title } = Typography;

const LoginPage = () => {
  const onFinish = async (values) => {
    try {
      // Replace with your actual login logic
      // const { data } = await apiClient.post('/auth/login', values);
      console.log('Login successful:', values);
      // localStorage.setItem('authToken', data.token);
      message.success('Login Successful!');
      // window.location.href = '/dashboard'; // Redirect to dashboard
    } catch (error) {
      message.error('Login Failed. Please check your credentials.');
      console.error('Login error:', error);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#f0f2f5' }}>
      <Card style={{ width: 400 }}>
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <Title level={2}>Expense Manager</Title>
        </div>
        <Form name="login" onFinish={onFinish}>
          <Form.Item name="email" rules={[{ required: true, message: 'Please input your Email!' }]}>
            <Input prefix={<MailOutlined />} placeholder="Email" />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true, message: 'Please input your Password!' }]}>
            <Input.Password prefix={<LockOutlined />} placeholder="Password" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
              Log In
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default LoginPage;