import React from 'react';

function Home() {
  const userName = localStorage.getItem('userName');
  const userEmail = localStorage.getItem('userEmail');

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ textAlign: 'center' }}>
        <h1>Welcome, {userName}!</h1>
        <p>Email: {userEmail}</p>
      </div>
    </div>
  );
}

export default Home;
