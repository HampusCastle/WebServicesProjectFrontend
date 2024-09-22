import React from 'react';
import { useNavigate } from 'react-router-dom';

interface NavbarProps {
    onAddUser: () => void;
    onFetchMoreUsers: () => Promise<void>;
    onOpenLogout: () => void; 
}

const Navbar = ({ onAddUser, onFetchMoreUsers, onOpenLogout }: NavbarProps) => {
    const navigate = useNavigate();
    const buttonClass = "bg-accent text-white px-4 py-2 rounded-md hover:bg-blue-700 transition";

    return (
        <nav className="flex justify-between items-center p-4 bg-primary text-white">
            <button 
                onClick={() => navigate('/home')} 
                className={buttonClass + " mr-4"}
            >
                Home
            </button>
            <h1 className="text-white font-bold text-3xl">Your Contact Book Online</h1>
            <div>
                <button 
                    onClick={onAddUser} 
                    className={buttonClass + " mr-4"}
                >
                    Add User
                </button>
                <button 
                    onClick={onFetchMoreUsers} 
                    className={buttonClass}
                >
                    Fetch More Users
                </button>
                <button 
                    onClick={onOpenLogout} 
                    className={buttonClass + " ml-4"}
                >
                    Logout
                </button>
            </div>
        </nav>
    );
};

export default Navbar;