import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-teal-500 text-white text-center">
            <h1 className="text-5xl font-bold mb-4">Welcome to User Management</h1>
            <p className="text-xl mb-8">Manage your users efficiently. Click below to view the list of users.</p>
            <button 
                onClick={() => navigate('/home/users')}
                className="bg-white text-blue-600 px-6 py-3 rounded-lg shadow-lg hover:bg-gray-200 transition duration-200"
            >
                <strong>View Users</strong>
            </button>
            <div className="mt-10">
                <img 
                    src="https://cdn-icons-png.flaticon.com/512/93/93635.png" 
                    alt="Phonebook Illustration" 
                    className="rounded-lg shadow-lg w-64 border-4 border-teal-200"
                />
            </div>
        </div>
    );
};

export default Home;