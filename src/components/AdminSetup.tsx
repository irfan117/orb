import React, { useState } from 'react';
import { Form, Input, Button, Card, Typography, Alert, Space, Divider, Progress } from 'antd';
import { UserOutlined, LockOutlined, CheckCircleOutlined, LoadingOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

interface AdminConfig {
  username: string;
  password: string;
  confirmPassword: string;
}

interface AdminSetupProps {
  onComplete: (config: Omit<AdminConfig, 'confirmPassword'>) => void;
}

const AdminSetup: React.FC<AdminSetupProps> = ({ onComplete }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');

  const calculatePasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[a-z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    return strength;
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    setPasswordStrength(calculatePasswordStrength(password));
  };

  const handleSubmit = async (values: AdminConfig) => {
    if (values.password !== values.confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    if (passwordStrength < 75) {
      setErrorMessage('Password is too weak. Please use a stronger password.');
      return;
    }

    setLoading(true);
    try {
      // Hash password (in real app, this would be done on server)
      const hashedPassword = btoa(values.password); // Simple base64 for demo

      const adminConfig = {
        username: values.username,
        password: hashedPassword
      };

      // Save to localStorage for demo
      localStorage.setItem('admin_config', JSON.stringify(adminConfig));
      localStorage.setItem('setup_step', 'complete');

      onComplete(adminConfig);
    } catch (error) {
      setErrorMessage('Failed to save admin configuration.');
    } finally {
      setLoading(false);
    }
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength < 25) return '#ff4d4f';
    if (passwordStrength < 50) return '#faad14';
    if (passwordStrength < 75) return '#52c41a';
    return '#389e0d';
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength < 25) return 'Very Weak';
    if (passwordStrength < 50) return 'Weak';
    if (passwordStrength < 75) return 'Good';
    return 'Strong';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-2xl">
        <div className="text-center mb-8">
          <UserOutlined className="text-6xl text-green-600 mb-4" />
          <Title level={2} className="mb-2">Admin Setup</Title>
          <Paragraph className="text-gray-600">
            Create your administrator account to manage the ORB system
          </Paragraph>
        </div>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{
            username: 'admin'
          }}
        >
          <Space direction="vertical" size="large" className="w-full">
            <Form.Item
              label="Admin Username"
              name="username"
              rules={[
                { required: true, message: 'Please enter admin username' },
                { min: 3, message: 'Username must be at least 3 characters' }
              ]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="Enter admin username"
              />
            </Form.Item>

            <Form.Item
              label="Admin Password"
              name="password"
              rules={[
                { required: true, message: 'Please enter admin password' },
                { min: 8, message: 'Password must be at least 8 characters' }
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Enter admin password"
                onChange={handlePasswordChange}
              />
            </Form.Item>

            {form.getFieldValue('password') && (
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Password Strength</span>
                  <span className="text-sm font-medium" style={{ color: getPasswordStrengthColor() }}>
                    {getPasswordStrengthText()}
                  </span>
                </div>
                <Progress
                  percent={passwordStrength}
                  showInfo={false}
                  strokeColor={getPasswordStrengthColor()}
                  size="small"
                />
                <div className="text-xs text-gray-500 mt-1">
                  Use at least 8 characters with uppercase, lowercase, and numbers
                </div>
              </div>
            )}

            <Form.Item
              label="Confirm Password"
              name="confirmPassword"
              rules={[
                { required: true, message: 'Please confirm admin password' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Passwords do not match'));
                  },
                }),
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Confirm admin password"
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
              disabled={passwordStrength < 75}
            >
              {loading ? <LoadingOutlined /> : <CheckCircleOutlined />}
              Complete Setup
            </Button>
          </Space>
        </Form>

        <Divider />

        <div className="text-center text-sm text-gray-500">
          <Paragraph>
            <strong>Security Note:</strong> Keep your admin credentials secure and don't share them with others.
          </Paragraph>
        </div>
      </Card>
    </div>
  );
};

export default AdminSetup;