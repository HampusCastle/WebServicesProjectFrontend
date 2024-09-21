import React from 'react';
import { toastSuccess, toastError } from '../api/Toastify';
import { logout } from '../api/ApiServices';

interface LogoutProps {
    setIsModalOpen: (open: boolean) => void; 
}

const Logout = ({ setIsModalOpen }: LogoutProps) => {
    const handleLogout = async () => {
        try {
            await logout();
            toastSuccess('Logout successful!');
            window.location.href = '/login'; 
        } catch (error) {
            toastError(error instanceof Error ? error.message : 'Logout failed. Please try again.');
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded shadow-md text-center">
                <p className="mb-4 text-lg">Are you sure you want to logout?</p>
                <div className="flex justify-center">
                    <button
                        onClick={handleLogout}
                        className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded mr-2 transition duration-300"
                    >
                        Yes, Logout
                    </button>
                    <button
                        onClick={() => setIsModalOpen(false)}
                        className="bg-gray-300 hover:bg-gray-400 text-black font-semibold py-2 px-4 rounded transition duration-300"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Logout;