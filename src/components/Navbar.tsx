import React from 'react';
import { Link } from 'react-router-dom';

interface NavbarProps {
    onAddUser: () => void;
    onFetchMoreUsers: () => void;  
    setIsModalOpen: (open: boolean) => void; 
}

const Navbar = ({ onAddUser, onFetchMoreUsers, setIsModalOpen }: NavbarProps) => {
    return (
        <nav className="bg-gray-900 p-4 flex justify-between items-center">
            <Link to="/home" className="text-white text-lg hover:bg-gray-700 px-3 py-2 rounded">
                Home
            </Link>
            <div>
                <button 
                    onClick={onAddUser} 
                    className="bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:bg-blue-600"
                >
                    Add User
                </button>
                <button 
                    onClick={onFetchMoreUsers} 
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                    Fetch More Users
                </button>
                <button 
                    onClick={() => setIsModalOpen(true)} 
                    className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded transition duration-300"
                >
                    Logout
                </button>
            </div>
        </nav>
    );
};

export default Navbar;