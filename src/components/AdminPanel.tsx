import React, { useState, useEffect } from 'react';
import { Lock, LogOut, BookOpen, Settings, Calendar } from 'lucide-react';
import BookManager from './BookManager';
import ContentManager from './ContentManager';
import ActivitiesManager from './ActivitiesManager';
import AdminNavigation from './AdminNavigation';
import { useConnection } from '../contexts/ConnectionContext';
import { useNotifications } from '../contexts/NotificationContext';

interface AdminPanelProps {
  onLogout?: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ onLogout }) => {
  const { supabaseClient } = useConnection();
  const { addNotification } = useNotifications();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'books' | 'content' | 'activities'>('books');

  useEffect(() => {
    // Check if user is already authenticated
    const checkAuth = async () => {
      if (supabaseClient) {
        const { data: { session } } = await supabaseClient.auth.getSession();
        if (session) {
          setIsAuthenticated(true);
        }
      }
    };
    checkAuth();
  }, [supabaseClient]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!supabaseClient) {
        throw new Error('Database not connected');
      }

      const { data, error } = await supabaseClient.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password,
      });

      if (error) throw error;

      setIsAuthenticated(true);
      addNotification({
        type: 'success',
        title: 'Login Successful',
        message: 'Welcome to the admin panel!'
      });
    } catch (error: any) {
      setError(error.message || 'Login failed');
      addNotification({
        type: 'error',
        title: 'Login Failed',
        message: error.message || 'Please check your credentials'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      if (supabaseClient) {
        await supabaseClient.auth.signOut();
      }
      setIsAuthenticated(false);
      setCredentials({ email: '', password: '' });
      setError('');
      // Call parent logout handler if provided
      if (onLogout) {
        onLogout();
      }
      addNotification({
        type: 'info',
        title: 'Logged Out',
        message: 'You have been logged out successfully'
      });
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto mt-20 p-8 bg-white rounded-xl shadow-lg border border-slate-200">
        <div className="text-center mb-8">
          <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-purple-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Admin Login</h2>
          <p className="text-slate-600 mt-2">Access the admin panel to manage content</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Email
            </label>
            <input
              type="email"
              value={credentials.email}
              onChange={(e) => setCredentials(prev => ({ ...prev, email: e.target.value }))}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Enter admin email"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Password
            </label>
            <input
              type="password"
              value={credentials.password}
              onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Enter password"
              required
            />
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="mt-6 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Setup Instructions:</strong><br />
            1. Go to Supabase Dashboard → Authentication → Users<br />
            2. Add user with admin email and password<br />
            3. Use those credentials to login here
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <AdminNavigation
        onLogout={handleLogout}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tab Content */}
        {activeTab === 'books' ? (
          <BookManager />
        ) : activeTab === 'activities' ? (
          <ActivitiesManager />
        ) : (
          <ContentManager />
        )}
      </div>
    </div>
  );
};

export default AdminPanel;