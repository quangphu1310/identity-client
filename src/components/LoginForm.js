import React, { useState } from 'react';
import { login } from '../services/authService';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [form, setForm] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(form);
    if (result.success) {
      setMessage('Đăng nhập thành công!');
      navigate('/home');
    } else {
      setMessage('Đăng nhập thất bại: ' + result.message);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center">Đăng nhập</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">Tên người dùng</label>
                  <input
                    name="username"
                    type="email"
                    id="username"
                    className="form-control"
                    onChange={handleChange}
                    placeholder="example@email.com"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Mật khẩu</label>
                  <input
                    name="password"
                    type="password"
                    id="password"
                    className="form-control"
                    onChange={handleChange}
                    placeholder="Nhập mật khẩu"
                    required
                  />
                </div>

                <button type="submit" className="btn btn-primary w-100">Đăng nhập</button>
              </form>

              {message && <p className="mt-3 text-center">{message}</p>}

              <div className="mt-3 text-center">
                <a href="/register">Chưa có tài khoản? Đăng ký ngay!</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
