import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

import './styles/app.scss';

import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import TaskPage from './pages/Taskpage';

function App() {
  const isAuthenticated = useSelector((state) => state.Auth.isAuthenticated);
  return (
    <div className="app-container">
      <BrowserRouter>
        <div className="app">
          <Navbar />
          <Routes>
            <Route exact path={'/'} element={<HomePage />} />
            <Route path={'/about'} element={<AboutPage />} />
            <Route path={'/login'} element={<LoginPage />} />
            <Route path={'/register'} element={<RegisterPage />} />
            {isAuthenticated ? (
              <Route path={'/task_page'} element={<TaskPage />} />
            ) : null}
            <Route element={<HomePage />} />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
