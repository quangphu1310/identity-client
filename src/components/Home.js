import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Test from './Test';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

const Home = () => {
    const [username, setUsername] = useState('');

    useEffect(() => {
      const accessToken = Cookies.get('accessToken');
      
      if (accessToken) {
        try {
          const decodedToken = jwtDecode(accessToken);
          const uniqueName = decodedToken.unique_name;
          setUsername(uniqueName);
        } catch (error) {
          console.error('Lỗi giải mã token:', error);
        }
      }
    }, []);

    const navigate = useNavigate();

    const handleLogout = async () => {
      try {
        const response = await axios.post('https://localhost:7243/api/auth/logout', {}, {
          withCredentials: true,
        });
        // console.log('Logout thành công', response);
        navigate('/');
      } catch (error) {
        console.error('Lỗi đăng xuất:', error);
      }
    };

    return (
      <div className="container mt-5">
        <h1 className="mb-4 text-center">Welcome to the Home Page!</h1>
        <p className="text-center">This is a simple home page component.</p>

        {username ? (
          <div className="text-center">
            <h2 className="text-success">Welcome, {username}!</h2>
            <button 
              onClick={handleLogout} 
              className="btn btn-outline-primary m-3"
            >
              Logout
            </button>
          </div>
        ) : (
          <p className="text-center mt-4">Please log in to see your profile.</p>
        )}

        <Test /> 
      </div>
    );
}

export default Home;
