import React, { createContext, useContext, useState, useEffect } from 'react';
import { useConnection } from './ConnectionContext';
import { useNotifications } from './NotificationContext';

interface EditableContent {
  registerButtonText: string;
  registerButtonLink: string;
  whatsappLink: string;
  instagramLink: string;
  contactEmail: string;
  contactMessage: string;
  contactInstagram: string;
  contactGithub: string;
  contactWebsite: string;
}

interface ContentContextType {
  content: EditableContent;
  updateContent: (updates: Partial<EditableContent>) => Promise<void>;
  resetToDefaults: () => Promise<void>;
  loading: boolean;
}

const defaultContent: EditableContent = {
  registerButtonText: 'Daftar Sekarang',
  registerButtonLink: '#',
  whatsappLink: '#',
  instagramLink: '#',
  contactEmail: 'hello@orb-community.id',
  contactMessage: 'ORB Community Server',
  contactInstagram: '@orb.community',
  contactGithub: 'github.com/orb-community',
  contactWebsite: 'www.orb-community.id'
};

const ContentContext = createContext<ContentContextType | null>(null);

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within ContentProvider');
  }
  return context;
};

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { connectionState, supabaseClient } = useConnection();
  const { addNotification } = useNotifications();
  const [content, setContent] = useState<EditableContent>(defaultContent);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadContent();
  }, [connectionState.isConnected, supabaseClient]);

  const loadContent = async () => {
    setLoading(true);

    if (!connectionState.isConnected || !supabaseClient) {
      // Fallback to localStorage if not connected
      const savedContent = localStorage.getItem('orb_editable_content');
      if (savedContent) {
        try {
          const parsed = JSON.parse(savedContent);
          setContent({ ...defaultContent, ...parsed });
        } catch (error) {
          console.error('Error loading saved content:', error);
        }
      }
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabaseClient
        .from('content')
        .select('key, value');

      if (error) throw error;

      const contentData: Partial<EditableContent> = {};
      data.forEach((item: any) => {
        switch (item.key) {
          case 'register_button_text':
            contentData.registerButtonText = item.value;
            break;
          case 'register_button_link':
            contentData.registerButtonLink = item.value;
            break;
          case 'whatsapp_link':
            contentData.whatsappLink = item.value;
            break;
          case 'instagram_link':
            contentData.instagramLink = item.value;
            break;
          case 'contact_email':
            contentData.contactEmail = item.value;
            break;
          case 'contact_message':
            contentData.contactMessage = item.value;
            break;
          case 'contact_instagram':
            contentData.contactInstagram = item.value;
            break;
          case 'contact_github':
            contentData.contactGithub = item.value;
            break;
          case 'contact_website':
            contentData.contactWebsite = item.value;
            break;
        }
      });

      setContent({ ...defaultContent, ...contentData });
    } catch (error) {
      console.error('Error loading content from database:', error);
      addNotification({
        type: 'error',
        title: 'Content Loading Error',
        message: 'Failed to load content from database. Using defaults.'
      });
    } finally {
      setLoading(false);
    }
  };

  const updateContent = async (updates: Partial<EditableContent>) => {
    const newContent = { ...content, ...updates };
    setContent(newContent);

    if (!connectionState.isConnected || !supabaseClient) {
      // Fallback to localStorage
      localStorage.setItem('orb_editable_content', JSON.stringify(newContent));
      return;
    }

    try {
      const updatesArray = Object.entries(updates).map(([key, value]) => {
        let dbKey = key;
        switch (key) {
          case 'registerButtonText':
            dbKey = 'register_button_text';
            break;
          case 'registerButtonLink':
            dbKey = 'register_button_link';
            break;
          case 'whatsappLink':
            dbKey = 'whatsapp_link';
            break;
          case 'instagramLink':
            dbKey = 'instagram_link';
            break;
          case 'contactEmail':
            dbKey = 'contact_email';
            break;
          case 'contactMessage':
            dbKey = 'contact_message';
            break;
          case 'contactInstagram':
            dbKey = 'contact_instagram';
            break;
          case 'contactGithub':
            dbKey = 'contact_github';
            break;
          case 'contactWebsite':
            dbKey = 'contact_website';
            break;
        }
        return { key: dbKey, value: value as string };
      });

      for (const update of updatesArray) {
        const { error } = await supabaseClient
          .from('content')
          .upsert({ key: update.key, value: update.value }, { onConflict: 'key' });

        if (error) throw error;
      }

      addNotification({
        type: 'success',
        title: 'Content Updated',
        message: 'Content has been saved to database successfully.'
      });
    } catch (error) {
      console.error('Error updating content:', error);
      addNotification({
        type: 'error',
        title: 'Update Error',
        message: 'Failed to save content to database.'
      });
    }
  };

  const resetToDefaults = async () => {
    setContent(defaultContent);

    if (!connectionState.isConnected || !supabaseClient) {
      localStorage.removeItem('orb_editable_content');
      return;
    }

    try {
      const defaultUpdates = Object.entries(defaultContent).map(([key, value]) => {
        let dbKey = key;
        switch (key) {
          case 'registerButtonText':
            dbKey = 'register_button_text';
            break;
          case 'registerButtonLink':
            dbKey = 'register_button_link';
            break;
          case 'whatsappLink':
            dbKey = 'whatsapp_link';
            break;
          case 'instagramLink':
            dbKey = 'instagram_link';
            break;
          case 'contactEmail':
            dbKey = 'contact_email';
            break;
          case 'contactMessage':
            dbKey = 'contact_message';
            break;
          case 'contactInstagram':
            dbKey = 'contact_instagram';
            break;
          case 'contactGithub':
            dbKey = 'contact_github';
            break;
          case 'contactWebsite':
            dbKey = 'contact_website';
            break;
        }
        return { key: dbKey, value };
      });

      for (const update of defaultUpdates) {
        const { error } = await supabaseClient
          .from('content')
          .upsert({ key: update.key, value: update.value }, { onConflict: 'key' });

        if (error) throw error;
      }

      addNotification({
        type: 'success',
        title: 'Content Reset',
        message: 'Content has been reset to defaults.'
      });
    } catch (error) {
      console.error('Error resetting content:', error);
      addNotification({
        type: 'error',
        title: 'Reset Error',
        message: 'Failed to reset content in database.'
      });
    }
  };

  return (
    <ContentContext.Provider value={{
      content,
      updateContent,
      resetToDefaults,
      loading
    }}>
      {children}
    </ContentContext.Provider>
  );
};