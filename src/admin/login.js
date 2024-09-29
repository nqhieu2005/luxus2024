import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './login.css';


function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Tên người dùng và mật khẩu mặc định
  const defaultUsername = 'admin';
  const defaultPassword = 'tiendat123@LUXUS';

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);

    // Kiểm tra thông tin đăng nhập
    if (username === defaultUsername && password === defaultPassword) {
      sessionStorage.setItem('isLoggedIn', 'true');
      
      toast.success('Đăng nhập thành công!');
      console.log("success");
      
      setTimeout(() => {
        navigate('/admin/home');
      }, 1000);  
    } else {
      toast.error('Sai tài khoản hoặc mật khẩu.');
    }

    setLoading(false);
};


  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div className="form-group mb-3">
          <label className='login-form2'>Username</label>
          <input
            type='text'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <div className="form-group mb-3">
          <label className='login-form2'>Password</label>
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <button className="btn btn-primary" type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Login;
