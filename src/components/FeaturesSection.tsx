import React from 'react';
import { Typography, Row, Col, Card } from 'antd';
import {
  CodeOutlined,
  ShareAltOutlined,
  ExperimentOutlined,
  TeamOutlined,
  BulbOutlined,
  TrophyOutlined
} from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: <CodeOutlined className="text-2xl" />,
      title: 'Coding & Digital Skills',
      description:
        'Belajar pemrograman, website, aplikasi mobile, sampai AI/ML. Semua anggota bisa mulai dari nol hingga tingkat lanjut dengan bimbingan komunitas.',
      color: 'text-purple-600 bg-purple-100'
    },
    {
      icon: <ShareAltOutlined className="text-2xl" />,
      title: 'Social Media & Kreativitas',
      description:
        'Mempelajari cara memanfaatkan sosial media, digital marketing, hingga desain kreatif untuk membangun personal branding dan karya komunitas.',
      color: 'text-blue-600 bg-blue-100'
    },
    {
      icon: <ExperimentOutlined className="text-2xl" />,
      title: 'Eksperimen & Pengetahuan Baru',
      description:
        'Tidak hanya teknologi, tapi juga ruang untuk berbagi ilmu lain sesuai minat anggota — mulai dari sains, bisnis, hingga seni digital.',
      color: 'text-green-600 bg-green-100'
    },
    {
      icon: <TeamOutlined className="text-2xl" />,
      title: 'Kolaborasi & Sharing',
      description:
        'Study group, workshop, hingga mentoring peer-to-peer. Semua anggota diajak saling berbagi, belajar bersama, dan tumbuh bareng.',
      color: 'text-cyan-600 bg-cyan-100'
    },
    {
      icon: <BulbOutlined className="text-2xl" />,
      title: 'Learning Paths',
      description:
        'Kurikulum fleksibel yang bisa disesuaikan dengan passion kamu. Mulai dari dunia digital, sosial media, sampai topik non-IT lain.',
      color: 'text-amber-600 bg-amber-100'
    },
    {
      icon: <TrophyOutlined className="text-2xl" />,
      title: 'Proyek & Kompetisi',
      description:
        'Kesempatan untuk mengerjakan proyek nyata, ikut lomba, hackathon, atau sekadar bikin karya kreatif yang bermanfaat untuk orang lain.',
      color: 'text-indigo-600 bg-indigo-100'
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
            Apa yang Bisa Kamu Ikuti
          </Title>
          <Paragraph className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto">
            Club IT bukan hanya soal coding, tapi ruang untuk{" "}
            <span className="font-semibold text-purple-600">
              belajar apapun yang kamu minati
            </span>{" "}
            dengan fokus utama di dunia digital.
          </Paragraph>
        </div>

        {/* Features Grid */}
        <Row gutter={[24, 24]}>
          {features.map((feature, index) => (
            <Col xs={24} md={12} lg={8} key={index}>
              <Card
                bordered={false}
                className="h-full shadow-md hover:shadow-xl transition duration-300 rounded-2xl"
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${feature.color}`}
                >
                  {feature.icon}
                </div>
                <Title level={3} className="mb-2 text-slate-900">
                  {feature.title}
                </Title>
                <Paragraph className="text-slate-600">
                  {feature.description}
                </Paragraph>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </section>
  );
};

export default FeaturesSection;
