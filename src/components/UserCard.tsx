import React from 'react';

export interface UserCardProps {
    name: string;
    email: string;
    phone: string;
    address: string;
    username: string;
    photoUrl?: string;
    role: string;
    onEdit: () => void;
    onDelete: () => Promise<void>;
    onViewDetails: () => void;
}

const UserCard = ({
    name,
    email,
    phone,
    address,
    username,
    photoUrl = 'https://via.placeholder.com/150',
    role,
    onEdit,
    onDelete,
    onViewDetails,
}: UserCardProps) => {
    const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
        e.currentTarget.src = 'https://via.placeholder.com/150';
    };

    const buttonStyles = "bg-accent text-black hover:bg-primary px-3 py-1 rounded transition duration-200";

    return (
        <div className="bg-secondary rounded-lg shadow-2xl p-6 flex flex-col items-center text-white max-w-sm">
            <img
                src={photoUrl}
                alt={name}
                className="w-24 h-24 object-cover rounded-full border-4 border-accent mb-4"
                onError={handleImageError}
            />
            <h3 className="text-lg font-bold">{name}</h3>
            <p className="text-sm">{username}</p>
            <p className="text-sm">{email}</p>
            <p className="text-sm">{phone}</p>
            <p className="text-sm">{address}</p>
            <div className="mt-4">
                <button onClick={onViewDetails} className={buttonStyles}>View Details</button>
                <button onClick={onEdit} className={`${buttonStyles} ml-2`}>Edit</button>
                <button onClick={onDelete} className={`${buttonStyles} ml-2`}>Delete</button>
            </div>
        </div>
    );
};

export default UserCard;
