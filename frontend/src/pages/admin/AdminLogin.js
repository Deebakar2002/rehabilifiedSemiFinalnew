import React, { useState } from 'react'; 
import api from '../../services/api'; // Import the Axios instance
import { useNavigate } from 'react-router-dom';
import './AdminLogin.css'; // Import the CSS file

function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await api.post('/admin/login', { email, password });
      if (response.status === 200) {
        const { token } = response.data;
        localStorage.setItem('adminToken', token);
        navigate('/admin/dashboard');
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          setError('Invalid email or password. Please try again.');
        } else if (error.response.status === 400) {
          setError('Bad request. Please check your input.');
        } else {
          setError('Server error. Please try again later.');
        }
      } else if (error.request) {
        setError('Network error. Please check your internet connection.');
      } else {
        setError('Unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login__container">
      {/* Left-side image */}
      <div className="admin-login__image-container">
        <img src="/images/login.png" alt="Login Illustration" className="admin-login__image" />
      </div>

      {/* Right-side login form */}
      <div className="admin-login__form-container">
        <div className="admin-login__logo-container">
          <img src="/images/logo/11.png" alt="Rehabilified Logo" className="admin-login__logo" />
          <h1 className="admin-login__heading">Rehabilified</h1>
        </div>

        <form onSubmit={handleSubmit}>
          <h2 className="admin-login__form-title">Admin Login</h2>
          {error && <p className="admin-login__error-message">{error}</p>}
          <div className="admin-login__input-group">
            <label className="admin-login__input-label">Email</label>
            <input
              type="email"
              className="admin-login__input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="admin-login__input-group">
            <label className="admin-login__input-label">Password</label>
            <input
              type="password"
              className="admin-login__input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="admin-login__btn" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
          <div className="admin-login__forgot-password-container">
            <a href="/forgot-password" className="admin-login__forgot-password-link">
              Forgot Password?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
