import React, { useState, useEffect } from 'react';
import { getSettings, updateSettings } from '../services/api';

const Customization = () => {
    const [settings, setSettings] = useState(null); // Initialize as null
    const [error, setError] = useState('');

    useEffect(() => {
        getSettings().then(response => {
            console.log('API response:', response);
            setSettings(response.data[0]);
        }).catch(error => {
            setError('Failed to fetch settings');
            console.error('API error:', error);
        });
    }, []);

    const handleChange = (e) => {
        setSettings({ ...settings, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateSettings(settings).then(() => {
            alert('Settings updated!');
        }).catch(error => {
            setError('Failed to update settings');
            console.error('API error:', error);
        });
    };

    const fetchSnippet = () => {
        fetch('http://localhost:8000/api/snippet/')
            .then(response => response.json())
            .then(data => {
                const textarea = document.createElement('textarea');
                textarea.value = data.snippet;
                document.body.appendChild(textarea);
                textarea.select();
                document.execCommand('copy');
                document.body.removeChild(textarea);
                alert('Snippet copied to clipboard!');
            })
            .catch(error => {
                setError('Failed to fetch embed code');
                console.error('API error:', error);
            });
    };

    if (!settings) {
        return <div>Loading...</div>; // Show loading message while settings are being fetched
    }

    return (
        <div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <label>Main Color:</label>
                <input type="color" name="main_color" value={settings.main_color} onChange={handleChange} />
                <label>Send Message Color:</label>
                <input type="color" name="send_message_color" value={settings.send_message_color} onChange={handleChange} />
                <label>Received Message Color:</label>
                <input type="color" name="received_message_color" value={settings.received_message_color} onChange={handleChange} />
                <label>Background Color:</label>
                <input type="color" name="background_color" value={settings.background_color} onChange={handleChange} />
                <label>Send Message Text Color:</label>
                <input type="color" name="send_message_text_color" value={settings.send_message_text_color} onChange={handleChange} />
                <label>Received Message Text Color:</label>
                <input type="color" name="received_message_text_color" value={settings.received_message_text_color} onChange={handleChange} />
                <button type="submit">Save Settings</button>
            </form>
            <button onClick={fetchSnippet}>Copy Embed Code</button>
        </div>
    );
};

export default Customization;
