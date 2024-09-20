import React, { useEffect, useState, useCallback } from 'react';
import { User } from '../types/User'; 
import Navbar from './Navbar';
import AddUserModal from './AddUserModal';
import { getUsers, deleteUser } from '../api/ApiServices';

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const loadUsers = useCallback(async (page: number) => {
    try {
      setLoading(true);
      const data = await getUsers(page);
      setUsers(data.content || []);
      setTotalPages(data.totalPages || 0);
    } catch (err) {
      setError('Error fetching users');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUsers(currentPage);
  }, [currentPage, loadUsers]);

  const handleDelete = async (userId: string) => {
    try {
      await deleteUser(userId);
      setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
      setError('Error deleting user');
    }
  };

  const handlePageChange = (page: number) => {
    if (page >= 0 && page < totalPages) {
      setCurrentPage(page);
    }
  };

  const handleFetchMoreUsers = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  const handleAddUser = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const refreshUsers = async () => {
    await loadUsers(currentPage);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <Navbar 
        onAddUser={handleAddUser} 
        onFetchMoreUsers={handleFetchMoreUsers} 
      />
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">User List</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {users.map(user => (
            <div key={user.id} className="bg-white p-4 rounded-lg shadow-md">
              <img
                src={user.photoUrl || 'https://via.placeholder.com/150'}
                alt={user.name}
                className="w-full h-32 object-cover rounded-md mb-4"
              />
              <h2 className="text-xl font-semibold mb-2">{user.name}</h2>
              <p className="text-gray-600">Username: {user.username}</p>
              <p className="text-gray-600">Role: {user.role}</p>
              <button onClick={() => handleDelete(user.id)} className="text-red-500">Delete</button>
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-between">
          <button 
            onClick={() => handlePageChange(currentPage - 1)} 
            disabled={currentPage === 0}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Previous
          </button>
          <span>Page {currentPage + 1} of {totalPages}</span>
          <button 
            onClick={() => handlePageChange(currentPage + 1)} 
            disabled={currentPage >= totalPages - 1}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Next
          </button>
        </div>
      </div>
      {modalOpen && <AddUserModal closeModal={closeModal} refreshUsers={refreshUsers} />}
    </div>
  );
};

export default UserList;