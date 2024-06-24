import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { resetAuthState } from '../features/login/authSlice';
import axios from 'axios';

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, firstname, lastname } = useSelector(
    (state) => state.Auth
  );

  const handleLogoutClick = () => {
    axios({
      method: 'POST',
      url: 'https://131.93.98.37:5000/logout',
    })
      .then((response) => {
        if (response.status === 200) {
          navigate('/');
          dispatch(resetAuthState());
        } else console.error('Logout failed:', response.statusText);
      })
      .catch((error) => {
        console.error('Logout failed:', error);
      });
  };

  // const handleEditUserClick = () => {
  //   axios({
  //     method: 'POST',
  //     url: 'https://131.93.98.37:5000/logout',
  //   })
  //     .then((response) => {
  //       if (response.status === 200) {
  //         navigate('/');
  //         dispatch(resetAuthState());
  //       } else console.error('Logout failed:', response.statusText);
  //     })
  //     .catch((error) => {
  //       console.error('Logout failed:', error);
  //     });
  // };

  return (
    <div className="navbar-container">
      <section className="navbar-left">
        <span className="material-symbols-outlined">checklist</span>
        <h3>Life, Organized</h3>
      </section>
      <section className="navbar-middle">
        <NavLink to="/">Home</NavLink>

        <NavLink to="/about">About</NavLink>
        {isAuthenticated ? <NavLink to="/task_page">Tasks</NavLink> : null}
      </section>
      <section className="navbar-right">
        {isAuthenticated ? (
          <div className="authed-user">
            <div className="welcome-text">
              {`Welcome  ${firstname} ${lastname}!`}
            </div>
            <div className="action-btns">
              <button className="logout-btn" onClick={handleLogoutClick}>
                <span className="material-symbols-outlined">logout</span>
              </button>
              {/* <button className="edit-user-btn" onClick={handleEditUserClick}>
                <span className="material-symbols-outlined">
                  manage_accounts
                </span>
              </button> */}
            </div>
          </div>
        ) : (
          <div className="unauthed-user">
            <div className="welcome-text">Welcome Guest!</div>
            <div className="auth-links">
              <NavLink to="/login" className={'login-btn'}>
                Login
              </NavLink>
              <NavLink to="/register" className={'register-btn'}>
                Register
              </NavLink>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

export default Navbar;
