import React, { useState, useEffect } from 'react';
import { createInteraction, getInteractions } from '../services/api';
import '../styles/Chatbot.css'; // Ensure you have this CSS file

const Chatbot = ({ settings }) => {

  const effectiveSettings = { ...settings };

  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchChatHistory = async () => {
      const response = await getInteractions();
      setChat(response.data);
    };

    fetchChatHistory();
  }, []);

  const handleSend = async () => {
    try {
      const response = await createInteraction({ user_message: message });
      setChat([...chat, { user_message: message, bot_response: response.data.bot_response, timestamp: new Date() }]);
      setMessage('');
    } catch (error) {
      console.error('Failed to send message:', error.message);
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const getObjectURL = (fileOrURL) => {
    if (fileOrURL instanceof File) {
      return URL.createObjectURL(fileOrURL);
    }
    return fileOrURL;
  };

  const chatStyle = {
    backgroundColor: effectiveSettings.background_color,
    color: effectiveSettings.received_message_text_color,
    padding: '10px',
    borderRadius: '10px',
    maxWidth: '100%',
    height: '300px', // Fixed height for chat area
    overflowY: 'auto', // Enable scrolling
    overflowX: 'hidden', // Hide horizontal scrollbar
  };

  const userMessageContainerStyle = {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    marginBottom: '10px',
    position: 'relative',
  };

  const assistantMessageContainerStyle = {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    marginBottom: '10px',
    position: 'relative',
  };

  const userMessageStyle = {
    backgroundColor: effectiveSettings.send_message_color,
    color: effectiveSettings.send_message_text_color,
    padding: '10px',
    borderRadius: '10px',
    display: 'inline-block',
    maxWidth: '70%',
    wordBreak: 'break-word',
    marginRight: '50px', // Space for the user image
  };

  const botResponseStyle = {
    backgroundColor: effectiveSettings.received_message_color,
    color: effectiveSettings.received_message_text_color,
    padding: '10px',
    borderRadius: '10px',
    display: 'inline-block',
    maxWidth: '70%',
    wordBreak: 'break-word',
    marginLeft: '50px', // Space for the assistant image
  };

  const userImageStyle = {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    position: 'absolute',
    right: '0',
    bottom: '0',
  };

  const sendImageStyle = {
    width: '30px',
    height: '30px',
    borderRadius: '50%',
  };

  const assistantImageStyle = {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    position: 'absolute',
    left: '0',
    bottom: '0',
  };

  const titleBarStyle = {
    backgroundColor: effectiveSettings.main_color,
    color: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    padding: '10px',
    borderRadius: '10px 10px 0 0', // Round the top corners
  };

  const titleStyle = {
    marginLeft: '10px',
    fontWeight: 'bold',
    fontSize: '18px',
  };

  return (
    <div className="chatbot-container">
      <button className="launcher" onClick={toggleChat} style={{ backgroundColor: effectiveSettings.main_color }}>
      {effectiveSettings.launcher_icon && <img src={getObjectURL(effectiveSettings.launcher_icon)} alt="launcher" />}
      {!effectiveSettings.launcher_icon && 'Chat'}
      </button>
      {isOpen && (
        <div className="chatbot bg-white p-6 rounded-lg shadow-md">
          <div className="title-bar" style={titleBarStyle}>
            {effectiveSettings.assistant_image && (
              <img src={getObjectURL(effectiveSettings.assistant_image)} alt="assistant" style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
            )}
            <div style={titleStyle}>Blind Assistant Version 2</div>
          </div>
          <div className="chat" style={chatStyle}>
          <div className="flex justify-center items-center mb-4">
              {effectiveSettings.assistant_image && (
                <div className="flex flex-col items-center">
              <img src={getObjectURL(effectiveSettings.assistant_image)} alt="assistant" style={{ width: '80px', height: '80px', borderRadius: '50%' }} />
              <div>
                    <h2 className="text-xl font-bold mb-1 text-center">Blind Assistant Version 2</h2>
                    <p className='text-center'>This is an AI assistant to help the blind person navigate in the surrounding environment.</p>
                  </div>
                </div>
              )}
            </div>
            {chat.map((c, index) => (
              <div key={index} className="mb-2">
                {c.user_message ? (
                  <div style={userMessageContainerStyle}>
                    <div style={userMessageStyle}>{c.user_message}</div>
                    {effectiveSettings.send_icon && <img src={getObjectURL(effectiveSettings.send_icon)} alt="send icon" style={userImageStyle} />}
                  </div>
                ) : (
                  <div style={assistantMessageContainerStyle}>
                    {effectiveSettings.assistant_avatar && <img src={getObjectURL(effectiveSettings.assistant_avatar)} alt="assistant avatar" style={assistantImageStyle} />}
                    <div style={botResponseStyle}>{c.bot_response}</div>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="chat-input-container">
          <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message here..."
              className="chat-input"
            />
            <button onClick={handleSend} className="send-button" style={{ backgroundColor: effectiveSettings.send_message_color }}>
              {effectiveSettings.send_icon ? <img src={getObjectURL(effectiveSettings.send_icon)} alt="send icon" style={sendImageStyle}/> : 'Send'}
            </button>
            </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
