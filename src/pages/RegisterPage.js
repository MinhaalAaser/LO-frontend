import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  updateField,
  resetAuthState,
  loginSuccess,
} from '../features/login/authSlice';
import RegisterLogo from '../images/register-page.jpg';
import axios from 'axios';

function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { email, pwd, firstname, lastname } = useSelector(
    (state) => state.Auth
  );

  const handleChange = (event) => {
    const { name, value } = event.target;
    dispatch(updateField({ name: name, value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    axios({
      method: 'post',
      url: 'https://api.aaserzypher.dev/life-organized/register',
      data: {
        firstname,
        lastname,
        email,
        pwd,
      },
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    })
      .then((response) => {
        const userData = response.data;
        dispatch(loginSuccess(userData));
        navigate('/task_page');
      })
      .catch((error) => {
        console.log(error);
        alert(error.response.data.message);
        dispatch(resetAuthState());
      });
  };

  const handlePressReturn = (event) => {
    if (event.key === 'Enter') {
      handleSubmit(event);
    }
  };

  return (
    <div className="register-page-wrapper">
      <div
        className="register-logo"
        style={{
          background: 'url(' + RegisterLogo + ') no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          border: 'transparent 5px',
          borderRadius: '1rem',
        }}
      ></div>
      <div className="registration-form">
        <h3 className="registration-heading"> Sign up for a free account!</h3>
        <input
          type="text"
          onChange={handleChange}
          name="firstname"
          placeholder="First Name"
          value={firstname}
          autoComplete="given-name"
        />
        <input
          type="text"
          onChange={handleChange}
          name="lastname"
          placeholder="Last Name"
          value={lastname}
          autoComplete="family-name"
        />
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
          name="pwd"
          placeholder="Password"
          value={pwd}
          autoComplete="new-password"
          onKeyDown={handlePressReturn}
        />
        <button onClick={handleSubmit} className="register-btn">
          Sign up
        </button>
      </div>
    </div>
  );
}

export default RegisterPage;
