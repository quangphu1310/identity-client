import React, { useState } from 'react';
import { register } from '../services/authService';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState([]);
  const [successMsg, setSuccessMsg] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setErrors([]);
    setSuccessMsg('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await register(formData);

    if (res.success) {
      setSuccessMsg('Tài khoản đã được tạo thành công!');
      setFormData({ username: '', password: '', confirmPassword: '' });

      setTimeout(() => navigate('/'), 2000);
    } else {
      setErrors(res.message);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '500px' }}>
      <h2 className="mb-4 text-center">Đăng ký tài khoản</h2>

      {successMsg && (
        <div className="alert alert-success" role="alert">
          {successMsg}
        </div>
      )}

      {errors.length > 0 && (
        <div className="alert alert-danger" role="alert">
          <ul className="mb-0">
            {errors.map((err, index) => (
              <li key={index}>{err}</li>
            ))}
          </ul>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="example@email.com"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Mật khẩu</label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Ít nhất 6 ký tự, có số, chữ in hoa và ký tự đặc biệt"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Xác nhận mật khẩu</label>
          <input
            type="password"
            className="form-control"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Nhập lại mật khẩu"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Đăng ký
        </button>


        <div className="mt-3 text-center">
          <a href="/">Đã có tài khoản? Đăng nhập ngay!</a>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
