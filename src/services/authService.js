import axios from 'axios';

const API_URL = 'https://localhost:7243/api/auth';

export const login = async ({ username, password }) => {
  try {
    const res = await axios.post(`${API_URL}/login`, { username, password }, {
      withCredentials: true,
    });
    
    return { success: true };
  } catch (err) {
    return {
      success: false,
      message: err.response?.data?.errors?.[0] || 'Lỗi đăng nhập',
    };
  }
};

export const refreshToken = async () => {
    try {
      const res = await axios.post(`${API_URL}/refresh`, {}, {
        withCredentials: true,
      });
  
      return res.data.result.accessToken;
    } catch (err) {
      console.error('Lỗi làm mới token', err);
      return null;
    }
  };
  
axios.interceptors.response.use(
  response => response,
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const newAccessToken = await refreshToken();
      
      if (newAccessToken) {
        
        console.log(newAccessToken)
        axios.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return axios(originalRequest);
      }
    }
    
    return Promise.reject(error);
  }
);
