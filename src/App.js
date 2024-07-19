import React, { useState, useEffect } from 'react';
import ChatbotSettings from './components/ChatbotSettings';
import Chatbot from './components/Chatbot';
import { getChatbotSettings } from './services/api';
import './App.css';


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


