import React, { useState } from 'react';
import { Form, Input, Button, Card, Typography, Alert, Space } from 'antd';
import { UserOutlined, LockOutlined, LoginOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

interface AdminLoginProps {
  onLogin: (success: boolean) => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (values: { username: string; password: string }) => {
    setLoading(true);
    setErrorMessage('');

    try {
      // Get stored admin credentials
      const adminConfig = localStorage.getItem('admin_config');
      if (!adminConfig) {
        setErrorMessage('Admin configuration not found.');
        return;
      }

      const { username: storedUsername, password: storedPassword } = JSON.parse(adminConfig);

      // Simple authentication (in real app, this would be more secure)
      if (values.username === storedUsername && btoa(values.password) === storedPassword) {
        // Set admin session
        localStorage.setItem('admin_session', 'true');
        onLogin(true);
      } else {
        setErrorMessage('Invalid username or password.');
      }
    } catch (error) {
      setErrorMessage('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <div className="text-center mb-8">
          <UserOutlined className="text-6xl text-purple-600 mb-4" />
          <Title level={2} className="mb-2">Admin Login</Title>
          <Paragraph className="text-gray-600">
            Enter your admin credentials to access the admin panel
          </Paragraph>
        </div>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Space direction="vertical" size="large" className="w-full">
            <Form.Item
              label="Username"
              name="username"
              rules={[{ required: true, message: 'Please enter username' }]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="Enter admin username"
              />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please enter password' }]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Enter admin password"
              />
            </Form.Item>

            {errorMessage && (
              <Alert
                message={errorMessage}
                type="error"
                showIcon
                closable
                onClose={() => setErrorMessage('')}
              />
            )}

            <Button
              type="primary"
              size="large"
              htmlType="submit"
              loading={loading}
              className="w-full"
            >
              {loading ? 'Logging in...' : <><LoginOutlined /> Login</>}
            </Button>
          </Space>
        </Form>

        <div className="text-center text-sm text-gray-500 mt-6">
          <Paragraph>
            Forgot your credentials? Check the setup documentation.
          </Paragraph>
        </div>
      </Card>
    </div>
  );
};

export default AdminLogin;