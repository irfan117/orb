import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { useNotifications } from './NotificationContext';

interface ConnectionState {
  isConnected: boolean;
  isDemo: boolean;
  supabaseUrl: string;
  supabaseKey: string;
  projectInfo: any;
}

interface ConnectionContextType {
  connectionState: ConnectionState;
  supabaseClient: SupabaseClient | null;
  connect: (url: string, key: string) => Promise<boolean>;
  disconnect: () => void;
  testConnection: (url: string, key: string) => Promise<boolean>;
  setupDatabase: () => Promise<boolean>;
  showSetupPanel: boolean;
  hideSetupPanel: () => void;
}

const ConnectionContext = createContext<ConnectionContextType | null>(null);

export const useConnection = () => {
  const context = useContext(ConnectionContext);
  if (!context) {
    throw new Error('useConnection must be used within ConnectionProvider');
  }
  return context;
};

export const ConnectionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [connectionState, setConnectionState] = useState<ConnectionState>({
    isConnected: false,
    isDemo: true,
    supabaseUrl: '',
    supabaseKey: '',
    projectInfo: null,
  });
  const [supabaseClient, setSupabaseClient] = useState<SupabaseClient | null>(null);
  const [showSetupPanel, setShowSetupPanel] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const { addNotification } = useNotifications();

  // Load saved connection on mount
  useEffect(() => {
    let isMounted = true;

    const loadConnection = async () => {
      const savedConnection = localStorage.getItem('orb_supabase_connection');
      if (savedConnection) {
        try {
          const { url, key } = JSON.parse(savedConnection);
          if (url && key && isMounted) {
            await connect(url, key);
          } else if (isMounted) {
            setShowSetupPanel(true);
          }
        } catch (error) {
          console.error('Error loading saved connection:', error);
          if (isMounted) {
            setShowSetupPanel(true);
          }
        }
      } else if (isMounted) {
        setShowSetupPanel(true);
      }
    };

    loadConnection();

    return () => {
      isMounted = false;
    };
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (supabaseClient) {
        // Clean up client on unmount
        setSupabaseClient(null);
      }
    };
  }, [supabaseClient]);

  const testConnection = async (url: string, key: string): Promise<boolean> => {
    try {
      // Create a temporary client for testing (this is expected to create a new instance)
      const client = createClient(url, key, {
        auth: {
          storageKey: `temp-${Date.now()}`, // Use unique storage key to avoid conflicts
        }
      });

      // Test basic connectivity by checking auth session
      const { data, error } = await client.auth.getSession();

      if (error) {
        throw error;
      }

      return true;
    } catch (error) {
      console.error('Connection test failed:', error);
      return false;
    }
  };

  const setupDatabase = async (): Promise<boolean> => {
    if (!supabaseClient) return false;

    try {
      // Check if all required tables exist
      const tables = ['books', 'activities', 'content'];
      const missingTables: string[] = [];

      for (const table of tables) {
        try {
          const { error } = await supabaseClient
            .from(table)
            .select('id')
            .limit(1);

          if (error && error.message.includes('does not exist')) {
            missingTables.push(table);
          }
        } catch (error) {
          missingTables.push(table);
        }
      }

      if (missingTables.length > 0) {
        addNotification({
          type: 'info',
          title: 'Database Setup Required',
          message: `Tables not found: ${missingTables.join(', ')}. Please run the SQL setup from database_setup.sql in your Supabase dashboard.`
        });
        return true; // Still consider connection successful
      }

      // Check permissions on existing tables
      for (const table of tables) {
        try {
          const { error } = await supabaseClient
            .from(table)
            .select('*')
            .limit(1);

          if (error) {
            addNotification({
              type: 'warning',
              title: 'Database Permissions',
              message: `There may be permission issues with the ${table} table.`
            });
          }
        } catch (error) {
          console.error(`Error checking ${table} permissions:`, error);
        }
      }

      return true;
    } catch (error) {
      console.error('Database setup failed:', error);
      addNotification({
        type: 'warning',
        title: 'Database Setup',
        message: 'Connected successfully, but please ensure all required tables exist in your Supabase project.'
      });
      return true; // Still consider connection successful
    }
  };

  const connect = async (url: string, key: string): Promise<boolean> => {
    try {
      // Prevent multiple simultaneous connections
      if (isConnecting) {
        return false;
      }

      // Don't create new connection if already connected
      if (connectionState.isConnected && supabaseClient) {
        return true;
      }

      setIsConnecting(true);

      const isValid = await testConnection(url, key);
      if (!isValid) {
        addNotification({
          type: 'error',
          title: 'Connection Failed',
          message: 'Unable to connect to Supabase. Please check your credentials.'
        });
        return false;
      }

      // Create client with specific auth configuration to avoid conflicts
      const client = createClient(url, key, {
        auth: {
          storageKey: 'orb-supabase-auth', // Consistent storage key
          autoRefreshToken: true,
          persistSession: true
        }
      });
      setSupabaseClient(client);

      // Get project info
      const { data: projectData } = await client.from('books').select('*').limit(1);
      
      setConnectionState({
        isConnected: true,
        isDemo: false,
        supabaseUrl: url,
        supabaseKey: key,
        projectInfo: { connected: true }
      });

      // Save connection
      localStorage.setItem('orb_supabase_connection', JSON.stringify({ url, key }));
      
      // Setup database
      await setupDatabase();
      
      addNotification({
        type: 'success',
        title: 'Connected Successfully',
        message: 'ORB is now connected to your Supabase database!'
      });

      return true;
    } catch (error) {
      console.error('Connection failed:', error);
      addNotification({
        type: 'error',
        title: 'Connection Error',
        message: error instanceof Error ? error.message : 'Failed to connect'
      });
      return false;
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnect = () => {
    setSupabaseClient(null);
    setConnectionState({
      isConnected: false,
      isDemo: true,
      supabaseUrl: '',
      supabaseKey: '',
      projectInfo: null
    });
    localStorage.removeItem('orb_supabase_connection');
    setShowSetupPanel(true);
    addNotification({
      type: 'info',
      title: 'Disconnected',
      message: 'Switched back to demo mode'
    });
  };

  const hideSetupPanel = () => {
    setShowSetupPanel(false);
  };

  return (
    <ConnectionContext.Provider value={{
      connectionState,
      supabaseClient,
      connect,
      disconnect,
      testConnection,
      setupDatabase,
      showSetupPanel,
      hideSetupPanel
    }}>
      {children}
    </ConnectionContext.Provider>
  );
};