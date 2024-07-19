import React, { useState } from 'react';

const EmbedCode = ({ settings }) => {
  const [embedCode, setEmbedCode] = useState('');

  const generateEmbedCode = () => {
    const script = `
      <div id="chatbot-root"></div>
      <script>
        (function() {
          var chatbot = document.createElement('script');
          chatbot.type = 'text/javascript';
          chatbot.async = true;
          chatbot.src = 'https://your-domain.com/chatbot.js';
          chatbot.onload = function() {
            window.initializeChatbot({
              main_color: '${settings.main_color}',
              send_message_color: '${settings.send_message_color}',
              received_message_color: '${settings.received_message_color}',
              background_color: '${settings.background_color}',
              send_message_text_color: '${settings.send_message_text_color}',
              received_message_text_color: '${settings.received_message_text_color}',
            });
          };
          var s = document.getElementsByTagName('script')[0];
          s.parentNode.insertBefore(chatbot, s);
        })();
      </script>
    `;
    setEmbedCode(script);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-xl mb-6">
      <h2 className="text-2xl font-bold mb-4">Embed Code</h2>
      <button
        onClick={generateEmbedCode}
        className="bg-blue-500 text-white rounded p-2 w-full mb-4"
      >
        Generate Embed Code
      </button>
      {embedCode && (
        <textarea
          readOnly
          value={embedCode}
          rows="10"
          className="border rounded p-2 w-full"
        />
      )}
    </div>
  );
};

export default EmbedCode;
