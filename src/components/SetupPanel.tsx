import React, { useState } from 'react';
import { Database, Check, Loader, ExternalLink, X, ChevronDown, ChevronUp } from 'lucide-react';
import { useConnection } from '../contexts/ConnectionContext';

const SetupPanel: React.FC = () => {
  const { connect, testConnection, showSetupPanel, hideSetupPanel, connectionState } = useConnection();
  const [isExpanded, setIsExpanded] = useState(showSetupPanel && !connectionState.isConnected);
  const [formData, setFormData] = useState({
    url: '',
    key: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [testStatus, setTestStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle');

  if (!showSetupPanel && connectionState.isConnected) {
    return null;
  }

  const handleTest = async () => {
    if (!formData.url || !formData.key) return;
    
    setIsLoading(true);
    setTestStatus('testing');
    
    const success = await testConnection(formData.url, formData.key);
    setTestStatus(success ? 'success' : 'error');
    setIsLoading(false);
  };

  const handleConnect = async () => {
    if (!formData.url || !formData.key) return;
    
    setIsLoading(true);
    const success = await connect(formData.url, formData.key);
    setIsLoading(false);
    
    if (success) {
      hideSetupPanel();
      setIsExpanded(false);
    }
  };

  const handleSkipDemo = () => {
    hideSetupPanel();
    setIsExpanded(false);
  };

  return (
    <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-4">
          {/* Header */}
          <div 
            className="flex items-center justify-between cursor-pointer"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <div className="flex items-center space-x-3">
              <Database className="w-5 h-5" />
              <h3 className="font-semibold">
                {connectionState.isConnected ? 'Database Connected' : 'Setup Database Connection'}
              </h3>
              {!connectionState.isConnected && (
                <span className="bg-white/20 px-2 py-1 rounded-full text-xs">
                  Optional
                </span>
              )}
            </div>
            <div className="flex items-center space-x-2">
              {connectionState.isConnected && (
                <div className="flex items-center space-x-2 text-green-200">
                  <Check className="w-4 h-4" />
                  <span className="text-sm">Connected</span>
                </div>
              )}
              {isExpanded ? (
                <ChevronUp className="w-5 h-5" />
              ) : (
                <ChevronDown className="w-5 h-5" />
              )}
            </div>
          </div>

          {/* Expanded Content */}
          {isExpanded && (
            <div className="mt-4 space-y-4">
              <div className="bg-white/10 rounded-lg p-4">
                <p className="text-sm mb-4 leading-relaxed">
                  Connect your own Supabase database to store real data, or continue with demo mode. 
                  <a 
                    href="https://supabase.com/dashboard" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1 ml-2 text-blue-200 hover:text-white underline"
                  >
                    <span>Create free Supabase project</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Supabase URL
                    </label>
                    <input
                      type="url"
                      placeholder="https://your-project.supabase.co"
                      value={formData.url}
                      onChange={(e) => setFormData(prev => ({ ...prev, url: e.target.value }))}
                      className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-md placeholder-white/60 text-white focus:outline-none focus:ring-2 focus:ring-white/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Anon Key
                    </label>
                    <input
                      type="password"
                      placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                      value={formData.key}
                      onChange={(e) => setFormData(prev => ({ ...prev, key: e.target.value }))}
                      className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-md placeholder-white/60 text-white focus:outline-none focus:ring-2 focus:ring-white/50"
                    />
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 mt-4">
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={handleTest}
                      disabled={!formData.url || !formData.key || isLoading}
                      className="flex items-center space-x-2 px-4 py-2 bg-white/20 hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed rounded-md transition-colors"
                    >
                      {testStatus === 'testing' ? (
                        <Loader className="w-4 h-4 animate-spin" />
                      ) : testStatus === 'success' ? (
                        <Check className="w-4 h-4 text-green-200" />
                      ) : (
                        <Database className="w-4 h-4" />
                      )}
                      <span>Test Connection</span>
                    </button>

                    <button
                      onClick={handleConnect}
                      disabled={!formData.url || !formData.key || isLoading || testStatus !== 'success'}
                      className="flex items-center space-x-2 px-4 py-2 bg-white text-purple-600 hover:bg-white/90 disabled:opacity-50 disabled:cursor-not-allowed rounded-md font-medium transition-colors"
                    >
                      {isLoading ? (
                        <Loader className="w-4 h-4 animate-spin" />
                      ) : (
                        <Check className="w-4 h-4" />
                      )}
                      <span>Connect & Setup</span>
                    </button>
                  </div>

                  <button
                    onClick={handleSkipDemo}
                    className="text-sm text-white/80 hover:text-white underline"
                  >
                    Continue with demo mode →
                  </button>
                </div>

                {testStatus === 'error' && (
                  <div className="mt-3 p-3 bg-red-500/20 border border-red-400/30 rounded-md">
                    <p className="text-sm text-red-200">
                      Connection failed. Please check your credentials and try again.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SetupPanel;