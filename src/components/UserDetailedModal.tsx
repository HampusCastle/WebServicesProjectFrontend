import React, { useState, useEffect } from 'react';
import { User } from '../types/User'; 
import { updateUser } from '../api/ApiServices';

interface UserDetailModalProps {
    user: User | null;
    closeModal: () => void;
    refreshUsers: () => void;
}

const UserDetailModal = ({ user, closeModal, refreshUsers }: UserDetailModalProps) => {
    const [formData, setFormData] = useState<User | null>(null);

    useEffect(() => {
        if (user) {
            setFormData(user);
        }
    }, [user]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (formData) {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (formData) {
            try {
                await updateUser(formData);
                refreshUsers();
                closeModal();
            } catch (error) {
                console.error('Error updating user:', error);
            }
        }
    };

    if (!formData) return null;

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                <h2 className="text-2xl font-bold mb-4">Edit User</h2>
                {formData.photoUrl && (
                    <div className="mb-4">
                        <img src={formData.photoUrl} alt="User" className="w-full h-32 object-cover rounded" />
                    </div>
                )}
                <form onSubmit={handleSubmit}>
                    <label className="block mb-2">
                        Name:
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                        />
                    </label>
                    <label className="block mb-2">
                        Email:
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                        />
                    </label>
                    <label className="block mb-2">
                        Phone:
                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                        />
                    </label>
                    <div className="flex justify-between mt-4">
                        <button 
                            type="button" 
                            onClick={closeModal} 
                            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded"
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit" 
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UserDetailModal;