// src/services/api.js
// import axios from 'axios';

// const API = axios.create({ baseURL: 'http://localhost:8000/api/' });

// export const getSettings = () => API.get('settings/');
// export const updateSettings = (id, data) => API.put(`settings/${id}/`, data);
// export const getInteractions = () => API.get('interactions/');
// export const createInteraction = (data) => API.post('interactions/', data);

// import axios from 'axios';

// const API_URL = 'http://localhost:8000/api';  // Update with your API base URL

// export const createInteraction = async (data) => {
//   return await axios.post(`${API_URL}/interactions/`, data);
// };

// export const getInteractions = async () => {
//   return await axios.get(`${API_URL}/interactions/`);
// };

import axios from 'axios';

const API_URL = 'http://localhost:8000/api';  

export const createInteraction = async (data) => {
    try {
      const response = await axios.post(`${API_URL}/chat-interactions/`, data);
      return response;
    } catch (error) {
      console.error('Error creating interaction:', error.response ? error.response.data : error.message);
      throw error;
    }
  };
  
  export const getInteractions = async () => {
    try {
      const response = await axios.get(`${API_URL}/chat-interactions/`);
      return response;
    } catch (error) {
      console.error('Error fetching interactions:', error.response ? error.response.data : error.message);
      throw error;
    }
  };

export const getChatbotSettings = async () => {
  return await axios.get(`${API_URL}/chatbot-settings/`);
};

export const updateChatbotSettings = async (data) => {
    const formData = new FormData();
    for (const key in data) {
      if (data[key]) {
        if (data[key] instanceof File) {
          formData.append(key, data[key]);
        } else {
          formData.append(key, data[key]);
        }
      }
    }
  
    try {
      const response = await axios.put(`${API_URL}/chatbot-settings/`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return response.data;
    } catch (error) {
      console.error('Failed to update chatbot settings:', error);
      throw error;
    }
  };
