import React, { useState, useEffect, useCallback } from 'react';
import { User } from '../types/User'; 
import UserCard from './UserCard'; 
import { getUsers, deleteUser } from '../api/ApiServices';
import { toast } from 'react-toastify';
import AddUserModal from './AddUserModal';

interface UserListProps {
    users: User[];
    setUsers: (users: User[] | ((prevUsers: User[]) => User[])) => void;
}

const UserList = ({ users, setUsers }: UserListProps) => {
    const [currentPage, setCurrentPage] = useState(0);  
    const [totalPages, setTotalPages] = useState(0);  
    const [loading, setLoading] = useState(true);  
    const [error, setError] = useState<string | null>(null);  
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [userToEdit, setUserToEdit] = useState<User | null>(null);  

    const loadUsers = useCallback(async (page: number) => {
        setLoading(true);  
        try {
            const response = await getUsers(page);  
            setUsers(response.content || []);  
            setTotalPages(response.totalPages || 0);  
        } catch (err) {
            setError('Error loading users');  
            toast.error('Failed to load users');  
        } finally {
            setLoading(false);  
        }
    }, [setUsers]);

    useEffect(() => {
        loadUsers(currentPage);  
    }, [loadUsers, currentPage]);

    const handleDeleteUser = async (userId: string) => {
        try {
            await deleteUser(userId);  
            setUsers((prev) => prev.filter(user => user.id !== userId)); 
            toast.success('User deleted successfully');  
        } catch {
            toast.error('Error deleting user');  
        }
    };

    const handleEditUser = (user: User) => {
        setUserToEdit(user); 
        setEditModalOpen(true); 
    };

    const handlePageChange = (newPage: number) => {
        if (newPage >= 0 && newPage < totalPages) {
            setCurrentPage(newPage);  
        }
    };

    const refreshUsers = () => loadUsers(currentPage);

    return (
        <div className="bg-gray-800 min-h-screen p-4"> 
            {loading ? (  
                <p className="text-white">Loading...</p>
            ) : error ? (  
                <p className="text-red-500">{error}</p>
            ) : users.length > 0 ? (  
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {users.map(user => (
                            <UserCard
                                key={user.id}
                                {...user}
                                onDelete={() => handleDeleteUser(user.id)}
                                onEdit={() => handleEditUser(user)}  
                            />
                        ))}
                    </div>
                    <div className="flex justify-center items-center mt-4">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            className="bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:bg-blue-600"
                            disabled={currentPage === 0}  
                        >
                            Previous
                        </button>
                        <span className="text-white">
                            Page {currentPage + 1} of {totalPages}
                        </span>
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            className="bg-blue-500 text-white px-4 py-2 rounded ml-2 hover:bg-blue-600"
                            disabled={currentPage === totalPages - 1}  
                        >
                            Next
                        </button>
                    </div>
                </>
            ) : (
                <p className="text-white">No users available.</p> 
            )}
            {isEditModalOpen && userToEdit && (
                <AddUserModal
                    closeModal={() => setEditModalOpen(false)}
                    refreshUsers={refreshUsers}
                    user={userToEdit} 
                />
            )}
        </div>
    );
};

export default UserList;