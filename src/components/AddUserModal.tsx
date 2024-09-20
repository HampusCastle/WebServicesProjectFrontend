import React, { useState } from 'react';
import { NewUser } from '../types/User';
import { saveUser } from '../api/ApiServices';

interface AddUserModalProps {
  closeModal: () => void;
  refreshUsers: () => void;
}

const AddUserModal: React.FC<AddUserModalProps> = ({ closeModal, refreshUsers }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const newUser: NewUser = { name, email, phone, address, username, password };
      await saveUser(newUser);
      closeModal();
      refreshUsers();
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <form onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold mb-4">Add User</h2>
          {/* Form fields */}
          <label className="block mb-2">
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
            />
          </label>
          <label className="block mb-2">
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
            />
          </label>
          <label className="block mb-2">
            Phone:
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
            />
          </label>
          <label className="block mb-2">
            Address:
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
            />
          </label>
          <label className="block mb-2">
            Username:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
            />
          </label>
          <label className="block mb-4">
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
            />
          </label>
          <div className="flex justify-end space-x-2">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Add User
            </button>
            <button
              type="button"
              onClick={closeModal}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUserModal;