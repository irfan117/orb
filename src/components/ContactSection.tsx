import React from 'react';
import { Typography, Row, Col, Card, Button } from 'antd';
import {
  MailOutlined,
  MessageOutlined,
  InstagramOutlined,
  GithubOutlined,
  GlobalOutlined,
  FormOutlined,
  TeamOutlined,
  CalendarOutlined,
  RocketOutlined
} from '@ant-design/icons';
import { useContent } from '../contexts/ContentContext';

const { Title, Paragraph } = Typography;

const ContactSection: React.FC = () => {
  const { content } = useContent();

  return (
    <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <Title
            level={2}
            className="text-3xl md:text-4xl font-bold text-slate-900 mb-4"
          >
            Mari Bergabung!
          </Title>
          <Paragraph className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto mb-8">
            Siap memulai journey teknologi bersama{" "}
            <span className="font-semibold text-purple-600">ORB</span>?  
            Daftar sekarang dan jadilah bagian dari revolusi pembelajaran terbuka!
          </Paragraph>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              type="primary"
              size="large"
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 rounded-xl px-6"
              href={content.registerButtonLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              {content.registerButtonText}
            </Button>
            <Button
              size="large"
              className="border-purple-600 text-purple-600 hover:border-purple-700 hover:text-purple-700 rounded-xl px-6"
              href={content.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              Join WhatsApp Channel
            </Button>
            <Button
              size="large"
              className="border-purple-600 text-purple-600 hover:border-purple-700 hover:text-purple-700 rounded-xl px-6"
              href={content.instagramLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              Follow Instagram
            </Button>
          </div>
        </div>

        {/* Content */}
        <Row gutter={[24, 24]}>
          {/* Contact Info */}
          <Col xs={24} md={12}>
            <Card
              title="📬 Contact Info"
              bordered={false}
              className="h-full shadow-md hover:shadow-xl transition duration-300 rounded-2xl"
            >
              <div className="space-y-4 text-slate-700">
                <div className="flex items-center space-x-3">
                  <MailOutlined className="text-purple-600 text-lg" />
                  <a href={`mailto:${content.contactEmail}`} className="hover:text-purple-700">
                    {content.contactEmail}
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <MessageOutlined className="text-purple-600 text-lg" />
                  <span>{content.contactMessage}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <InstagramOutlined className="text-purple-600 text-lg" />
                  <a href={content.instagramLink} target="_blank" rel="noreferrer" className="hover:text-purple-700">
                    {content.contactInstagram}
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <GithubOutlined className="text-purple-600 text-lg" />
                  <a href={`https://github.com/${content.contactGithub}`} target="_blank" rel="noreferrer" className="hover:text-purple-700">
                    {content.contactGithub}
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <GlobalOutlined className="text-purple-600 text-lg" />
                  <a href={`https://${content.contactWebsite}`} target="_blank" rel="noreferrer" className="hover:text-purple-700">
                    {content.contactWebsite}
                  </a>
                </div>
              </div>
            </Card>
          </Col>

          {/* Registration Process */}
          <Col xs={24} md={12}>
            <Card
              title="📝 Registration Process"
              bordered={false}
              className="h-full shadow-md hover:shadow-xl transition duration-300 rounded-2xl"
            >
              <ol className="list-decimal list-inside space-y-4 text-slate-700">
                <li className="flex items-center gap-2">
                  <FormOutlined className="text-green-600" /> Isi form pendaftaran online
                </li>
                <li className="flex items-center gap-2">
                  <TeamOutlined className="text-blue-600" /> Join Saluran WA untuk interview singkat
                </li>
                <li className="flex items-center gap-2">
                  <CalendarOutlined className="text-orange-600" /> Ikuti orientation session
                </li>
                <li className="flex items-center gap-2">
                  <RocketOutlined className="text-red-600" /> Mulai journey belajar & berkontribusi!
                </li>
              </ol>
            </Card>
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default ContactSection;
