import React, { useState } from 'react';
import { FaHome, FaUser, FaCog, FaSignOutAlt, FaBars, FaAngleRight } from 'react-icons/fa';
import { Link, useNavigate, Outlet } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';

const Sidebar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsVisible(!isVisible);
  };

  const handleLogout = () => {
    // Clear the access token from local storage
    localStorage.removeItem('accessToken');
    // Navigate to the login page
    navigate('/admin-login', { state: { successMessage: 'Logout successful' } });
  };

  return (
    <div className="d-flex">
      <div
        className="d-flex flex-column flex-shrink-0 p-3 bg-dark text-light"
        style={{
          width: isVisible ? '280px' : '80px',
          height: '100vh',
          transition: 'width 0.3s',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
        }}
      >
        <Link
          to="/admin/home"
          className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-light text-decoration-none"
          style={{
            fontSize: '1.25rem',
            fontWeight: 'bold',
            justifyContent: isVisible ? 'flex-start' : 'center',
          }}
        >
          <FaHome className="m-1" />
          {isVisible && 'MyApp'}
        </Link>
        <hr style={{ borderColor: '#6c757d' }} />
        <ul className="nav nav-pills flex-column mb-auto">
          <li className="nav-item">
            <Link
              to="/admin/home"
              className="nav-link active"
              aria-current="page"
              style={{
                backgroundColor: '#495057',
                color: '#f8f9fa',
                marginBottom: '5px',
                display: 'flex',
                alignItems: 'center',
                padding: '10px 9px',
                borderRadius: '5px',
                justifyContent: isVisible ? 'space-between' : 'center',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <FaHome className="m-1" />
                {isVisible && 'Heim'}
              </div>
              {isVisible && <FaAngleRight />}
            </Link>
          </li>
          {/* Other navigation items */}
        </ul>
        <div className="mt-auto" style={{ marginLeft: isVisible ? '15px' : '0' }}>
          <Link
            to={'/admin-login'}
            onClick={handleLogout}
            className="nav-link link-light"
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '10px 15px',
              marginLeft: '10px',
              borderRadius: '5px',
              justifyContent: isVisible ? 'space-between' : 'center',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <FaSignOutAlt className="m-1" />
              {isVisible && 'Ausloggen'}
            </div>
            {isVisible && <FaAngleRight />}
          </Link>
        </div>
      </div>
      <div className="flex-grow-1">
        <button
          className="btn btn-secondary m-3"
          onClick={toggleSidebar}
          style={{ position: 'fixed' }}
        >
          <FaBars />
        </button>
        <div className="p-3">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
