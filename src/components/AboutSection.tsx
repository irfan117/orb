import React from 'react';
import { Typography, Row, Col, Card, Space, Divider, Statistic } from 'antd';
import { 
 AimOutlined, 
 RocketOutlined, 
 TeamOutlined, 
 BulbOutlined,
 CodeOutlined,
 BookOutlined,
 GlobalOutlined,
 TrophyOutlined
} from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;

const AboutSection: React.FC = () => {
 return (
   <section id="about" className="bg-gradient-to-b from-gray-50 to-white py-20">
     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
       {/* Header Section */}
       <div className="text-center mb-16">
         <div className="inline-block px-4 py-2 bg-purple-100 text-purple-600 rounded-full text-sm font-semibold mb-6">
           Tentang Kami
         </div>
         <Title level={2} className="!text-4xl md:!text-5xl !font-bold !text-slate-900 !mb-6">
           Tentang{' '}
           <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
             ORB
           </span>
         </Title>
         <Paragraph className="!text-xl !text-slate-600 max-w-3xl mx-auto !leading-relaxed">
           Membangun Masa Depan Teknologi Melalui Pembelajaran Terbuka
         </Paragraph>
       </div>

       {/* Main Description */}
       <div className="max-w-5xl mx-auto mb-16">
         <Card 
           className="shadow-xl border-0 bg-gradient-to-r from-purple-50 via-blue-50 to-cyan-50"
           style={{ borderRadius: '20px' }}
         >
           <Space direction="vertical" size="large" className="w-full">
             <Paragraph className="!text-lg !text-slate-700 !mb-0 text-center !leading-relaxed">
               <Text strong className="text-purple-600">Open Research Base (ORB)</Text> adalah komunitas siswa SMA yang berdedikasi untuk mengembangkan ilmu pengetahuan teknologi secara terbuka dan kolaboratif. Kami percaya bahwa{' '}
               <Text className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent font-semibold">
                 pengetahuan adalah hak bersama
               </Text>{' '}
               yang harus dapat diakses oleh semua orang.
             </Paragraph>
             
             <Divider className="!my-6">
               <CodeOutlined className="text-purple-500 text-xl" />
             </Divider>
             
             <Paragraph className="!text-lg !text-slate-700 !mb-0 text-center !leading-relaxed">
               Didirikan dengan semangat{' '}
               <Text className="bg-yellow-100 px-2 py-1 rounded font-semibold text-yellow-800">
                 open source
               </Text>, ORB menjadi tempat berkumpulnya para pelajar yang ingin mengasah kemampuan programming, riset teknologi, dan berbagi pengetahuan melalui berbagai medium termasuk dokumentasi dan penulisan buku.
             </Paragraph>
           </Space>
         </Card>
       </div>

       {/* Statistics Row */}
       <Row gutter={[24, 24]} className="mb-16">
         <Col xs={12} sm={6}>
           <Card className="text-center h-full shadow-lg hover:shadow-xl transition-shadow duration-300 border-0">
             <Statistic 
               title="Anggota Aktif" 
               value={120} 
               suffix="+"
               valueStyle={{ color: '#7c3aed', fontSize: '2rem', fontWeight: 'bold' }}
             />
             <TeamOutlined className="text-2xl text-purple-400 mt-2" />
           </Card>
         </Col>
         <Col xs={12} sm={6}>
           <Card className="text-center h-full shadow-lg hover:shadow-xl transition-shadow duration-300 border-0">
             <Statistic 
               title="Projek Selesai" 
               value={45} 
               suffix="+"
               valueStyle={{ color: '#2563eb', fontSize: '2rem', fontWeight: 'bold' }}
             />
             <BulbOutlined className="text-2xl text-blue-400 mt-2" />
           </Card>
         </Col>
         <Col xs={12} sm={6}>
           <Card className="text-center h-full shadow-lg hover:shadow-xl transition-shadow duration-300 border-0">
             <Statistic 
               title="Publikasi" 
               value={25} 
               suffix="+"
               valueStyle={{ color: '#059669', fontSize: '2rem', fontWeight: 'bold' }}
             />
             <BookOutlined className="text-2xl text-green-400 mt-2" />
           </Card>
         </Col>
         <Col xs={12} sm={6}>
           <Card className="text-center h-full shadow-lg hover:shadow-xl transition-shadow duration-300 border-0">
             <Statistic 
               title="Workshop/Tahun" 
               value={15} 
               suffix="+"
               valueStyle={{ color: '#dc2626', fontSize: '2rem', fontWeight: 'bold' }}
             />
             <TrophyOutlined className="text-2xl text-red-400 mt-2" />
           </Card>
         </Col>
       </Row>

       {/* Vision & Mission Cards */}
       <Row gutter={[32, 32]} className="mb-16">
         <Col xs={24} lg={12}>
           <Card 
             className="h-full shadow-xl hover:shadow-2xl transition-all duration-300 border-0 group hover:-translate-y-2"
             style={{ borderRadius: '20px' }}
           >
             <div className="text-center">
               <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                 <AimOutlined className="text-3xl text-white" />
               </div>
               <Title level={3} className="!mb-6 !text-2xl">
                 🎯 Visi
               </Title>
               <Paragraph className="!text-lg !leading-relaxed !text-slate-600">
                 Menjadi{' '}
                 <Text className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent font-bold">
                   pusat pembelajaran teknologi terdepan
                 </Text>{' '}
                 yang menghasilkan inovator-inovator muda Indonesia melalui pendekatan pembelajaran terbuka dan kolaboratif.
               </Paragraph>
             </div>
           </Card>
         </Col>
         
         <Col xs={24} lg={12}>
           <Card 
             className="h-full shadow-xl hover:shadow-2xl transition-all duration-300 border-0 group hover:-translate-y-2"
             style={{ borderRadius: '20px' }}
           >
             <div className="text-center">
               <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                 <RocketOutlined className="text-3xl text-white" />
               </div>
               <Title level={3} className="!mb-6 !text-2xl">
                 🚀 Misi
               </Title>
               <Space direction="vertical" size="middle" className="w-full text-left">
                 {[
                   { icon: <GlobalOutlined />, text: "Menyediakan platform pembelajaran teknologi yang accessible untuk semua" },
                   { icon: <TeamOutlined />, text: "Mendorong budaya knowledge sharing dan open source di kalangan pelajar" },
                   { icon: <BulbOutlined />, text: "Menghasilkan karya-karya berkualitas dalam bentuk code, penelitian, dan publikasi" },
                   { icon: <CodeOutlined />, text: "Membangun network komunitas teknologi yang solid dan saling mendukung" }
                 ].map((item, index) => (
                   <div key={index} className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                     <div className="text-blue-500 text-lg mt-0.5">
                       {item.icon}
                     </div>
                     <Text className="flex-1 text-slate-700">{item.text}</Text>
                   </div>
                 ))}
               </Space>
             </div>
           </Card>
         </Col>
       </Row>

       {/* Core Values Section */}
       <div className="text-center">
         <Title level={3} className="!text-2xl !font-bold !text-slate-800 !mb-8">
           Nilai-Nilai Inti ORB
         </Title>
         <Row gutter={[24, 24]}>
           {[
             { 
               icon: <GlobalOutlined className="text-3xl text-green-500" />, 
               title: "Open Source", 
               desc: "Berbagi kode dan pengetahuan untuk kemajuan bersama" 
             },
             { 
               icon: <TeamOutlined className="text-3xl text-blue-500" />, 
               title: "Collaboration", 
               desc: "Kerja sama dalam menciptakan solusi inovatif" 
             },
             { 
               icon: <BulbOutlined className="text-3xl text-yellow-500" />, 
               title: "Innovation", 
               desc: "Mendorong kreativitas dan pemikiran out-of-the-box" 
             },
             { 
               icon: <BookOutlined className="text-3xl text-purple-500" />, 
               title: "Knowledge Sharing", 
               desc: "Dokumentasi dan berbagi ilmu untuk generasi mendatang" 
             }
           ].map((value, index) => (
             <Col xs={12} md={6} key={index}>
               <Card 
                 className="h-full text-center shadow-md hover:shadow-lg transition-all duration-300 border-0 hover:-translate-y-1"
                 style={{ borderRadius: '16px' }}
               >
                 <div className="mb-4">{value.icon}</div>
                 <Title level={5} className="!mb-2">{value.title}</Title>
                 <Paragraph className="!text-sm !text-slate-600 !mb-0">
                   {value.desc}
                 </Paragraph>
               </Card>
             </Col>
           ))}
         </Row>
       </div>
     </div>
   </section>
 );
};

export default AboutSection;