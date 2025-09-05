import React, { useState, useEffect } from 'react';
import { Typography, Card, Row, Col, Tag, Spin, Empty } from 'antd';
import { Calendar, MapPin, Users, Clock } from 'lucide-react';
import { useConnection } from '../contexts/ConnectionContext';
import { useNotifications } from '../contexts/NotificationContext';

const { Title, Paragraph } = Typography;

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

const ActivitiesSection: React.FC = () => {
  const { connectionState, supabaseClient } = useConnection();
  const { addNotification } = useNotifications();
  const [activities, setActivities] = useState<ActivityType[]>([]);
  const [loading, setLoading] = useState(true);

  // Demo data
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
    },
    {
      id: 3,
      title: "Study Group Python Programming",
      description: "Sesi belajar bersama Python programming setiap Sabtu selama 1 bulan. Cocok untuk pemula hingga intermediate.",
      date: "2024-02-15T14:00:00Z",
      location: "Kampus IPB, Bogor",
      participants: 30,
      status: "Completed",
      category: "Study Group",
      image_url: "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=400",
      created_at: "2024-01-08T00:00:00Z"
    },
    {
      id: 4,
      title: "Seminar AI & Machine Learning",
      description: "Seminar nasional tentang implementasi AI dalam industri dengan pembicara dari Google dan Microsoft.",
      date: "2024-03-05T13:00:00Z",
      location: "Auditorium UGM, Yogyakarta",
      participants: 200,
      status: "Upcoming",
      category: "Seminar",
      image_url: "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=400",
      created_at: "2024-01-05T00:00:00Z"
    },
    {
      id: 5,
      title: "Bootcamp Web Development",
      description: "Program intensif 3 bulan pembelajaran full-stack web development dari nol hingga deploy production.",
      date: "2024-03-15T08:00:00Z",
      location: "Jakarta & Online",
      participants: 75,
      status: "Ongoing",
      category: "Bootcamp",
      image_url: "https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=400",
      created_at: "2024-01-01T00:00:00Z"
    }
  ];

  useEffect(() => {
    loadActivities();
  }, [connectionState.isConnected]);

  const loadActivities = async () => {
    setLoading(true);

    if (!connectionState.isConnected || !supabaseClient) {
      setTimeout(() => {
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
        message: 'Failed to load activities. Using demo data.'
      });
      setActivities(demoActivities);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed': return 'green';
      case 'ongoing': return 'blue';
      case 'upcoming': return 'orange';
      default: return 'default';
    }
  };

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <Title level={2} className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Kegiatan Kami
          </Title>
          <Paragraph className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto mb-8">
            Aktivitas dan program yang telah kami laksanakan untuk mendukung{" "}
            <span className="font-semibold text-purple-600">pembelajaran terbuka</span>{" "}
            dan pengembangan komunitas teknologi Indonesia.
          </Paragraph>
          {connectionState.isDemo && (
            <Paragraph className="text-amber-600 font-medium">
              📋 Demo Mode - Connect your database to access live content
            </Paragraph>
          )}
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center py-20">
            <Spin tip="Loading activities..." size="large" />
          </div>
        )}

        {/* Activities Grid */}
        {!loading && activities.length > 0 && (
          <Row gutter={[24, 24]}>
            {activities.map((activity) => (
              <Col xs={24} md={12} lg={8} key={activity.id}>
                <Card
                  hoverable
                  className="h-full shadow-md hover:shadow-xl transition duration-300 rounded-2xl"
                  cover={
                    <div className="relative">
                      {activity.image_url ? (
                        <img
                          alt={activity.title}
                          src={activity.image_url}
                          className="h-48 w-full object-cover rounded-t-2xl"
                        />
                      ) : (
                        <div className="h-48 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-t-2xl flex items-center justify-center">
                          <Calendar className="w-16 h-16 text-white/70" />
                        </div>
                      )}
                      <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                        <Tag color={getStatusColor(activity.status)} className="text-white border-white">
                          {activity.status}
                        </Tag>
                        <Tag color="purple" className="text-white border-white">
                          {activity.category}
                        </Tag>
                      </div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <Title level={4} className="!text-white !mb-0 !mt-0 drop-shadow-lg">
                          {activity.title}
                        </Title>
                      </div>
                    </div>
                  }
                >
                  <div className="space-y-3">
                    <Paragraph className="text-sm text-slate-700 line-clamp-3">
                      {activity.description}
                    </Paragraph>

                    <div className="space-y-2 text-sm text-slate-600">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-purple-600" />
                        <span>{new Date(activity.date).toLocaleDateString('id-ID', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-purple-600" />
                        <span>{activity.location}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-purple-600" />
                        <span>{activity.participants} peserta</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        )}

        {/* Empty */}
        {!loading && activities.length === 0 && (
          <div className="text-center py-20">
            <Empty description="No activities found" image={Empty.PRESENTED_IMAGE_SIMPLE} />
          </div>
        )}
      </div>
    </section>
  );
};

export default ActivitiesSection;