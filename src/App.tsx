import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserList from './components/UserList'; 
import Login from './components/Login';
import Logout from './components/Logout'
import Home from './components/Home'

const App = () => {
    return (
        <Router>
            <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="home/users" element={<UserList />} />
            <Route path="/logout" element={<Logout />} />
            </Routes>
        </Router>
    );
};

export default App;