import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './Components/Admin/Sidebar';
import Home from './Pages/Admin/Home';
import Login from './Pages/Admin/Login';
import Secure from './Pages/Admin/Secure'; // Import the Secure component
import Adduser from './Pages/Admin/Adduser';
import Edituser from './Pages/Admin/Edituser';
import UserHome from './Pages/users/Home';
import UserSidebar from './Pages/users/Sidebar'; // Correct the import capitalization
import UserLogin from './Pages/users/Login'; // Import the new UserLogin component
import UserSecure from './Pages/users/UserSecure'; // Import the new UserSecure component

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Admin Routes */}
        <Route path="/admin-login" element={<Login />} />

        <Route element={<Secure />}> {/* Use Secure component to wrap protected routes */}
          <Route 
            path="/admin/*" // Use /admin/* for admin routes
            element={
              <div className="d-flex" style={{ height: '100vh' }}>
                <Sidebar />
                <div className="flex-grow-1">
                  <Routes>
                    <Route path="home" element={<Home />} />
                    <Route path="add-user" element={<Adduser />} />
                    <Route path="edit-user/:id" element={<Edituser />} />
                    {/* Add other admin routes here */}
                  </Routes>
                </div>
              </div>
            } 
          />
        </Route>

        {/* User Routes */}
        <Route path="/user-login" element={<UserLogin />} /> {/* Add user login route */}

        <Route element={<UserSecure />}> 
          <Route 
            path="/*" // Use /* for user routes
            element={
              <div className="d-flex" style={{ height: '100vh' }}>
                <UserSidebar />
                <div className="flex-grow-1">
                  <Routes>
                    <Route path="/" element={<UserHome />} />
                     
                  </Routes>
                </div>
              </div>
            } 
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
