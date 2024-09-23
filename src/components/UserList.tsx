import React, { useState, useEffect, useCallback } from 'react';
import { User } from '../types/User'; 
import UserCard from './UserCard'; 
import { getUsers, deleteUserById, updateUser, getUserById } from '../api/ApiServices';
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
    const [, setError] = useState<string | null>(null);
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
            console.error(err);
            setError('Error loading users');
        } finally {
            setLoading(false);
        }
    }, [setUsers]);

    useEffect(() => {
        loadUsers(currentPage);
    }, [loadUsers, currentPage]);

    const handleDeleteUser = async (userId: string) => {
        if (!window.confirm('Are you sure you want to delete this user?')) return;

        try {
            await deleteUserById(userId, true);
            setUsers((prev) => prev.filter(user => user.id !== userId));
            toast.success('User deleted successfully');
        } catch {
            toast.error('Error deleting user');
        }
    };

    const handleEditUser = async (updatedUser: User) => {
        try {
            const response = await updateUser(updatedUser);
            setUsers((prevUsers) =>
                prevUsers.map((user) => (user.id === response.id ? response : user))
            );
            toast.success('User updated successfully');
        } catch (error) {
            toast.error('Error updating user');
        } finally {
            setModals((prev) => ({ ...prev, isEditModalOpen: false }));
        }
    };

    const handleViewUser = async (user: User) => {
        try {
            const userDetails = await getUserById(user.id);
            setModals({
                ...modals,
                userToView: userDetails,
                isDetailModalOpen: true,
            });
        } catch (error) {
            toast.error('Error fetching user details');
        }
    };

    const handlePageChange = (newPage: number) => {
        if (newPage >= 0 && newPage < totalPages) {
            setCurrentPage(newPage);
        }
    };

    if (loading) {
        return <p className="text-white">Loading...</p>;
    }

    if (!Array.isArray(users) || users.length === 0) {
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
                        onEdit={() => setModals({ ...modals, userToEdit: user, isEditModalOpen: true })}
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
                    refreshUsers={() => loadUsers(currentPage)}
                />
            )}
            {modals.isEditModalOpen && modals.userToEdit && (
                <EditUserModal
                    user={modals.userToEdit}
                    onSave={handleEditUser}
                    onCancel={() => setModals((prev) => ({ ...prev, isEditModalOpen: false }))}
                />
            )}
            {modals.isDetailModalOpen && modals.userToView && (
                <UserDetailModal
                    user={modals.userToView}
                    onClose={() => setModals((prev) => ({ ...prev, isDetailModalOpen: false }))}
                    onEdit={() => {
                        if (modals.userToView) {
                            setModals({
                                ...modals,
                                userToEdit: modals.userToView,
                                isEditModalOpen: true,
                                isDetailModalOpen: false,
                            });
                        }
                    }}
                />
            )}
        </div>
    );
};

export default UserList;
