import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  updateField,
  resetAuthState,
  loginSuccess,
} from '../features/login/authSlice';
import LoginLogo from '../images/login-page.jpg';
import axios from 'axios';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { email, password } = useSelector((state) => state.Auth);

  const handleChange = (event) => {
    const { name, value } = event.target;
    dispatch(updateField({ name: name, value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    axios({
      method: 'POST',
      url: 'https://api.aaserzypher.dev/life-organized/login',
      data: {
        email,
        password,
      },
    })
      .then((response) => {
        const userData = response.data;
        dispatch(loginSuccess(userData));
        navigate('/task_page');
      })
      .catch((error) => {
        console.log(error);
        dispatch(resetAuthState());
      });
  };

  const handlePressReturn = (event) => {
    if (event.key === 'Enter') {
      handleSubmit(event);
    }
  };

  return (
    <div className="login-page-wrapper">
      <div
        className="login-logo"
        style={{
          background: 'url(' + LoginLogo + ') no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          border: 'transparent 5px',
          borderRadius: '5px',
        }}
      ></div>
      <div className="login-form">
        <h3 className="login-heading">Login to your account</h3>
        <input
          type="email"
          onChange={handleChange}
          name="email"
          placeholder="Email Address"
          value={email}
          autoComplete="email"
        />
        <input
          type="password"
          onChange={handleChange}
          name="password"
          placeholder="Password"
          value={password}
          autoComplete="new-password"
          onKeyDown={handlePressReturn}
        />
        <button onClick={handleSubmit} className="login-btn">
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
