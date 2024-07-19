import React from 'react';
import '../styles/ChatbotSettings.css'; 
import {  updateChatbotSettings } from '../services/api';



const ChatbotSettings = ({ settings, setSettings }) => {

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setSettings({ ...settings, [name]: files[0] });
    } else {
      setSettings({ ...settings, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateChatbotSettings(settings);
      alert('Settings updated successfully');
    } catch (error) {
      console.error('Error updating settings:', error);
      alert('Failed to update settings');
    }
  };

  const renderColorInput = (label, name, value) => (
    <div className="col-span-1 field">
      <label>{label}</label>
      <div className="flex items-center input-group">
        <input
          type="text"
          name={name}
          value={value}
          onChange={handleChange}
          className="border rounded p-2 w-full color-input"
        />
        <input
          type="color"
          name={name}
          value={value}
          onChange={handleChange}
          className="border rounded p-2 rounded-full color-picker"
        />
      </div>
    </div>
  );

  const renderFileInput = (label, name) => (
  <div className="col-span-1 flex items-center field">
    <div className="image-preview mr-4">
      {settings[name] && (settings[name] instanceof File ? (
        <img src={URL.createObjectURL(settings[name])} alt={label} className="w-full h-full object-cover rounded" />
      ) : (
        <img src={settings[name]} alt={label} className="w-full h-full object-cover rounded" />
      ))}
    </div>
    <div className="flex-grow">
      <label className="block mb-2">{label}</label>
      <input
        type="file"
        name={name}
        id={name}
        onChange={handleChange}
        className="hidden"
      />
      <label
        htmlFor={name}
        className="inline-block cursor-pointer px-4 py-2 bg-slate-200 text-black rounded-lg w-32"
      >
        Choose File
      </label>
    </div>
  </div>
);
  

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-xl mb-6 appearance-container">
      <div className='flex flex-row items-center	'>
        <div>
        <img src={require('../assets/Appearance.jpeg')} className='h-20 w-20' />
        </div>
        <div>
        <h2 className="text-2xl font-bold mb-2">Appearance</h2>
        <p className="appearance-subtitle mb-2">Customize the look and feel of your chat widget</p>
        </div>
      </div>
      <hr />
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        {renderColorInput("Main Color", "main_color", settings.main_color)}
        {renderColorInput("Send Message Color", "send_message_color", settings.send_message_color)}
        {renderColorInput("Received Message Color", "received_message_color", settings.received_message_color)}
        {renderColorInput("Background Color", "background_color", settings.background_color)}
        {renderColorInput("Send Message Text Color", "send_message_text_color", settings.send_message_text_color)}
        {renderColorInput("Received Message Text Color", "received_message_text_color", settings.received_message_text_color)}
        {renderFileInput("Launcher Icon", "launcher_icon")}
        {renderFileInput("Assistant Image", "assistant_image")}
        {renderFileInput("Assistant Avatar", "assistant_avatar")}
        {renderFileInput("Send Icon", "send_icon")}
        <div className="col-span-2">
          <button type="submit" className="bg-blue-500 text-white rounded p-2 w-full">
            Save Settings
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatbotSettings;
