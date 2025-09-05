import React, { useState, useEffect } from 'react';
import { Card, Button, Table, Modal, Form, Input, Select, DatePicker, InputNumber, message, Popconfirm, Space } from 'antd';
import { Plus, Edit, Delete, Calendar, MapPin, Users } from 'lucide-react';
import { useConnection } from '../contexts/ConnectionContext';
import { useNotifications } from '../contexts/NotificationContext';
import dayjs from 'dayjs';

const { Option } = Select;

interface ActivityType {
  id: number;
  title: string;
  description: string;
  date: string;
  location: string;
  participants: number;
  status: string;
  category: string;
  image_url?: string;
  created_at: string;
}

const ActivitiesManager: React.FC = () => {
  const { connectionState, supabaseClient } = useConnection();
  const { addNotification } = useNotifications();
  const [activities, setActivities] = useState<ActivityType[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingActivity, setEditingActivity] = useState<ActivityType | null>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    loadActivities();
  }, [connectionState.isConnected]);

  const loadActivities = async () => {
    setLoading(true);

    if (!connectionState.isConnected || !supabaseClient) {
      // Fallback to demo data when not connected
      setTimeout(() => {
        const demoActivities: ActivityType[] = [
          {
            id: 1,
            title: "Workshop React.js untuk Pemula",
            description: "Pelatihan intensif React.js selama 2 hari dengan fokus pada hooks, state management, dan best practices development.",
            date: "2024-01-20T10:00:00Z",
            location: "Online (Zoom)",
            participants: 45,
            status: "Completed",
            category: "Workshop",
            image_url: "https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=400",
            created_at: "2024-01-15T00:00:00Z"
          },
          {
            id: 2,
            title: "Hackathon ORB 2024",
            description: "Kompetisi pengembangan aplikasi selama 24 jam dengan tema 'Education Technology'. Hadiah total Rp 5 juta.",
            date: "2024-02-10T09:00:00Z",
            location: "Universitas Indonesia, Depok",
            participants: 120,
            status: "Completed",
            category: "Competition",
            image_url: "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=400",
            created_at: "2024-01-10T00:00:00Z"
          }
        ];
        setActivities(demoActivities);
        setLoading(false);
      }, 500);
      return;
    }

    try {
      const { data, error } = await supabaseClient
        .from('activities')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setActivities(data || []);
    } catch (error) {
      console.error('Error loading activities:', error);
      addNotification({
        type: 'error',
        title: 'Loading Error',
        message: 'Failed to load activities from database'
      });
      // Fallback to demo data on error
      const demoActivities: ActivityType[] = [
        {
          id: 1,
          title: "Workshop React.js untuk Pemula",
          description: "Pelatihan intensif React.js selama 2 hari dengan fokus pada hooks, state management, dan best practices development.",
          date: "2024-01-20T10:00:00Z",
          location: "Online (Zoom)",
          participants: 45,
          status: "Completed",
          category: "Workshop",
          created_at: "2024-01-15T00:00:00Z"
        }
      ];
      setActivities(demoActivities);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingActivity(null);
    form.resetFields();
    setModalVisible(true);
  };

  const handleEdit = (activity: ActivityType) => {
    setEditingActivity(activity);
    form.setFieldsValue({
      ...activity,
      date: dayjs(activity.date)
    });
    setModalVisible(true);
  };

  const handleDelete = async (id: number) => {
    if (!supabaseClient) {
      message.error('Database not connected');
      return;
    }

    try {
      const { error } = await supabaseClient
        .from('activities')
        .delete()
        .eq('id', id);

      if (error) throw error;

      message.success('Activity deleted successfully');
      loadActivities();
    } catch (error) {
      console.error('Error deleting activity:', error);
      message.error('Failed to delete activity');
    }
  };

  const handleSave = async (values: any) => {
    if (!supabaseClient) {
      message.error('Database not connected');
      return;
    }

    try {
      const activityData = {
        ...values,
        date: values.date.toISOString(),
        created_at: editingActivity ? editingActivity.created_at : new Date().toISOString()
      };

      if (editingActivity) {
        const { error } = await supabaseClient
          .from('activities')
          .update(activityData)
          .eq('id', editingActivity.id);

        if (error) throw error;
        message.success('Activity updated successfully');
      } else {
        const { error } = await supabaseClient
          .from('activities')
          .insert([activityData]);

        if (error) throw error;
        message.success('Activity added successfully');
      }

      setModalVisible(false);
      loadActivities();
    } catch (error) {
      console.error('Error saving activity:', error);
      message.error('Failed to save activity');
    }
  };

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      ellipsis: true,
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      width: 120,
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      width: 150,
      render: (date: string) => dayjs(date).format('DD/MM/YYYY HH:mm'),
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
      ellipsis: true,
    },
    {
      title: 'Participants',
      dataIndex: 'participants',
      key: 'participants',
      width: 100,
      align: 'center' as const,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status: string) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          status === 'Completed' ? 'bg-green-100 text-green-800' :
          status === 'Ongoing' ? 'bg-blue-100 text-blue-800' :
          'bg-orange-100 text-orange-800'
        }`}>
          {status}
        </span>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 120,
      render: (_: any, record: ActivityType) => (
        <Space>
          <Button
            type="text"
            icon={<Edit className="w-4 h-4" />}
            onClick={() => handleEdit(record)}
            className="text-blue-600 hover:text-blue-800"
          />
          <Popconfirm
            title="Delete Activity"
            description="Are you sure you want to delete this activity?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button
              type="text"
              icon={<Delete className="w-4 h-4" />}
              className="text-red-600 hover:text-red-800"
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <Card
        title="Activities Management"
        extra={
          <Button
            type="primary"
            icon={<Plus className="w-4 h-4" />}
            onClick={handleAdd}
            disabled={!connectionState.isConnected}
          >
            Add Activity
          </Button>
        }
      >
        {!connectionState.isConnected && (
          <div className="mb-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <p className="text-amber-800">
              📋 Demo Mode - Connect your database to manage activities
            </p>
          </div>
        )}

        <Table
          columns={columns}
          dataSource={activities}
          loading={loading}
          rowKey="id"
          pagination={{ pageSize: 10 }}
          scroll={{ x: 800 }}
        />
      </Card>

      <Modal
        title={editingActivity ? 'Edit Activity' : 'Add Activity'}
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSave}
          className="mt-4"
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: 'Please enter activity title' }]}
          >
            <Input placeholder="Activity title" />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: 'Please enter activity description' }]}
          >
            <Input.TextArea
              placeholder="Activity description"
              rows={3}
            />
          </Form.Item>

          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              label="Category"
              name="category"
              rules={[{ required: true, message: 'Please select category' }]}
            >
              <Select placeholder="Select category">
                <Option value="Workshop">Workshop</Option>
                <Option value="Seminar">Seminar</Option>
                <Option value="Bootcamp">Bootcamp</Option>
                <Option value="Competition">Competition</Option>
                <Option value="Study Group">Study Group</Option>
                <Option value="Webinar">Webinar</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Status"
              name="status"
              rules={[{ required: true, message: 'Please select status' }]}
            >
              <Select placeholder="Select status">
                <Option value="Upcoming">Upcoming</Option>
                <Option value="Ongoing">Ongoing</Option>
                <Option value="Completed">Completed</Option>
              </Select>
            </Form.Item>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              label="Date & Time"
              name="date"
              rules={[{ required: true, message: 'Please select date and time' }]}
            >
              <DatePicker
                showTime
                format="DD/MM/YYYY HH:mm"
                placeholder="Select date and time"
                className="w-full"
              />
            </Form.Item>

            <Form.Item
              label="Participants"
              name="participants"
              rules={[{ required: true, message: 'Please enter number of participants' }]}
            >
              <InputNumber
                min={1}
                placeholder="Number of participants"
                className="w-full"
              />
            </Form.Item>
          </div>

          <Form.Item
            label="Location"
            name="location"
            rules={[{ required: true, message: 'Please enter location' }]}
          >
            <Input placeholder="Activity location" />
          </Form.Item>

          <Form.Item
            label="Image URL"
            name="image_url"
            rules={[{ type: 'url', message: 'Please enter a valid URL' }]}
          >
            <Input placeholder="https://example.com/image.jpg" />
          </Form.Item>

          <div className="flex justify-end space-x-2 pt-4">
            <Button onClick={() => setModalVisible(false)}>
              Cancel
            </Button>
            <Button type="primary" htmlType="submit">
              {editingActivity ? 'Update' : 'Add'} Activity
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default ActivitiesManager;