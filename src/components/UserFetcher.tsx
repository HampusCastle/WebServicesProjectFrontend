import React from 'react';
import { fetchUsers, saveUser } from '../api/ApiServices';
import { NewUser, User } from '../types/User';

interface UserFetcherProps {
    setUsers: (users: User[] | ((prevUsers: User[]) => User[])) => void;
}

const UserFetcher = ({ setUsers }: UserFetcherProps) => {
    const logError = (message: string, error: unknown) => {
        console.error(message, error);
    };

    const handleFetchMoreUsers = async () => {
        try {
            const { data } = await fetchUsers();

            if (!Array.isArray(data)) {
                logError('Received invalid data format; expected an array', new Error('Invalid format'));
                return;
            }

            const savedUsers = await Promise.all(
                data.map(async (user: NewUser) => {
                    try {
                        return await saveUser(user);
                    } catch (error) {
                        logError(`Error saving user: ${user.username}`, error);
                        return null;
                    }
                })
            );

            const validUsers = savedUsers.filter((user): user is User => user !== null);
            setUsers((prevUsers) => [...prevUsers, ...validUsers]);
        } catch (error) {
            logError('Error fetching users:', error);
        }
    };

    return (
        <button 
            onClick={handleFetchMoreUsers} 
            className="bg-white text-green-600 px-4 py-2 rounded-lg hover:bg-green-200 transition"
        >
            Fetch More Users
        </button>
    );
};

export default UserFetcher;