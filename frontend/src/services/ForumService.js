import axios from 'axios';
axios.interceptors.request.use((config)=>{
    const token=localStorage.getItem("token");
    if(token){
      config.headers['authorization']=`Bearer ${token}`;
    }
    return config;
  });
const api = axios.create({
  baseURL: 'http://localhost:3000/api',
});

export const createForum = async (title, createdBy) => {
  try {
    const response = await api.post('/forums/create', { title, createdBy });
    return response.data;
  } catch (error) {
    console.error('Error creating forum:', error);
    throw error;
  }
};
export const getForumChats = async (forumId) => {
    try {
      const response = await api.get(`/forums/${forumId}/chats`);
      return response.data;
    } catch (error) {
      console.error('Error fetching forum chats:', error);
      throw error;
    }
  };
  export const searchForum = async (title) => {
    try {
      const response = await api.get('/forums/search', {
        params: { title },
      });
      return response.data;
    } catch (error) {
      console.error('Error searching for forums:', error);
      throw error;
    }
  };
  