import React from 'react';
import { Form, Input, Button, Row, Col, Typography } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const AdminLoginForm = () => {

  const onFinish = (values) => {
    console.log('Received values:', values);
   
  };

  return (
    <div style={{ backgroundColor: '#f5f5f5', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Row justify="center" style={{ width: '100%' }}>
        <Col xs={24} sm={18} md={12} lg={8}>
          <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '10px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <Title level={3} style={{ color: '#28a745', textAlign: 'center', marginBottom: '20px' }}>Admin Login</Title>

            <Form
              name="admin_login"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              layout="vertical"
            >
              <Form.Item
                name="username"
                rules={[{ required: true, message: 'Please input your Username!' }]}
              >
                <Input
                  prefix={<UserOutlined style={{ color: '#28a745' }} />}
                  placeholder="Username"
                  style={{ color: 'black' }}
                />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[{ required: true, message: 'Please input your Password!' }]}
              >
                <Input.Password
                  prefix={<LockOutlined style={{ color: '#28a745' }} />}
                  placeholder="Password"
                  style={{ color: 'black' }}
                />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" block style={{ backgroundColor: '#28a745', borderColor: '#28a745' }}>
                  Log In
                </Button>
              </Form.Item>

              <Form.Item>
                <Button
                  type="link"
                  href="/"
                  block
                  style={{ textAlign: 'center', color: '#28a745' }}
                >
                  Back to Home
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default AdminLoginForm;
