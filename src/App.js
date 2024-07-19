import React, { useState, useEffect } from 'react';
import ChatbotSettings from './components/ChatbotSettings';
import Chatbot from './components/Chatbot';
import EmbedCode from './components/EmbedCode';
import { getChatbotSettings } from './services/api';
import './App.css';

// const App = () => {
//     const [settings, setSettings] = useState({
//       main_color: '#6fd6ed',
//       send_message_color: '#6fd6ed',
//       received_message_color: '#ffffff',
//       background_color: '#ffffff',
//       send_message_text_color: '#ffffff',
//       received_message_text_color: '#4b5563',
//       launcher_icon: null,
//       assistant_image: null,
//       assistant_avatar: null,
//       send_icon: null,
//     });


//   useEffect(() => {
//     getSettings().then(response => setSettings(response.data[0]));
//   }, []);

//   return (
//     <div className="app-container">
//       <ChatbotSettings settings={settings} setSettings={setSettings} />
//       <Chatbot settings={settings} />
//       {/* <EmbedCode settings={settings} /> */}
//     </div>
//   );
// };

// export default App;

const App = () => {
    const [settings, setSettings] = useState({});

    useEffect(() => {
        const fetchSettings = async () => {
            const response = await getChatbotSettings();
            setSettings(response.data);
        };

        fetchSettings();
    }, []);

    return (
        <div className="app-container">
            <ChatbotSettings settings={settings} setSettings={setSettings} />
            <Chatbot settings={settings} />
        </div>
    );
};

export default App;


