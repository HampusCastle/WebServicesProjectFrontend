import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { login } from '../api/ApiServices';
import { toastSuccess, toastError } from '../api/Toastify';

interface LoginProps {
    setIsAuthenticated: (isAuth: boolean) => void;
}

const InputField = ({ type, name, value, onChange, placeholder }: {
    type: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
}) => (
    <div className="mb-4">
        <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required
            className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-primary"
        />
    </div>
);

const Login = ({ setIsAuthenticated }: LoginProps) => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        if (params.get('error')) {
            setError('Invalid username or password');
        }
    }, [location.search]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCredentials(prev => ({ ...prev, [name]: value }));
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await login(credentials.username, credentials.password);
            toastSuccess('Login successful!');
            setIsAuthenticated(true);
            navigate('/home');
        } catch {
            setError('Failed to login. Please try again.');
            toastError('Failed to login. Please try again.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-background">
            <div className="bg-secondary text-white p-8 rounded-lg shadow-md w-full max-w-xs">
                <h2 className="text-2xl font-bold mb-6 text-center text-primary">Login</h2>
                <form onSubmit={handleLogin}>
                    <InputField
                        type="text"
                        name="username"
                        value={credentials.username}
                        onChange={handleChange}
                        placeholder="Username"
                    />
                    <InputField
                        type="password"
                        name="password"
                        value={credentials.password}
                        onChange={handleChange}
                        placeholder="Password"
                    />
                    {error && <p className="text-red-500 mb-4">{error}</p>}
                    <button
                        type="submit"
                        className="w-full bg-primary hover:bg-green-600 text-white font-semibold py-2 rounded transition duration-300"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
