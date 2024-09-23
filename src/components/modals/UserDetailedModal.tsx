import React from 'react';
import { User } from '../../types/User';

interface UserDetailModalProps {
    user: User;
    onClose: () => void;
    onEdit: () => void;
}

const UserDetailModal = ({ user, onClose, onEdit }: UserDetailModalProps) => {
    const fallbackImage = '/path/to/default-image.jpg';

    const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
        e.currentTarget.src = fallbackImage;
    };

    const UserDetailRow = ({ label, value }: { label: string; value: string }) => (
        <div className="bg-white p-4 rounded shadow mb-2 w-full">
            <strong>{label}:</strong> {value}
        </div>
    );

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-secondary p-8 rounded-lg shadow-lg max-w-lg w-full text-black">
                <h2 className="text-2xl font-bold mb-6 text-primary text-center">User Details</h2>
                
                <div className="flex flex-col items-center mb-4">
                    <img
                        src={user.photoUrl ?? fallbackImage}
                        alt={`${user.name}'s profile`}
                        className="w-24 h-24 rounded-full border border-primary mb-4"
                        onError={handleImageError}
                    />
                    
                    <UserDetailRow label="Username" value={user.username} />
                    <UserDetailRow label="Name" value={user.name} />
                    <UserDetailRow label="Email" value={user.email} />
                    <UserDetailRow label="Phone" value={user.phone} />
                    <UserDetailRow label="Address" value={user.address} />
                </div>

                <div className="flex justify-end">
                    <button onClick={onEdit} className="bg-primary text-white px-4 py-2 rounded-md mr-2">Edit</button>
                    <button onClick={onClose} className="bg-accent text-black px-4 py-2 rounded-md">Close</button>
                </div>
            </div>
        </div>
    );
};

export default UserDetailModal;