import axios from 'axios';
import Cookies from 'js-cookie';
const API_URL = 'https://localhost:7243/api/test';

export const fetchProtectedData = async () => {
    const token = Cookies.get('accessToken');
    console.log(token)
    if (!token) {
      return { success: false, message: 'Vui lòng đăng nhập.' };
    }
  
    try {
      const response = await axios.get(API_URL, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
  
      return { success: true, data: response.data };
    } catch (err) {
      return { success: false, message: 'Lỗi khi gọi API bảo vệ' };
    }
  };