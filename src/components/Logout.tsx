import React from 'react';

const Logout: React.FC = () => {
  const handleLogout = async () => {
    try {
      await fetch('https://localhost:8443/logout', {
        method: 'POST',
        credentials: 'include', 
      });
      window.location.href = '/login'; 
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default Logout;