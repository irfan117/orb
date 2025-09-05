import React, { useState } from 'react';
import { Card, Form, Input, Button, Divider, message } from 'antd';
import { Save, RotateCcw } from 'lucide-react';
import { useContent } from '../contexts/ContentContext';

const ContentManager: React.FC = () => {
  const { content, updateContent, resetToDefaults } = useContent();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSave = async (values: any) => {
    setLoading(true);
    try {
      await updateContent(values);
      // Success message is handled in ContentContext
    } catch (error) {
      message.error('Failed to update content');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    resetToDefaults();
    form.resetFields();
    message.info('Content reset to defaults');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Content Manager</h2>
        <p className="text-slate-600">Edit website content and links</p>
      </div>

      <Form
        form={form}
        layout="vertical"
        initialValues={content}
        onFinish={handleSave}
        className="space-y-6"
      >
        <Card title="Registration Button" bordered={false} className="shadow-sm">
          <Form.Item
            label="Button Text"
            name="registerButtonText"
            rules={[{ required: true, message: 'Please enter button text' }]}
          >
            <Input placeholder="e.g., Daftar Sekarang" />
          </Form.Item>
          <Form.Item
            label="Button Link"
            name="registerButtonLink"
            rules={[{ required: true, message: 'Please enter button link' }]}
          >
            <Input placeholder="e.g., https://example.com/register" />
          </Form.Item>
        </Card>

        <Card title="Social Links" bordered={false} className="shadow-sm">
          <Form.Item
            label="WhatsApp Channel Link"
            name="whatsappLink"
            rules={[{ required: true, message: 'Please enter WhatsApp link' }]}
          >
            <Input placeholder="e.g., https://wa.me/1234567890" />
          </Form.Item>
          <Form.Item
            label="Instagram Link"
            name="instagramLink"
            rules={[{ required: true, message: 'Please enter Instagram link' }]}
          >
            <Input placeholder="e.g., https://instagram.com/username" />
          </Form.Item>
        </Card>

        <Card title="Contact Information" bordered={false} className="shadow-sm">
          <Form.Item
            label="Email"
            name="contactEmail"
            rules={[{ required: true, type: 'email', message: 'Please enter a valid email' }]}
          >
            <Input placeholder="e.g., hello@example.com" />
          </Form.Item>
          <Form.Item
            label="Message"
            name="contactMessage"
            rules={[{ required: true, message: 'Please enter contact message' }]}
          >
            <Input placeholder="e.g., ORB Community Server" />
          </Form.Item>
          <Form.Item
            label="Instagram Handle"
            name="contactInstagram"
            rules={[{ required: true, message: 'Please enter Instagram handle' }]}
          >
            <Input placeholder="e.g., @orb.community" />
          </Form.Item>
          <Form.Item
            label="GitHub Username/Repo"
            name="contactGithub"
            rules={[{ required: true, message: 'Please enter GitHub info' }]}
          >
            <Input placeholder="e.g., github.com/orb-community" />
          </Form.Item>
          <Form.Item
            label="Website"
            name="contactWebsite"
            rules={[{ required: true, message: 'Please enter website' }]}
          >
            <Input placeholder="e.g., www.orb-community.id" />
          </Form.Item>
        </Card>

        <div className="flex gap-4">
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            icon={<Save className="w-4 h-4" />}
            className="bg-purple-600 hover:bg-purple-700"
          >
            Save Changes
          </Button>
          <Button
            onClick={handleReset}
            icon={<RotateCcw className="w-4 h-4" />}
          >
            Reset to Defaults
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default ContentManager;