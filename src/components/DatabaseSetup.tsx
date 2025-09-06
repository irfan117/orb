import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Card, Typography, Alert, Space, Divider } from 'antd';
import { DatabaseOutlined, CheckCircleOutlined, LoadingOutlined } from '@ant-design/icons';
import { useConnection } from '../contexts/ConnectionContext';

const { Title, Paragraph } = Typography;

interface DatabaseConfig {
  supabaseUrl: string;
  supabaseAnonKey: string;
}

interface DatabaseSetupProps {
  onComplete: (config: DatabaseConfig) => void;
}

const DatabaseSetup: React.FC<DatabaseSetupProps> = ({ onComplete }) => {
  const { connectionState, testConnection } = useConnection();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [testStatus, setTestStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [autoSetupLoading, setAutoSetupLoading] = useState(true);

  // Safety check: If setup is already complete, don't render this component
  const savedSetupStep = localStorage.getItem('setup_step');
  const savedConnection = localStorage.getItem('orb_supabase_connection');
  if (savedSetupStep === 'complete' && savedConnection) {
    // Auto-complete setup if we somehow got here
    try {
      const { url, key } = JSON.parse(savedConnection);
      onComplete({ supabaseUrl: url, supabaseAnonKey: key });
    } catch (error) {
      console.error('Error parsing saved connection:', error);
    }
    return null;
  }

  // Check for existing working connection on component mount
  useEffect(() => {
    const checkExistingConnection = async () => {
      // Check if ConnectionContext already has a working connection
      if (connectionState.isConnected && connectionState.supabaseUrl && connectionState.supabaseKey) {
        // Auto-complete setup with existing connection
        localStorage.setItem('orb_supabase_connection', JSON.stringify({
          url: connectionState.supabaseUrl,
          key: connectionState.supabaseKey
        }));
        localStorage.setItem('setup_step', 'complete');
        onComplete({
          supabaseUrl: connectionState.supabaseUrl,
          supabaseAnonKey: connectionState.supabaseKey
        });
        return;
      }

      // Check for demo connection that might work
      const demoConnection = localStorage.getItem('demo_connection');
      if (demoConnection) {
        try {
          const { url, key } = JSON.parse(demoConnection);
          const isValid = await testConnection(url, key);
          if (isValid) {
            // Auto-complete setup with demo connection
            localStorage.setItem('orb_supabase_connection', JSON.stringify({ url, key }));
            localStorage.setItem('setup_step', 'complete');
            onComplete({ supabaseUrl: url, supabaseAnonKey: key });
            return;
          }
        } catch (error) {
          console.error('Demo connection check failed:', error);
        }
      }

      setAutoSetupLoading(false);
    };

    checkExistingConnection();
  }, [connectionState, testConnection, onComplete]);

  const handleTestConnection = async (values: DatabaseConfig) => {
    setLoading(true);
    setTestStatus('testing');
    setErrorMessage('');

    try {
      // Test Supabase connection
      const { createClient } = await import('@supabase/supabase-js');
      const supabase = createClient(values.supabaseUrl, values.supabaseAnonKey);

      // Test basic connectivity by trying to get project info
      const { data: _, error } = await supabase.auth.getSession();

      if (error) {
        throw error;
      }

      setTestStatus('success');
    } catch (error: any) {
      setTestStatus('error');
      setErrorMessage(`Failed to connect to Supabase: ${error.message || 'Please check your configuration.'}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (values: DatabaseConfig) => {
    if (testStatus !== 'success') {
      setErrorMessage('Please test the connection first.');
      return;
    }

    setLoading(true);
    try {
      // Save configuration to localStorage for demo
      localStorage.setItem('db_config', JSON.stringify(values));
      localStorage.setItem('setup_step', 'complete');
      localStorage.setItem('orb_setup_permanent', 'true');

      onComplete(values);
    } catch (error) {
      setErrorMessage('Failed to save configuration.');
    } finally {
      setLoading(false);
    }
  };

  // Show loading while checking for existing connections
  if (autoSetupLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl shadow-2xl">
          <div className="text-center mb-8">
            <DatabaseOutlined className="text-6xl text-blue-600 mb-4" />
            <Title level={2} className="mb-2">Checking Connection...</Title>
            <Paragraph className="text-gray-600">
              Looking for existing Supabase connection...
            </Paragraph>
          </div>
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Please wait...</p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-2xl">
        <div className="text-center mb-8">
          <DatabaseOutlined className="text-6xl text-blue-600 mb-4" />
          <Title level={2} className="mb-2">Supabase Setup</Title>
          <Paragraph className="text-gray-600">
            Configure your Supabase connection to get started with ORB
          </Paragraph>
        </div>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{
            supabaseUrl: '',
            supabaseAnonKey: ''
          }}
        >
          <Space direction="vertical" size="large" className="w-full">
            <Form.Item
              label="Supabase URL"
              name="supabaseUrl"
              rules={[
                { required: true, message: 'Please enter Supabase URL' },
                { pattern: /^https:\/\/.*\.supabase\.co$/, message: 'Please enter a valid Supabase URL' }
              ]}
            >
              <Input placeholder="https://your-project.supabase.co" />
            </Form.Item>

            <Form.Item
              label="Supabase Anon Key"
              name="supabaseAnonKey"
              rules={[
                { required: true, message: 'Please enter Supabase anon key' },
                { min: 100, message: 'Anon key should be at least 100 characters' }
              ]}
            >
              <Input.Password placeholder="Enter your Supabase anon key" />
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

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                type="default"
                size="large"
                onClick={() => form.validateFields().then(handleTestConnection)}
                loading={loading && testStatus === 'testing'}
                disabled={testStatus === 'success'}
                className="flex-1"
              >
                {testStatus === 'testing' && <LoadingOutlined />}
                {testStatus === 'success' && <CheckCircleOutlined />}
                {testStatus === 'idle' && 'Test Connection'}
                {testStatus === 'success' && 'Connection Successful'}
              </Button>

              <Button
                type="primary"
                size="large"
                htmlType="submit"
                loading={loading && testStatus !== 'testing'}
                disabled={testStatus !== 'success'}
                className="flex-1"
              >
                Complete Setup
              </Button>
            </div>
          </Space>
        </Form>

        <Divider />

        <div className="text-center text-sm text-gray-500">
          <Paragraph>
            Need help? Check our{' '}
            <a href="#" className="text-blue-600 hover:text-blue-800">
              Supabase setup guide
            </a>
          </Paragraph>
          <Paragraph className="mt-2">
            Don't have a Supabase project?{' '}
            <a
              href="https://supabase.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800"
            >
              Create one here
            </a>
          </Paragraph>
          <Divider />
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <Paragraph className="text-xs text-blue-800 mb-2">
              <strong>📋 After connecting, run the database setup:</strong>
            </Paragraph>
            <Paragraph className="text-xs text-blue-700 mb-2">
              Copy and run the SQL from the <code>database_setup_simple.sql</code> file in your Supabase SQL editor (recommended), or use the full version from <code>database_setup.sql</code>:
            </Paragraph>
            <details className="text-xs">
              <summary className="cursor-pointer text-blue-800 font-medium mb-2">Click to expand SQL setup</summary>
              <Paragraph className="text-xs text-blue-700 font-mono bg-white p-2 rounded border max-h-40 overflow-y-auto">
                -- Create tables<br />
                CREATE TABLE content (id SERIAL PRIMARY KEY, key VARCHAR(100) UNIQUE NOT NULL, value TEXT NOT NULL, created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(), updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW());<br />
                CREATE TABLE activities (id SERIAL PRIMARY KEY, title VARCHAR(255) NOT NULL, description TEXT NOT NULL, date TIMESTAMP WITH TIME ZONE NOT NULL, location VARCHAR(255) NOT NULL, participants INTEGER NOT NULL DEFAULT 0, status VARCHAR(50) NOT NULL DEFAULT 'Upcoming', category VARCHAR(100) NOT NULL, image_url TEXT, created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(), updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW());<br />
                CREATE TABLE books (id SERIAL PRIMARY KEY, title VARCHAR(255) NOT NULL, author VARCHAR(255) NOT NULL, description TEXT NOT NULL, cover_image_url TEXT, download_link TEXT, category VARCHAR(100) NOT NULL, status VARCHAR(50) NOT NULL DEFAULT 'Draft', created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(), updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW());<br />
                <br />
                -- Enable RLS<br />
                ALTER TABLE content ENABLE ROW LEVEL SECURITY;<br />
                ALTER TABLE activities ENABLE ROW LEVEL SECURITY;<br />
                ALTER TABLE books ENABLE ROW LEVEL SECURITY;<br />
                <br />
                -- Create policies<br />
                CREATE POLICY "Allow all operations on content" ON content FOR ALL USING (true);<br />
                CREATE POLICY "Allow all operations on activities" ON activities FOR ALL USING (true);<br />
                CREATE POLICY "Allow all operations on books" ON books FOR ALL USING (true);
              </Paragraph>
              <Paragraph className="text-xs text-amber-700 mt-2">
                <strong>⚠️ Permission Error:</strong> If you get "permission denied" errors, skip the problematic lines or contact Supabase support. The app will work with just the table creation and RLS setup.
              </Paragraph>
            </details>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default DatabaseSetup;