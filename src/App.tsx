import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'; 
import UserList from './components/UserList'; 
import Login from './components/Login';
import Logout from './components/Logout';
import Home from './components/Home';
import Navbar from './components/Navbar';
import { User } from './types/User';
import AddUserModal from './components/AddUserModal'; 
import { fetchUsers, checkAuth } from './api/ApiServices'; 
import { toast } from 'react-toastify';

const App = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [isAddUserModalOpen, setAddUserModalOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false); 

    useEffect(() => {
        const verifyAuthentication = async () => {
            const isAuth = await checkAuth(); 
            setIsAuthenticated(isAuth);
        };
        verifyAuthentication();
    }, []);

    const handleAddUser = () => setAddUserModalOpen(true);
    const closeAddUserModal = () => setAddUserModalOpen(false);

    const handleFetchMoreUsers = async () => {
        try {
            const response = await fetchUsers();
            toast.success(response ? 'Successfully added more users' : 'No more users to fetch');
        } catch {
            toast.error('Failed to add more users');
        }
    };

    return (
        <Router>
            <Navbar 
                onAddUser={handleAddUser} 
                onFetchMoreUsers={handleFetchMoreUsers} 
                setIsModalOpen={setIsModalOpen} 
            />
            <ToastContainer />
            <Routes>
                <Route path="/home" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
                <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
                <Route path="/home/users" 
                    element={isAuthenticated ? <UserList users={users} setUsers={setUsers} /> : <Navigate to="/login" />} 
                />
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
            {isModalOpen && (
                <Logout setIsModalOpen={setIsModalOpen} />
            )}
            {isAddUserModalOpen && (
                <AddUserModal 
                    closeModal={closeAddUserModal} 
                    refreshUsers={() => setUsers(prev => [...prev])} 
                />
            )}
        </Router>
    );
};

export default App;