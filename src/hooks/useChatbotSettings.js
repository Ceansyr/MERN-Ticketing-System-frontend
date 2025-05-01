import { useState, useEffect, useCallback } from 'react';
import { getSettings, updateSettings } from '../api/chatbotApi';

export const useChatbotSettings = () => {
  const [settings, setSettings] = useState({
    headerColor: '#334758',
    backgroundColor: '#FFFFFF',
    welcomeMessages: [
      'How can I help you?',
      'Ask me anything!'
    ],
    missedChatTimer: {
      minutes: 12,
      seconds: 0
    },
    introductionForm: {
      enabled: true,
      nameField: true,
      phoneField: true,
      emailField: true,
      buttonText: 'Thank You!'
    }
  });
  
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState(null);

  const fetchSettings = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getSettings();
      if (response) {
        setSettings(response);
      }
    } catch (error) {
      console.error('Error fetching chatbot settings:', error);
      setError('Failed to load settings');
    } finally {
      setLoading(false);
    }
  }, []);

  const saveSettings = useCallback(async () => {
    setLoading(true);
    try {
      await updateSettings(settings);
      setSaved(true);
      localStorage.setItem('chatbotSettings', JSON.stringify(settings));
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      console.error('Error saving chatbot settings:', error);
      setError('Failed to save settings');
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } finally {
      setLoading(false);
    }
  }, [settings]);

  const updateSetting = useCallback((key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
    setSaved(false);
  }, []);

  const updateNestedSetting = useCallback((parent, key, value) => {
    setSettings(prev => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [key]: value
      }
    }));
    setSaved(false);
  }, []);

  const updateWelcomeMessage = useCallback((index, value) => {
    const updatedMessages = [...settings.welcomeMessages];
    updatedMessages[index] = value;
    
    setSettings(prev => ({
      ...prev,
      welcomeMessages: updatedMessages
    }));
    setSaved(false);
  }, [settings.welcomeMessages]);

  const addWelcomeMessage = useCallback(() => {
    setSettings(prev => ({
      ...prev,
      welcomeMessages: [...prev.welcomeMessages, '']
    }));
    setSaved(false);
  }, []);

  const removeWelcomeMessage = useCallback((index) => {
    const updatedMessages = [...settings.welcomeMessages];
    updatedMessages.splice(index, 1);
    
    setSettings(prev => ({
      ...prev,
      welcomeMessages: updatedMessages
    }));
    setSaved(false);
  }, [settings.welcomeMessages]);

  const handleWelcomeMessages = {
    update: updateWelcomeMessage,
    add: addWelcomeMessage,
    remove: removeWelcomeMessage
  };

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  return {
    settings,
    loading,
    saved,
    error,
    updateSetting,
    updateNestedSetting,
    handleWelcomeMessages,
    saveSettings
  };
};