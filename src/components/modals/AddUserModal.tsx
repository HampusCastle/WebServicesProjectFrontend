import React, { useState } from 'react';
import { NewUser } from '../../types/User'; 
import { saveUser } from '../../api/ApiServices';
import { toast } from 'react-toastify';

interface AddUserModalProps {
    onClose: () => void;
    refreshUsers: () => void;
}

const InputField = ({
    name,
    type,
    placeholder,
    value,
    onChange,
    required,
}: {
    name: keyof NewUser;
    type: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
}) => (
    <input 
        type={type}
        name={name}
        placeholder={placeholder}
        className="border mb-4 p-3 w-full rounded-md"
        value={value} 
        onChange={onChange} 
        required={required}
    />
);

const AddUserModal = ({ onClose, refreshUsers }: AddUserModalProps) => {
    const [formData, setFormData] = useState<NewUser>({
        name: '',
        email: '',
        phone: '',
        address: '',
        username: '',
        password: '',
        photoUrl: '',
        role: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            await saveUser(formData);
            await refreshUsers();
            onClose();
            toast.success("User added successfully!");
        } catch (error) {
            console.error('Failed to save user:', error);
            toast.error("Something went wrong. User was not added.");
        }
    };

    const inputFields = [
        { name: 'name', type: 'text', placeholder: 'User Name', required: true },
        { name: 'email', type: 'email', placeholder: 'Email', required: true },
        { name: 'phone', type: 'text', placeholder: 'Phone', required: true },
        { name: 'address', type: 'text', placeholder: 'Address', required: true },
        { name: 'username', type: 'text', placeholder: 'Username', required: true },
        { name: 'password', type: 'password', placeholder: 'Password', required: true },
        { name: 'photoUrl', type: 'text', placeholder: 'Photo URL', required: false },
        { name: 'role', type: 'text', placeholder: 'Role', required: true },
    ];

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-secondary p-8 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-2xl mb-6 text-primary text-center">Add User</h2>
                <form onSubmit={handleSubmit}>
                    {inputFields.map(({ name, type, placeholder, required }) => (
                        <InputField 
                            key={name}
                            name={name as keyof NewUser}
                            type={type}
                            placeholder={placeholder}
                            value={formData[name as keyof NewUser] || ''} 
                            onChange={handleChange} 
                            required={required}
                        />
                    ))}
                    <div className="flex justify-between">
                        <button 
                            type="submit" 
                            className="bg-primary text-white px-4 py-2 rounded-md w-full mr-2 hover:bg-blue-700 transition"
                        >
                            Add User
                        </button>
                        <button 
                            type="button" 
                            onClick={onClose} 
                            className="bg-accent text-black px-4 py-2 rounded-md w-full ml-2 hover:bg-gray-300 transition"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddUserModal;