import { useState, useEffect } from 'react';
import { ConfigProvider } from 'antd';
import { ConnectionProvider, useConnection } from './contexts/ConnectionContext';
import { NotificationProvider } from './contexts/NotificationContext';
import { ContentProvider } from './contexts/ContentContext';
import LandingPage from './components/LandingPage';
import AdminPanel from './components/AdminPanel';
import Notifications from './components/Notifications';
import UserNavigation from './components/UserNavigation';

type Page = 'home' | 'admin';

function AppContent() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeApp = async () => {
      // Check admin session
      const adminSession = localStorage.getItem('admin_session');
      setIsAdminLoggedIn(adminSession === 'true');

      setIsLoading(false);
    };

    initializeApp();

    // Add keyboard shortcut for admin access (Ctrl+Shift+A)
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.shiftKey && event.key === 'A') {
        event.preventDefault();
        setCurrentPage('admin');
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, []);


  const handleAdminLogout = () => {
    localStorage.removeItem('admin_session');
    setIsAdminLoggedIn(false);
    setCurrentPage('home');
  };


  const theme = {
    token: {
      colorPrimary: '#667eea',
      colorInfo: '#3b82f6',
      colorSuccess: '#10b981',
      colorWarning: '#f59e0b',
      colorError: '#ef4444',
      borderRadius: 8,
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
    },
  };

  // Show loading while checking connection
  if (isLoading) {
    return (
      <ConfigProvider theme={theme}>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <p className="text-slate-600">Loading ORB...</p>
          </div>
        </div>
      </ConfigProvider>
    );
  }

  return (
    <ConfigProvider theme={theme}>
      <ContentProvider>
          <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
            {/* Show notifications only on admin pages */}
            {(currentPage === 'admin' && isAdminLoggedIn) && <Notifications />}

            {/* Navigation */}
            {currentPage === 'home' && (
              <UserNavigation onAdminLogin={() => setCurrentPage('admin')} />
            )}


            {/* Main Content */}
            <main>
              {currentPage === 'home' ? (
                <LandingPage />
              ) : currentPage === 'admin' && isAdminLoggedIn ? (
                <AdminPanel onLogout={handleAdminLogout} />
              ) : currentPage === 'admin' && !isAdminLoggedIn ? (
                <AdminPanel onLogout={handleAdminLogout} />
              ) : (
                <LandingPage />
              )}
            </main>
          </div>
         </ContentProvider>
   </ConfigProvider>
 );
}

function App() {
  return (
    <NotificationProvider>
      <ConnectionProvider>
        <AppContent />
      </ConnectionProvider>
    </NotificationProvider>
  );
}

export default App;