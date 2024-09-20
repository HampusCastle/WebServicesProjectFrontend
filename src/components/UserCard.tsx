import React from 'react';

interface UserCardProps {
  id: string;
  username: string;
  name: string;
  role: string;
  photoUrl?: string;
}

const UserCard: React.FC<UserCardProps> = ({ username, name, role, photoUrl }) => {
  return (
    <div className="bg-white border rounded-lg shadow-md p-4 w-64">
      <div className="flex items-center mb-4">
        {photoUrl ? (
          <img src={photoUrl} alt={username} className="w-16 h-16 rounded-full mr-4" />
        ) : (
          <div className="w-16 h-16 rounded-full bg-gray-200 mr-4"></div>
        )}
        <div>
          <h2 className="text-lg font-semibold">{name}</h2>
          <p className="text-sm text-gray-600">{username}</p>
          <p className="text-xs text-gray-400">{role}</p>
        </div>
      </div>
    </div>
  );
};

export default UserCard;