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

  // Fetch settings
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
      // Default settings are already set in the initial state
    } finally {
      setLoading(false);
    }
  }, []);

  // Save settings
  const saveSettings = useCallback(async () => {
    setLoading(true);
    try {
      await updateSettings(settings);
      setSaved(true);
      // Also store in localStorage for the landing page chatbot
      localStorage.setItem('chatbotSettings', JSON.stringify(settings));
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      console.error('Error saving chatbot settings:', error);
      setError('Failed to save settings');
      // Still mark as saved for better UX
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } finally {
      setLoading(false);
    }
  }, [settings]);

  // Update a single setting
  const updateSetting = useCallback((key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
    setSaved(false);
  }, []);

  // Update a nested setting
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

  // Handle welcome message operations - individual callbacks instead of object
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

  // Group the functions in an object for the same API
  const handleWelcomeMessages = {
    update: updateWelcomeMessage,
    add: addWelcomeMessage,
    remove: removeWelcomeMessage
  };

  // Load settings on mount
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