import React, { useState } from 'react';

interface EditUserModalProps {
    user: {
        id: string;
        name: string;
        email: string;
        phone: string;
        address: string;
        username: string;
        photoUrl?: string; // Ensure photoUrl is included
    };
    onSave: (updatedUser: any) => void;
    onCancel: () => void;
}

const EditUserModal = ({ user, onSave, onCancel }: EditUserModalProps) => {
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [phone, setPhone] = useState(user.phone);
    const [address, setAddress] = useState(user.address);
    const [username, setUsername] = useState(user.username);
    const [photoUrl, setPhotoUrl] = useState(user.photoUrl || ''); 

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({
            id: user.id,
            name,
            email,
            phone,
            address,
            username,
            photoUrl, 
        });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-secondary p-8 rounded-lg shadow-lg max-w-lg w-full text-black">
                <h2 className="text-2xl font-bold mb-6 text-primary text-center">Edit User</h2>
                {photoUrl && (
                    <img 
                        src={photoUrl} 
                        alt={user.name} 
                        className="w-24 h-24 object-cover rounded-full mx-auto mb-4" 
                    />
                )}
                <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                    <input 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        placeholder="Name" 
                        className="p-2 border rounded" 
                        required 
                    />
                    <input 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        placeholder="Email" 
                        className="p-2 border rounded" 
                        required 
                    />
                    <input 
                        value={phone} 
                        onChange={(e) => setPhone(e.target.value)} 
                        placeholder="Phone" 
                        className="p-2 border rounded" 
                        required 
                    />
                    <input 
                        value={address} 
                        onChange={(e) => setAddress(e.target.value)} 
                        placeholder="Address" 
                        className="p-2 border rounded" 
                        required 
                    />
                    <input 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                        placeholder="Username" 
                        className="p-2 border rounded" 
                        required 
                    />
                    <input 
                        value={photoUrl} 
                        onChange={(e) => setPhotoUrl(e.target.value)} 
                        placeholder="Photo URL" 
                        className="p-2 border rounded" 
                    />
                    <div className="flex justify-end space-x-2">
                        <button 
                            type="submit" 
                            className="bg-primary text-white px-4 py-2 rounded-md"
                        >
                            Save
                        </button>
                        <button 
                            type="button" 
                            onClick={onCancel} 
                            className="bg-accent text-black px-4 py-2 rounded-md"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditUserModal;
