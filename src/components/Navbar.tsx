import React from 'react';

interface NavbarProps {
  onAddUser: () => void;
  onFetchMoreUsers: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onAddUser, onFetchMoreUsers }) => {
  return (
    <div className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <button onClick={onAddUser} className="bg-blue-500 px-4 py-2 rounded">Add User</button>
      <button onClick={onFetchMoreUsers} className="bg-green-500 px-4 py-2 rounded">Fetch More Users</button>
    </div>
  );
};

export default Navbar;