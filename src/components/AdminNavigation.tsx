import React from 'react';
import { Button, Dropdown, Avatar } from 'antd';
import { LogOut, User, Settings, Database, BookOpen, Users, Settings2 } from 'lucide-react';
import type { MenuProps } from 'antd';

interface AdminNavigationProps {
  onLogout: () => void;
  activeTab: 'books' | 'activities' | 'content';
  onTabChange: (tab: 'books' | 'activities' | 'content') => void;
}

const AdminNavigation: React.FC<AdminNavigationProps> = ({
  onLogout,
  activeTab,
  onTabChange
}) => {
  const adminMenuItems: MenuProps['items'] = [
    {
      key: 'profile',
      icon: <User className="w-4 h-4" />,
      label: 'Profile',
    },
    {
      key: 'settings',
      icon: <Settings className="w-4 h-4" />,
      label: 'Settings',
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <LogOut className="w-4 h-4" />,
      label: 'Logout',
      onClick: onLogout,
    },
  ];

  const navigationTabs = [
    {
      key: 'books' as const,
      label: 'Books',
      icon: BookOpen,
      description: 'Manage book library'
    },
    {
      key: 'activities' as const,
      label: 'Activities',
      icon: Users,
      description: 'Manage events & activities'
    },
    {
      key: 'content' as const,
      label: 'Content',
      icon: Settings2,
      description: 'Edit website content'
    },
  ];

  return (
    <nav className="bg-white shadow-sm border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Title */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <BookOpen className="w-8 h-8 text-purple-600" />
              <div>
                <span className="text-xl font-bold text-slate-900">ORB</span>
                <span className="text-sm text-slate-500 ml-2">Admin Panel</span>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="hidden md:flex items-center space-x-1">
            {navigationTabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.key}
                  onClick={() => onTabChange(tab.key)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    activeTab === tab.key
                      ? 'bg-purple-50 text-purple-700 border border-purple-200'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                  title={tab.description}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Admin Menu */}
          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center space-x-2 text-sm text-slate-600">
              <Database className="w-4 h-4" />
              <span>Connected</span>
            </div>

            <Dropdown
              menu={{ items: adminMenuItems }}
              placement="bottomRight"
              trigger={['click']}
            >
              <Button
                type="text"
                className="flex items-center space-x-2 h-8 px-3"
              >
                <Avatar size="small" className="bg-purple-600">
                  <User className="w-3 h-3" />
                </Avatar>
                <span className="hidden sm:inline text-slate-700">Admin</span>
              </Button>
            </Dropdown>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden pb-4">
          <div className="flex space-x-1 bg-slate-50 p-1 rounded-lg">
            {navigationTabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.key}
                  onClick={() => onTabChange(tab.key)}
                  className={`flex-1 flex items-center justify-center space-x-1 px-3 py-2 rounded-md text-xs font-medium transition-all duration-200 ${
                    activeTab === tab.key
                      ? 'bg-white text-purple-700 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden xs:inline">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavigation;