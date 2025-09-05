import React from 'react';
import { Typography, Row, Col, Card, Button } from 'antd';
import { 
  TeamOutlined, 
  CheckCircleOutlined, 
  UserOutlined, 
  RocketOutlined,
  BookOutlined 
} from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const CommunitySection: React.FC = () => {
  const testimonials = [
    {
      name: "Andi Pratama",
      role: "Anggota ORB 2023",
      content:
        "ORB mengubah cara saya memandang teknologi. Dari yang awalnya hanya user, sekarang saya bisa berkontribusi dan berbagi ilmu dengan komunitas."
    },
    {
      name: "Sarah Dewi",
      role: "Lead Developer Tim Mobile ORB",
      content:
        "Mentorship di ORB sangat valuable. Senior-senior di sini tidak pelit ilmu dan selalu siap membantu junior berkembang."
    },
    {
      name: "Budi Rahman",
      role: "Alumni ORB yang sekarang bekerja di startup unicorn",
      content:
        "Project collaboration di ORB memberikan experience real-world yang tidak bisa didapat di sekolah formal. Sangat recommended!"
    }
  ];

  return (
    <section className="bg-slate-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <Title
            level={2}
            className="text-3xl md:text-4xl font-bold text-slate-900 mb-4"
          >
            Komunitas ORB
          </Title>
          <Paragraph className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto">
            Bergabung dengan{" "}
            <span className="font-semibold text-indigo-600">100+ pelajar</span>{" "}
            passionate tentang teknologi di seluruh Indonesia
          </Paragraph>
        </div>

        {/* Content */}
        <Row gutter={[24, 24]} className="mb-16">
          {/* Join Community */}
          <Col xs={24} md={12}>
            <Card
              className="h-full shadow-md hover:shadow-xl transition duration-300 rounded-2xl"
              bordered={false}
            >
              <Title level={3} className="mb-4 text-indigo-700">
                🚀 Join Komunitas ORB
              </Title>
              <Paragraph className="mb-4 text-slate-700">
                Siap bergabung dengan komunitas pembelajar teknologi paling
                aktif di Indonesia? ORB terbuka untuk semua siswa SMA yang
                memiliki passion di bidang teknologi, regardless of current
                skill level.
              </Paragraph>

              <Title level={4} className="mb-2 text-slate-900">
                Yang Kamu Dapatkan:
              </Title>
              <ul className="space-y-2 mb-4 text-slate-700">
                <li className="flex items-center gap-2">
                  <BookOutlined className="text-green-600" /> Akses ke semua
                  learning materials & resources
                </li>
                <li className="flex items-center gap-2">
                  <TeamOutlined className="text-blue-600" /> Mentorship dari
                  senior & alumni industri tech
                </li>
                <li className="flex items-center gap-2">
                  <UserOutlined className="text-purple-600" /> Networking dengan
                  sesama tech enthusiast
                </li>
                <li className="flex items-center gap-2">
                  <RocketOutlined className="text-red-600" /> Kolaborasi dalam
                  project real-world
                </li>
              </ul>

              <Title level={4} className="mb-2 text-slate-900">
                Syarat Bergabung:
              </Title>
              <ul className="list-disc list-inside space-y-1 text-slate-700">
                <li>Siswa SMA aktif di Indonesia</li>
                <li>Memiliki minat di bidang teknologi</li>
                <li>Berkomitmen untuk belajar & berkontribusi</li>
                <li>Menghargai nilai open source & kolaborasi</li>
              </ul>

              <div className="mt-6 text-center">
                <Button
                  type="primary"
                  size="large"
                  className="bg-indigo-600 hover:bg-indigo-700 rounded-xl"
                >
                  Gabung Sekarang
                </Button>
              </div>
            </Card>
          </Col>

          {/* Testimonials */}
          <Col xs={24} md={12}>
            <Card
              className="h-full shadow-md hover:shadow-xl transition duration-300 rounded-2xl"
              bordered={false}
            >
              <Title level={3} className="mb-6 text-indigo-700">
                💬 Testimonials
              </Title>
              {testimonials.map((testimonial, index) => (
                <Card
                  key={index}
                  size="small"
                  bordered={false}
                  className="mb-4 bg-slate-100 rounded-xl shadow-sm hover:shadow-md transition duration-200"
                >
                  <Paragraph className="italic text-slate-700">
                    "{testimonial.content}"
                  </Paragraph>
                  <Paragraph className="font-semibold mt-2 text-slate-900">
                    - {testimonial.name},{" "}
                    <span className="text-slate-600">{testimonial.role}</span>
                  </Paragraph>
                </Card>
              ))}
            </Card>
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default CommunitySection;
