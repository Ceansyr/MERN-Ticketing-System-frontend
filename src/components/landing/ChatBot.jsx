import React, { useState, useCallback } from "react";
import axios from "axios";
import ChatPopup from "./chatbot/ChatPopup";
import ChatWindow from "./chatbot/ChatWindow";
import UserInfoForm from "./chatbot/UserInfoForm";
import MessageList from "./chatbot/MessageList";
import MessageInput from "./chatbot/MessageInput";

function ChatBot() {
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
    
    const closeChatPopup = useCallback(() => {
        setShowChatPopup(false);
    }, []);
    
    const toggleChatWindow = useCallback(() => {
        setShowChatWindow(prevState => !prevState);
        setShowChatPopup(false);
    }, []);
    
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
            // Create a guest user or get temporary token
            const response = await axios.post('http://localhost:5000/api/chatbot/guest', userInfo);
            
            // Store the guest token in localStorage
            localStorage.setItem('guestToken', response.data.token);
            
            // Add system message confirming form submission
            setMessages(prev => [...prev, {
                type: 'bot',
                content: `Thanks ${userInfo.name}! How can I help you today?`
            }]);
            
            setFormSubmitted(true);
        } catch (error) {
            console.error('Error submitting user info:', error);
            setMessages(prev => [...prev, {
                type: 'bot',
                content: 'Sorry, there was an error processing your information. Please try again.'
            }]);
        }
    }, [userInfo]);
    
    const sendMessage = useCallback(async () => {
        if (!userMessage.trim()) return;
        
        // Add user message to chat
        const newMessage = {
            type: 'user',
            content: userMessage
        };
        
        setMessages(prev => [...prev, newMessage]);
        
        // Clear input field
        const messageToSend = userMessage;
        setUserMessage('');
        
        try {
            // Get token from localStorage
            const token = localStorage.getItem('guestToken');
            
            if (!token) {
                throw new Error('No authentication token found');
            }
            
            // Create ticket from chat message
            await axios.post('http://localhost:5000/api/chatbot/guest/ticket', {
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
            
            // Add system response
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
    }, [userMessage, userInfo]);
    
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
            {/* Chatbot Widget */}
            {showChatPopup && (
                <ChatPopup onClose={closeChatPopup} />
            )}
            
            <button 
                className="chat-widget-button" 
                onClick={toggleChatWindow}
                aria-label="Open chat"
            >
                <div className="chat-icon"></div>
            </button>
            
            {showChatWindow && (
                <ChatWindow onClose={toggleChatWindow}>
                    <div className="chat-messages">
                        {!formSubmitted ? (
                            <UserInfoForm 
                                userInfo={userInfo}
                                onChange={handleInputChange}
                                onSubmit={handleSubmit}
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