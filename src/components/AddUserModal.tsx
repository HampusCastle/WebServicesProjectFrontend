import React, { useState, useEffect } from 'react';
import { NewUser, User } from '../types/User';
import { saveUser, updateUser } from '../api/ApiServices';
import { toastSuccess, toastError } from '../api/Toastify';

interface AddUserModalProps {
    closeModal: () => void;
    refreshUsers: () => void;
    user?: User;
}

const AddUserModal = ({ closeModal, refreshUsers, user }: AddUserModalProps) => {
    const [formData, setFormData] = useState<NewUser>({
        name: '',
        email: '',
        phone: '',
        address: '',
        username: '',
        password: '',
        photoUrl: '',
    });

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                username: user.username,
                password: user.password, 
                photoUrl: user.photoUrl,
            });
        }
    }, [user]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            if (user) {
                await updateUser({ ...user, ...formData });
                toastSuccess('User updated successfully!');
            } else {
                await saveUser({ ...formData, role: 'user' });
                toastSuccess('User added successfully!');
            }
            closeModal();
            refreshUsers();
        } catch (error) {
            toastError(user ? 'Error updating user.' : 'Error adding user.');
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                <form onSubmit={handleSubmit}>
                    <h2 className="text-2xl font-bold mb-4">{user ? 'Edit User' : 'Add User'}</h2>
                    {['name', 'email', 'phone', 'address', 'username', 'password', 'photoUrl'].map((field, index) => (
                        <label className="block mb-2" key={index}>
                            {field.charAt(0).toUpperCase() + field.slice(1)}:
                            <input
                                type={field === 'password' ? 'password' : 'text'}
                                name={field}
                                value={formData[field as keyof NewUser]}
                                onChange={handleChange}
                                required={field !== 'photoUrl'}
                                className="mt-1 block w-full p-2 border border-gray-600 rounded bg-gray-800 text-white"
                            />
                        </label>
                    ))}
                    <div className="flex justify-end space-x-2">
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                            {user ? 'Update User' : 'Add User'}
                        </button>
                        <button type="button" onClick={closeModal} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
                            Close
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddUserModal;