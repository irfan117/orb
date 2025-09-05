import React from 'react';
import { Button, Typography } from 'antd';
import { ArrowRight, Code2, Users, BookOpen } from 'lucide-react';
import { useContent } from '../contexts/ContentContext';

const { Title, Paragraph } = Typography;

const HeroSection: React.FC = () => {
  const { content } = useContent();

  const scrollToEbookSection = () => {
    const element = document.getElementById('ebook-section');
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
   <section className="relative overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-800 to-blue-800 text-white min-h-screen flex items-center">
     {/* Animated Background Elements */}
     <div className="absolute inset-0">
       {/* Grid Pattern */}
       <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDYwIDAgTCAwIDAgMCA2MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30 animate-pulse" />
       
       {/* Floating Particles */}
       <div className="absolute top-20 left-10 w-2 h-2 bg-cyan-400 rounded-full animate-ping opacity-60" />
       <div className="absolute top-32 right-20 w-3 h-3 bg-purple-400 rounded-full animate-bounce opacity-40" />
       <div className="absolute bottom-40 left-20 w-2 h-2 bg-blue-300 rounded-full animate-pulse opacity-50" />
       <div className="absolute bottom-20 right-32 w-4 h-4 bg-indigo-300 rounded-full animate-ping opacity-30" />
       
       {/* Code-like Elements */}
       <div className="absolute top-40 left-1/4 text-cyan-300 text-sm opacity-20 font-mono animate-pulse">
         {'{ "innovation": true }'}
       </div>
       <div className="absolute bottom-60 right-1/4 text-purple-300 text-sm opacity-20 font-mono animate-bounce">
         {'<learning />'}
       </div>
     </div>

     {/* Dark Overlay */}
     <div className="absolute inset-0 bg-black/30" />

     <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
       <div className="text-center">
         {/* Badge */}
         <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-cyan-300 text-sm font-medium mb-8 border border-white/20">
           <Code2 className="w-4 h-4 mr-2" />
           Club IT SMA - Pembelajaran Terbuka
         </div>

         {/* Main Title */}
         <Title level={1} className="!text-white !mb-0">
           <div className="text-7xl md:text-8xl lg:text-9xl font-black leading-none tracking-tight">
             <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
               ORB
             </span>
           </div>
           <div className="text-2xl md:text-4xl lg:text-5xl font-light text-blue-100 mt-4 tracking-wide">
             Open Research Base
           </div>
         </Title>

         {/* Subtitle */}
         <Paragraph className="text-xl md:text-2xl text-cyan-100 mb-6 max-w-4xl mx-auto leading-relaxed font-medium">
           Komunitas IT SMA untuk Pembelajaran dan Riset Terbuka
         </Paragraph>

         {/* Description */}
         <Paragraph className="text-lg md:text-xl text-blue-100/90 mb-12 max-w-4xl mx-auto leading-relaxed">
           Bergabunglah dengan ekosistem pembelajaran teknologi yang kolaboratif.
           <br className="hidden md:block" />
           Belajar, berbagi, dan berkembang bersama dalam semangat{' '}
           <span className="text-cyan-300 font-semibold">open source</span> dan{' '}
           <span className="text-purple-300 font-semibold">knowledge sharing</span>.
         </Paragraph>

         {/* Stats */}
         <div className="mb-12" />

         {/* CTA Buttons */}
         <div className="flex flex-col sm:flex-row gap-6 justify-center">
           <Button
             type="primary"
             size="large"
             className="group inline-flex items-center justify-center px-10 py-6 bg-gradient-to-r from-cyan-500 to-blue-500 border-none text-white rounded-2xl font-bold text-lg shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 hover:scale-105 h-auto"
             href={content.registerButtonLink}
             target="_blank"
             rel="noopener noreferrer"
           >
             <Users className="w-6 h-6 mr-3" />
             {content.registerButtonText}
             <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
           </Button>
           
           <Button
             size="large"
             className="group inline-flex items-center justify-center px-10 py-6 bg-white/10 backdrop-blur-md border-2 border-white/20 text-white rounded-2xl font-bold text-lg hover:bg-white/20 transition-all duration-300 hover:scale-105 h-auto"
             onClick={scrollToEbookSection}
           >
             <BookOpen className="w-6 h-6 mr-3" />
             Lihat Karya Kami
             <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
           </Button>
         </div>

         {/* Scroll Indicator */}
         <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
           <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
             <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse" />
           </div>
         </div>
       </div>
     </div>

   </section>
 );
};

export default HeroSection;