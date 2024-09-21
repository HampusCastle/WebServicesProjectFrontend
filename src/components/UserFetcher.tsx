import React from 'react';
import { fetchUsers, saveUser } from '../api/ApiServices';
import { NewUser, User } from '../types/User';

interface UserFetcherProps {
    setUsers: (users: User[] | ((prevUsers: User[]) => User[])) => void;
}

const UserFetcher = ({ setUsers }: UserFetcherProps) => {
    const handleFetchMoreUsers = async () => {
        try {
            const response = await fetchUsers();
            if (response && Array.isArray(response.data)) {
                const savedUsers = await Promise.all(
                    response.data.map(async (user: NewUser) => {
                        try {
                            return await saveUser(user);
                        } catch {
                            return null;
                        }
                    })
                );

                const validUsers = savedUsers.filter((user): user is User => user !== null);
                setUsers((prevUsers) => [...prevUsers, ...validUsers]);
                console.log('Users fetched and saved:', validUsers);
            } else {
                console.error('No valid array data received');
            }
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    return (
        <button 
            onClick={handleFetchMoreUsers} 
            className="bg-white text-blue-600 px-4 py-2 rounded-lg"
        >
            Fetch More Users
        </button>
    );
};

export default UserFetcher;