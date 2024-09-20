import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { login } from '../api/ApiServices';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        if (params.get('error')) {
            setError('Invalid username or password');
        }
    }, [location.search]);

    const handleLogin = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
          await login(username, password);
          navigate('/home');
      } catch (err) {
          setError('Failed to login. Please try again.'); 
      }
  };

    return (
        <div>
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                />
                <button type="submit">Login</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    );
};

export default Login;