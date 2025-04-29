import { useState } from 'react';

export const useReplyMessage = (ticket, onSuccess) => {
  const [replyMessage, setReplyMessage] = useState('');
  const [isSending, setIsSending] = useState(false);

  const handleReplyChange = (e) => {
    setReplyMessage(e.target.value);
  };

  const handleSendReply = async () => {
    if (!replyMessage.trim() || !ticket) return;
    
    setIsSending(true);
    
    try {
      // Use the callback from the parent component instead of direct API call
      const success = await onSuccess(replyMessage);
      
      if (success) {
        // Clear the input field after successful send
        setReplyMessage('');
      }
    } catch (error) {
      console.error('Failed to send reply:', error);
    } finally {
      setIsSending(false);
    }
  };

  return {
    replyMessage,
    isSending,
    handleReplyChange,
    handleSendReply
  };
};