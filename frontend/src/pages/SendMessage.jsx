import React from 'react';
import axios from 'axios';

const SendMessage = () => {
  const handleSendMessage = async () => {
    try {
      const response = await axios.post('http://localhost:5000/send-message');
      console.log('Message sent! SID:', response.data.sid);
    } catch (error) {
      // console.log('Things went wrong.');
      console.error('Error sending message:', error.response.data.error);
    }
  };

  return (
    <div>
      <button onClick={handleSendMessage}>Send Message</button>
    </div>
  );
};

export default SendMessage;
