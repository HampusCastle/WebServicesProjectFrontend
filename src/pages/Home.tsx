import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
    const navigate = useNavigate();

    const handleViewUsers = () => {
        navigate('/home/users');
    };

    const containerClass = "flex flex-col items-center justify-center min-h-screen bg-background text-black text-center";
    const headingClass = "text-5xl font-bold mb-4 text-primary";
    const paragraphClass = "text-xl mb-8";
    const buttonClass = "bg-secondary text-primary px-6 py-3 rounded-lg shadow-lg hover:bg-accent transition duration-200";

    return (
        <div className={containerClass}>
            <h1 className={headingClass}>Welcome to User Management</h1>
            <p className={paragraphClass}>Manage your users efficiently. Click below to view the list of users.</p>
            <button 
                onClick={handleViewUsers}
                className={buttonClass}
            >
                <strong>View Users</strong>
            </button>
            <div className="mt-10">
                <img 
                    src="https://cdn-icons-png.flaticon.com/512/93/93635.png" 
                    alt="Phonebook Illustration" 
                    className="rounded-lg shadow-lg w-64 border-4 border-primary"
                />
            </div>
        </div>
    );
};

export default Home;