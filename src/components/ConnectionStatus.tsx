import React, { useState } from 'react';
import { Database, Wifi, WifiOff, Settings, RefreshCw } from 'lucide-react';
import { useConnection } from '../contexts/ConnectionContext';

const ConnectionStatus: React.FC = () => {
  const { connectionState, disconnect } = useConnection();
  const [showOptions, setShowOptions] = useState(false);

  const getStatusConfig = () => {
    if (connectionState.isConnected) {
      return {
        icon: Database,
        text: 'Live Database',
        color: 'text-green-600',
        bgColor: 'bg-green-50',
        dotColor: 'bg-green-400'
      };
    } else {
      return {
        icon: WifiOff,
        text: 'Demo Mode',
        color: 'text-amber-600',
        bgColor: 'bg-amber-50',
        dotColor: 'bg-amber-400'
      };
    }
  };

  const status = getStatusConfig();
  const StatusIcon = status.icon;

  return (
    <div className="relative">
      <button
        onClick={() => setShowOptions(!showOptions)}
        className={`flex items-center space-x-2 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${status.bgColor} ${status.color} hover:opacity-80`}
      >
        <div className="flex items-center space-x-2">
          <div className="relative">
            <StatusIcon className="w-4 h-4" />
            <div className={`absolute -top-1 -right-1 w-2 h-2 ${status.dotColor} rounded-full`} />
          </div>
          <span>{status.text}</span>
        </div>
        <Settings className="w-3 h-3 opacity-60" />
      </button>

      {showOptions && (
        <>
          <div 
            className="fixed inset-0 z-10"
            onClick={() => setShowOptions(false)}
          />
          <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-slate-200 z-20">
            <div className="p-3 border-b border-slate-200">
              <div className="flex items-center space-x-2 mb-2">
                <StatusIcon className={`w-4 h-4 ${status.color}`} />
                <span className="font-medium text-slate-900">Connection Status</span>
              </div>
              <p className="text-sm text-slate-600">
                {connectionState.isConnected
                  ? 'Connected to your Supabase database'
                  : 'Using demo data (changes not saved)'}
              </p>
            </div>
            
            <div className="p-2">
              {connectionState.isConnected ? (
                <>
                  <div className="px-3 py-2 text-sm">
                    <div className="text-slate-500 mb-1">Project URL</div>
                    <div className="text-slate-900 font-mono text-xs truncate">
                      {connectionState.supabaseUrl}
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      disconnect();
                      setShowOptions(false);
                    }}
                    className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded"
                  >
                    Disconnect & Switch to Demo
                  </button>
                </>
              ) : (
                <div className="px-3 py-2 text-sm text-slate-600">
                  <p>Set up database connection to save changes permanently.</p>
                  <button
                    onClick={() => setShowOptions(false)}
                    className="mt-2 text-purple-600 hover:text-purple-700 font-medium"
                  >
                    Configure Connection →
                  </button>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ConnectionStatus;