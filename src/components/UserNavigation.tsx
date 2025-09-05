import React, { useState, useEffect } from 'react';
import { Button, Drawer } from 'antd';
import { Menu, X, BookOpen, Users, Settings, LogIn } from 'lucide-react';

interface UserNavigationProps {
  onAdminLogin?: () => void;
}

const UserNavigation: React.FC<UserNavigationProps> = ({ onAdminLogin }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    // Observe sections for active navigation
    const sections = ['hero', 'about', 'features', 'books', 'activities', 'community', 'contact'];
    const observers = sections.map((sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) {
        const observer = new IntersectionObserver(handleIntersection, {
          threshold: 0.5,
          rootMargin: '-50% 0px -50% 0px'
        });
        observer.observe(element);
        return observer;
      }
      return null;
    });

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      observers.forEach(observer => observer?.disconnect());
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const navigationItems = [
    { id: 'hero', label: 'Beranda', icon: null },
    { id: 'about', label: 'Tentang', icon: null },
    { id: 'features', label: 'Fitur', icon: null },
    { id: 'books', label: 'Buku', icon: BookOpen },
    { id: 'activities', label: 'Kegiatan', icon: Users },
    { id: 'community', label: 'Komunitas', icon: null },
    { id: 'contact', label: 'Kontak', icon: null },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-slate-200'
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className={`flex items-center space-x-2 transition-all duration-300 ${
                isScrolled ? 'scale-90' : 'scale-100'
              }`}>
                <BookOpen className={`w-8 h-8 ${
                  isScrolled ? 'text-purple-600' : 'text-white'
                }`} />
                <span className={`text-xl font-bold ${
                  isScrolled ? 'text-slate-900' : 'text-white'
                }`}>
                  ORB
                </span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative px-3 py-2 text-sm font-medium transition-all duration-300 ${
                    isScrolled
                      ? activeSection === item.id
                        ? 'text-purple-600'
                        : 'text-slate-600 hover:text-purple-600'
                      : activeSection === item.id
                        ? 'text-cyan-300'
                        : 'text-blue-100 hover:text-cyan-300'
                  }`}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <div className={`absolute bottom-0 left-0 right-0 h-0.5 rounded-full transition-all duration-300 ${
                      isScrolled ? 'bg-purple-600' : 'bg-cyan-300'
                    }`} />
                  )}
                </button>
              ))}
            </div>

            {/* Admin access via keyboard shortcut only */}
            <div className="flex items-center space-x-4">
              {/* Admin button removed - access via Ctrl+Shift+A */}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className={`md:hidden p-2 rounded-lg transition-all duration-300 ${
                  isScrolled
                    ? 'text-slate-600 hover:bg-slate-100'
                    : 'text-blue-100 hover:bg-white/10'
                }`}
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
  <Drawer
    title={
      <div className="flex items-center space-x-2">
        <BookOpen className="w-6 h-6 text-purple-600" />
        <span className="text-lg font-bold text-slate-900">ORB</span>
      </div>
    }
    placement="right"
    onClose={() => setIsMobileMenuOpen(false)}
    open={isMobileMenuOpen}
    width={280}
    className="md:hidden"
  >
    <div className="space-y-2">
      {navigationItems.map((item) => (
        <button
          key={item.id}
          onClick={() => scrollToSection(item.id)}
          className={`w-full flex items-center space-x-3 px-4 py-3 text-left rounded-lg transition-all duration-200 ${
            activeSection === item.id
              ? 'bg-purple-50 text-purple-600 border-l-4 border-purple-600'
              : 'text-slate-700 hover:bg-slate-50 hover:text-purple-600'
          }`}
        >
          {item.icon && <item.icon className="w-5 h-5" />}
          <span className="font-medium">{item.label}</span>
        </button>
      ))}
    </div>
  </Drawer>
    </>
  );
};

export default UserNavigation;