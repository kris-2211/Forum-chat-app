import axios from 'axios';

// Create an Axios instance
const api = axios.create({
  baseURL: 'http://localhost:3000/api', // Your base URL
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; // Ensure the header is set correctly
    }
    return config;
  },
  (error) => {
    // Handle request errors
    return Promise.reject(error);
  }
);

export const createChat = async (user, other) => {
  try {
    const response = await api.post('/chats/create-chat', { user, other }); // Removed extra /api
    console.log("chat create");
  
    return response.data; // Should return the ApiResponse object
  } catch (error) {
    console.error('Error creating chat:', error);
    throw error;
  }
};

export const getChatOfUser = async (chatId) => {
  try {
    const response = await api.get(`/chats/${chatId}`); // Removed extra /api
    return response.data; // Should return the ApiResponse object with chat data
  } catch (error) {
    console.error('Error fetching chat:', error);
    throw error;
  }
};

export const searchUser = async (username) => {
  try {
    const response = await api.get('/chats/search', {
      params: { username }, // Pass username as query parameter
    });
    console.log("Users found:", response.data.data);
    return response.data; // Assumes the API returns an array of users or chats matching the username
  } catch (error) {
    console.error("Error searching for users:", error);
    throw error;
  }
};
