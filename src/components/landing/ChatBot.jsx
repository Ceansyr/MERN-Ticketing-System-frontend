import React, { useState, useCallback, useEffect } from "react";
import axios from "axios";
import ChatPopup from "./chatbot/ChatPopup";
import ChatWindow from "./chatbot/ChatWindow";
import UserInfoForm from "./chatbot/UserInfoForm";
import MessageList from "./chatbot/MessageList";
import MessageInput from "./chatbot/MessageInput";

function ChatBot() {
    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
    console.log('API_URL:', API_URL); 
    
    const [showChatPopup, setShowChatPopup] = useState(true);
    const [showChatWindow, setShowChatWindow] = useState(false);
    const [userInfo, setUserInfo] = useState({
        name: '',
        phone: '',
        email: ''
    });
    const [userMessage, setUserMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [ticketCreated, setTicketCreated] = useState(false);
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
    
    const fetchSettings = useCallback(async () => {
        try {
            const response = await axios.get(`${API_URL}/chatbot/settings/public?t=${Date.now()}`);
            if (response.data) {
                console.log('Fetched settings:', response.data);
                setSettings(response.data);
                localStorage.setItem('chatbotSettings', JSON.stringify(response.data));
                return;
            }
        } catch (error) {
            console.error('Error fetching chatbot settings:', error);
            const cachedSettings = localStorage.getItem('chatbotSettings');
            if (cachedSettings) {
                try {
                    const parsed = JSON.parse(cachedSettings);
                    console.log('Using cached settings:', parsed);
                    setSettings(parsed);
                } catch (parseError) {
                    console.error('Error parsing cached settings:', parseError);
                    localStorage.removeItem('chatbotSettings');
                }
            }
        }
    }, [API_URL]);
    
    const clearCachedSettings = useCallback(() => {
        localStorage.removeItem('chatbotSettings');
        console.log('Cleared cached settings');
        fetchSettings();
    }, [fetchSettings]); 

    useEffect(() => {
        fetchSettings();

        const refreshInterval = setInterval(fetchSettings, 2 * 60 * 1000);

        return () => clearInterval(refreshInterval);
    }, [fetchSettings]); 

    const closeChatPopup = useCallback(() => {
        setShowChatPopup(false);
    }, []);

    const toggleChatWindow = useCallback(() => {
        setShowChatWindow(prevState => !prevState);
        setShowChatPopup(false);
        
        if (!showChatWindow) {
             clearCachedSettings();
        }
    }, [showChatWindow, clearCachedSettings]);
    
    const handleInputChange = useCallback((e) => {
        const { name, value } = e.target;
        setUserInfo(prevInfo => ({
            ...prevInfo,
            [name]: value
        }));
    }, []);

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${API_URL}/chatbot/guest`, userInfo, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });
            
            localStorage.setItem('guestToken', response.data.token);
            
            const welcomeMessage = settings.welcomeMessages && settings.welcomeMessages.length > 0 
                ? settings.welcomeMessages[Math.floor(Math.random() * settings.welcomeMessages.length)]
                : `Thanks ${userInfo.name}! How can I help you today?`;
            
            setMessages(prev => [...prev, {
                type: 'bot',
                content: welcomeMessage
            }]);
            
            setFormSubmitted(true);
        } catch (error) {
            console.error('Error submitting user info:', error);
            if (error.response) {
                console.error('Response data:', error.response.data);
                console.error('Response status:', error.response.status);
                console.error('Response headers:', error.response.headers);
            }
            
            setMessages(prev => [...prev, {
                type: 'bot',
                content: 'Sorry, there was an error processing your information. Please try again.'
            }]);
        }
    }, [userInfo, settings.welcomeMessages, API_URL]);

    const sendMessage = useCallback(async () => {
        if (!userMessage.trim()) return;

        const newMessage = {
            type: 'user',
            content: userMessage
        };
        
        setMessages(prev => [...prev, newMessage]);
        
        const messageToSend = userMessage;
        setUserMessage('');
        
        try {
            const token = localStorage.getItem('guestToken');
            
            if (!token) {
                throw new Error('No authentication token found');
            }
            
            await axios.post(`${API_URL}/chatbot/guest/ticket`, {
                title: `Support Request from ${userInfo.name}`,
                description: messageToSend,
                contactInfo: {
                    name: userInfo.name,
                    email: userInfo.email,
                    phone: userInfo.phone
                }
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            
            setMessages(prev => [...prev, {
                type: 'bot',
                content: 'Thank you for your message! We have created a support ticket and our team will get back to you soon.'
            }]);
            
            setTicketCreated(true);
        } catch (error) {
            console.error('Error sending message:', error);
            setMessages(prev => [...prev, {
                type: 'bot',
                content: 'Sorry, there was an error processing your message. Please try again.'
            }]);
        }
    }, [userMessage, userInfo, API_URL]);
    
    const handleMessageChange = useCallback((e) => {
        setUserMessage(e.target.value);
    }, []);

    const handleKeyPress = useCallback((e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    }, [sendMessage]);


    return (
        <>
            {showChatPopup && (
                <ChatPopup
                    onClose={closeChatPopup}
                    initialMessage={settings.initialMessage}
                />
            )}

            <button
                className="chat-widget-button"
                onClick={toggleChatWindow}
                aria-label="Open chat"
            >
                <div className="chat-icon"></div>
            </button>

            {showChatWindow && (
                <ChatWindow
                    onClose={toggleChatWindow}
                    headerColor={settings.headerColor}
                >
                    <div className="chat-messages" style={{ backgroundColor: settings.backgroundColor }}>
                        {!formSubmitted ? (
                            <UserInfoForm
                                userInfo={userInfo}
                                onChange={handleInputChange}
                                onSubmit={handleSubmit}
                                settings={settings.introductionForm}
                            />
                        ) : (
                            <MessageList messages={messages} />
                        )}
                    </div>

                    {formSubmitted && (
                        <MessageInput
                            value={userMessage}
                            onChange={handleMessageChange}
                            onKeyPress={handleKeyPress}
                            onSend={sendMessage}
                            disabled={ticketCreated}
                        />
                    )}
                </ChatWindow>
            )}
        </>
    );
}

export default ChatBot;
