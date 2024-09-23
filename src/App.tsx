import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import UserList from './components/UserList';
import Login from './pages/Login';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import AddUserModal from './components/modals/AddUserModal';
import { User } from './types/User';
import { fetchUsers, checkAuth } from './api/ApiServices';
import Logout from './pages/Logout';

const App = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [isAddUserModalOpen, setAddUserModalOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

    useEffect(() => {
        const initializeApp = async () => {
            try {
                const isAuth = await checkAuth();
                setIsAuthenticated(isAuth);
            } catch (error) {
                toast.error('Failed to verify authentication');
            }
        };

        initializeApp();
    }, []);

    const handleAddUser = () => setAddUserModalOpen(true);
    const closeAddUserModal = () => setAddUserModalOpen(false);

    const handleFetchMoreUsers = async () => {
        try {
            const response = await fetchUsers();
            if (response) {
                setUsers((prevUsers) => [...prevUsers, ...response]);
                toast.success('Successfully added more users');
            } else {
                toast.info('No more users to fetch');
            }
        } catch {
            toast.error('Failed to add more users');
        }
    };

    const handleOpenLogout = () => setIsLogoutModalOpen(true);

    return (
        <Router>
            <Navbar 
                onAddUser={handleAddUser} 
                onFetchMoreUsers={handleFetchMoreUsers} 
                onOpenLogout={handleOpenLogout} 
            />
            <ToastContainer />
            
            <Routes>
                <Route path="/home" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
                <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
                <Route 
                    path="/home/users" 
                    element={isAuthenticated ? <UserList users={users} setUsers={setUsers} /> : <Navigate to="/login" />} 
                />
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>

            {isAddUserModalOpen && (
                <AddUserModal 
                    onClose={closeAddUserModal} 
                    refreshUsers={() => setUsers((prev) => [...prev])} 
                />
            )}
            {isLogoutModalOpen && (
                <Logout 
                    setIsModalOpen={setIsLogoutModalOpen} 
                    setIsAuthenticated={setIsAuthenticated} 
                />
            )}
        </Router>
    );
};

export default App;