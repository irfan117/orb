import React from 'react';
import { Typography, Row, Col, Divider } from 'antd';
import { InstagramOutlined, GithubOutlined, YoutubeOutlined, LinkedinOutlined } from '@ant-design/icons';

const { Title, Paragraph, Link } = Typography;

const FooterSection: React.FC = () => {
  const footerLinks = [
    { title: 'Tentang Kami', href: '#' },
    { title: 'Karya', href: '#' },
    { title: 'Community', href: '#' },
    { title: 'Blog', href: '#' },
    { title: 'Contact', href: '#' }
  ];

  const additionalLinks = [
    { title: 'Code of Conduct', href: '#' },
    { title: 'Privacy Policy', href: '#' },
    { title: 'Terms of Service', href: '#' },
    { title: 'Alumni Network', href: '#' },
    { title: 'Partner Program', href: '#' }
  ];

  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Row gutter={[24, 24]}>
          <Col xs={24} md={8}>
            <div className="mb-4">
              <Title level={3} className="text-white mb-2">ORB</Title>
              <Paragraph className="text-slate-300">
                ORB - Where Knowledge Meets Innovation
              </Paragraph>
              <Paragraph className="text-slate-300">
                Open Research Base - Advancing knowledge through collaborative research and open access to information.
              </Paragraph>
            </div>
          </Col>
          <Col xs={24} md={8}>
            <Title level={4} className="text-white mb-4">Quick Links</Title>
            <ul className="space-y-2">
              {footerLinks.map((link, index) => (
                <li key={index}>
                  <Link href={link.href} className="text-slate-300 hover:text-white">
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </Col>
          <Col xs={24} md={8}>
            <Title level={4} className="text-white mb-4">Additional Links</Title>
            <ul className="space-y-2">
              {additionalLinks.map((link, index) => (
                <li key={index}>
                  <Link href={link.href} className="text-slate-300 hover:text-white">
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </Col>
        </Row>

        <Divider className="bg-slate-700" />

        <Row gutter={[24, 24]} align="middle">
          <Col xs={24} md={12}>
            <div className="flex space-x-4">
              <Link href="#" className="text-slate-300 hover:text-white">
                <InstagramOutlined className="text-xl" />
              </Link>
              <Link href="#" className="text-slate-300 hover:text-white">
                <GithubOutlined className="text-xl" />
              </Link>
              <Link href="#" className="text-slate-300 hover:text-white">
                <YoutubeOutlined className="text-xl" />
              </Link>
              <Link href="#" className="text-slate-300 hover:text-white">
                <LinkedinOutlined className="text-xl" />
              </Link>
            </div>
          </Col>
          <Col xs={24} md={12} className="text-right">
            <Paragraph className="text-slate-400 mb-0">
              © 2024 ORB - Open Research Base. Built with ❤️ by and for the Indonesian tech learning community.
            </Paragraph>
          </Col>
        </Row>
      </div>
    </footer>
  );
};

export default FooterSection;