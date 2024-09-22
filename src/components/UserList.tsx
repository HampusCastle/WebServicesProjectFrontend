import React, { useState, useEffect, useCallback } from 'react';
import { User } from '../types/User'; 
import UserCard from './UserCard'; 
import { getUsers, deleteUser } from '../api/ApiServices';
import { toast } from 'react-toastify';
import AddUserModal from './modals/AddUserModal';
import EditUserModal from './modals/EditUserModal';
import UserDetailModal from './modals/UserDetailedModal';

interface UserListProps {
    users: User[];
    setUsers: (users: User[] | ((prevUsers: User[]) => User[])) => void;
}

const UserList = ({ users, setUsers }: UserListProps) => {
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [modals, setModals] = useState({
        isAddModalOpen: false,
        isEditModalOpen: false,
        userToEdit: null as User | null,
        isDetailModalOpen: false,
        userToView: null as User | null,
    });

    const loadUsers = useCallback(async (page: number) => {
        setLoading(true);
        setError(null); 
        try {
            const response = await getUsers(page);
            setUsers(response.content || []);
            setTotalPages(response.totalPages || 0);
        } catch (err) {
            handleError('Error loading users');
        } finally {
            setLoading(false);
        }
    }, [setUsers]);

    useEffect(() => {
        loadUsers(currentPage);
    }, [loadUsers, currentPage]);

    const handleError = (message: string) => {
        setError(message);
        toast.error(message);
    };

    const handleDeleteUser = async (userId: string) => {
        try {
            await deleteUser(userId);
            setUsers((prev) => prev.filter(user => user.id !== userId));
            toast.success('User deleted successfully');
        } catch {
            handleError('Error deleting user');
        }
    };

    const handleEditUser = (user: User) => {
        setModals({
            ...modals,
            userToEdit: user,
            isEditModalOpen: true,
        });
    };

    const handleViewUser = (user: User) => {
        setModals({
            ...modals,
            userToView: user,
            isDetailModalOpen: true,
        });
    };

    const handlePageChange = (newPage: number) => {
        if (newPage >= 0 && newPage < totalPages) {
            setCurrentPage(newPage);
        }
    };

    const refreshUsers = () => loadUsers(currentPage);
    
    if (loading) {
        return <p className="text-white">Loading...</p>;
    }

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

    if (!users || users.length === 0) {
        return <p className="text-white">No users found.</p>;
    }

    return (
        <div className="bg-background min-h-screen p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {users.map(user => (
                    <UserCard
                        key={user.id}
                        {...user}
                        onDelete={() => handleDeleteUser(user.id)}
                        onEdit={() => handleEditUser(user)} 
                        onViewDetails={() => handleViewUser(user)}
                    />
                ))}
            </div>

            <div className="flex justify-center items-center mt-4">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    className="bg-primary text-black px-4 py-2 rounded mr-2 hover:bg-blue-700"
                    disabled={currentPage === 0}
                >
                    Previous
                </button>
                <span className="text-white">
                    Page {currentPage + 1} of {totalPages}
                </span>
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    className="bg-primary text-black px-4 py-2 rounded ml-2 hover:bg-blue-700"
                    disabled={currentPage >= totalPages - 1}
                >
                    Next
                </button>
            </div>

            {modals.isAddModalOpen && (
                <AddUserModal
                    onClose={() => setModals((prev) => ({ ...prev, isAddModalOpen: false }))}
                    refreshUsers={refreshUsers}
                />
            )}
            {modals.isEditModalOpen && modals.userToEdit && (
                <EditUserModal
                    user={modals.userToEdit}
                    onSave={(updatedUser) => {
                        setUsers((prevUsers) => 
                            prevUsers.map((u) => (u.id === updatedUser.id ? updatedUser : u))
                        );
                        setModals((prev) => ({ ...prev, isEditModalOpen: false }));
                    }}
                    onCancel={() => setModals((prev) => ({ ...prev, isEditModalOpen: false }))}
                />
            )}
            {modals.isDetailModalOpen && modals.userToView && (
                <UserDetailModal
                    user={modals.userToView}
                    onClose={() => setModals((prev) => ({ ...prev, isDetailModalOpen: false }))}
                    onEdit={() => {
                        if (modals.userToView) {
                            handleEditUser(modals.userToView);
                        }
                        setModals((prev) => ({ ...prev, isDetailModalOpen: false }));
                    }}
                />
            )}
        </div>
    );
};

export default UserList;
