import React from 'react';

export interface UserCardProps {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  username: string;
  password: string;
  photoUrl?: string;
  role: string;
  onEdit: () => void;
  onDelete: () => Promise<void>;
}

const UserCard = ({
  id,
  name,
  email,
  phone,
  address,
  username,
  password,
  photoUrl,
  role,
  onEdit,
  onDelete,
}: UserCardProps) => {
  return (
    <div className="bg-gradient-to-r from-gray-700 to-gray-800 rounded-lg shadow-2xl p-6 flex flex-col transition-transform transform hover:scale-105 hover:shadow-2xl text-white">
      <div className="h-64 w-full mb-4 overflow-hidden relative rounded-lg">
        <img 
          src={photoUrl || 'default-image.png'} 
          alt={name} 
          className="absolute inset-0 w-full h-full object-cover object-center rounded-lg" 
        />
      </div>
      <h3 className="text-xl font-semibold mb-2">{name}</h3>
      <p className="mb-1"><strong>Email:</strong> {email}</p>
      <p className="mb-1"><strong>Phone:</strong> {phone}</p>
      <p className="mb-1"><strong>Address:</strong> {address}</p>
      <p className="mb-1"><strong>Username:</strong> {username}</p>
      <p className="mb-4"><strong>Role:</strong> {role}</p>
      <div className="flex justify-between">
        <button 
          onClick={onEdit} 
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
        >
          Edit
        </button>
        <button 
          onClick={onDelete} 
          className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-300"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default UserCard;