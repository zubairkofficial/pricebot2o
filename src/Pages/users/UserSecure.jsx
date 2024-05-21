import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const Secure = () => {
//   const token = localStorage.getItem('accessToken');
  const userEmail = localStorage.getItem('userEmail');
  const userName = localStorage.getItem('userName');

  // Check if all necessary user data is present in local storage
  const isAuthenticated =  userEmail && userName;

  return isAuthenticated ? <Outlet /> : <Navigate to="/user-login" />;
};

export default Secure;
