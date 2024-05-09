import React from 'react';
import { NavLink } from 'react-router-dom';
import ToDoLogo from '../images/to-do-logo.jpeg';

function HomePage() {
  return (
    <div className="home-wrapper">
      <div
        className="block block1"
        style={{
          background: 'url(' + ToDoLogo + ') no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      ></div>
      <div className="block block2">
        <span className="material-symbols-outlined">fact_check</span>
        <p>
          A TO-DO list app, simplified! <br /> <br /> Life, Organized is meant
          to be just that - a life organizer.
        </p>
      </div>
      <div className="block block3">
        <p>
          Easy to manage task list with the ability to categorize tasks based on
          urgency.
        </p>
        <ul>
          <li>Add your tasks as you go, they are ready to be sorted,</li>
          <li>Sort your tasks between Critical, Priority and Routine</li>
          <li>
            Mark the tasks complete as you finish them, keep track of your
            accomplishments!
          </li>
        </ul>
      </div>
      <div className="block block4">
        <p>Get started with Life, Organized today!</p>
        <NavLink to="/register" className={'register-btn'}>
          Create Account
        </NavLink>
        <p>Already have an account?</p>
        <NavLink to="/login" className={'login-btn'}>
          Login
        </NavLink>
      </div>
    </div>
  );
}

export default HomePage;
