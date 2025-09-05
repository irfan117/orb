import React, { useState, useEffect } from 'react';
import { Router, BookOpen, Database, Settings, Home, LogIn } from 'lucide-react';
import { ConfigProvider } from 'antd';
import { ConnectionProvider } from './contexts/ConnectionContext';
import { NotificationProvider } from './contexts/NotificationContext';
import { ContentProvider } from './contexts/ContentContext';
import LandingPage from './components/LandingPage';
import AdminPanel from './components/AdminPanel';
import SetupPanel from './components/SetupPanel';
import DatabaseSetup from './components/DatabaseSetup';
import AdminSetup from './components/AdminSetup';
import Notifications from './components/Notifications';
import UserNavigation from './components/UserNavigation';
import AdminNavigation from './components/AdminNavigation';

type Page = 'home' | 'admin';
type SetupStep = 'database' | 'admin' | 'complete';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [setupStep, setSetupStep] = useState<SetupStep>('database');
  const [isSetupComplete, setIsSetupComplete] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  useEffect(() => {
    // Check setup status on app load
    const savedSetupStep = localStorage.getItem('setup_step');
    if (savedSetupStep === 'complete') {
      setIsSetupComplete(true);
      // Check admin session
      const adminSession = localStorage.getItem('admin_session');
      setIsAdminLoggedIn(adminSession === 'true');
    } else if (savedSetupStep === 'admin') {
      setSetupStep('admin');
    } else {
      setSetupStep('database');
    }

    // Add keyboard shortcut for admin access (Ctrl+Shift+A)
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.shiftKey && event.key === 'A' && isSetupComplete) {
        event.preventDefault();
        setCurrentPage('admin');
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [isSetupComplete]);

  const handleAdminLogin = (success: boolean) => {
    if (success) {
      setIsAdminLoggedIn(true);
    }
  };

  const handleAdminLogout = () => {
    localStorage.removeItem('admin_session');
    setIsAdminLoggedIn(false);
    setCurrentPage('home');
  };

  const handleDatabaseSetupComplete = async (config: { supabaseUrl: string; supabaseAnonKey: string }) => {
    // Save to localStorage for setup tracking
    localStorage.setItem('db_config', JSON.stringify(config));
    localStorage.setItem('setup_step', 'admin');

    setSetupStep('admin');
  };

  const handleAdminSetupComplete = async () => {
    // Get saved database config and connect to Supabase
    const dbConfig = localStorage.getItem('db_config');
    if (dbConfig) {
      const { supabaseUrl, supabaseAnonKey } = JSON.parse(dbConfig);

      // Save connection for ConnectionContext to pick up
      localStorage.setItem('orb_supabase_connection', JSON.stringify({
        url: supabaseUrl,
        key: supabaseAnonKey
      }));
    }

    setIsSetupComplete(true);
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

  // Show setup components if setup is not complete
  if (!isSetupComplete) {
    if (setupStep === 'database') {
      return (
        <ConfigProvider theme={theme}>
          <DatabaseSetup onComplete={handleDatabaseSetupComplete} />
        </ConfigProvider>
      );
    } else if (setupStep === 'admin') {
      return (
        <ConfigProvider theme={theme}>
          <AdminSetup onComplete={handleAdminSetupComplete} />
        </ConfigProvider>
      );
    }
  }

  return (
    <ConfigProvider theme={theme}>
      <NotificationProvider>
        <ConnectionProvider>
          <ContentProvider>
          <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
            {/* Show notifications only on admin pages */}
            {(currentPage === 'admin' && isAdminLoggedIn) && <Notifications />}

            {/* Navigation */}
            {currentPage === 'home' && (
              <UserNavigation onAdminLogin={() => setCurrentPage('admin')} />
            )}

            {/* Setup Panel */}
            <SetupPanel />

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
        </ConnectionProvider>
      </NotificationProvider>
    </ConfigProvider>
  );
}

export default App;