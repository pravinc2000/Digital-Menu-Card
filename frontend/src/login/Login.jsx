// src/Login.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // const res = await axios.post('http://localhost:3000/api/auth/login', {
      //   username,
      //   password,
      // });

      // if (res.data.status === 200) {
      //   localStorage.setItem('user', res.data.username);
      //   navigate('/dashboard');
      // }
      let status=200;
      if (status == 200) {
        localStorage.setItem('user', "suresh");
        navigate('/dashboard');
      }

    } catch (error) {
      setErrorMsg('Invalid username or password');
    }
  };

  return (
    <div className="login-wrapper">
      <form onSubmit={handleLogin} className="login-card">
        <div className="login-logo">
          <img src="	https://cdn-icons-png.flaticon.com/512/1046/1046747.png" height={55}  alt="digimenu logo" />
        </div>
        
        <h2 className="text-center mb-4 fw-bold" style={{ fontSize: '20px', fontFamily: 'Poppins, sans-serif', color: '#f57c00' }}>
  Welcome to DigiMenu
</h2>

        <div className="input-group">
          <input
            type="text"
            placeholder="enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <span className="input-icon"><img src="https://cdn-icons-png.flaticon.com/512/1077/1077012.png"	height={20}/></span>
        </div>

        <div className="input-group">
          <input
            type="password"
            placeholder="enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span className="input-icon">🔒</span>
        </div>

        {errorMsg && <p className="error-msg">{errorMsg}</p>}

        <br/>

        <button type="submit" className="login-btn">
          LOG IN ➤
        </button>
      </form>
    </div>
  );
}

export default Login;
