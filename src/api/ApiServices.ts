import axios from 'axios';
import { NewUser } from '../types/User';

const API_URL = 'https://localhost:8443/home'; 

const axiosInstance = axios.create({
    baseURL: API_URL,
    withCredentials: true, 
});

const handleError = (error: any) => {
    if (error.response) {
        console.error('API Error:', {
            status: error.response.status,
            data: error.response.data,
            headers: error.response.headers,
        });
    } else {
        console.error('API Error:', error.message);
    }
    throw error;
};

export const login = async (username: string, password: string) => {
    try {
        const response = await axios.post('https://localhost:8443/login', new URLSearchParams({
            username,
            password
        }), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            withCredentials: true 
        });
        return response.data; 
    } catch (error) {
        console.error('Login error:', error);
        throw error; 
    }
};

export const saveUser = async (user: NewUser) => {
    try {
        return await axiosInstance.post('/home/saveUser', user); 
    } catch (error) {
        handleError(error);
    }
};

export const getUsers = async (page = 0, size = 12) => {
    try {
        const response = await axiosInstance.get(`/users?page=${page}&size=${size}`);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const getUser = async (id: string) => {
    try {
        return await axiosInstance.get(`/home/users/${id}`);
    } catch (error) {
        handleError(error);
    }
};

export const updateUser = async (user: { id: string; }) => {
    try {
        return await axiosInstance.put(`/users/${user.id}`, user);
    } catch (error) {
        handleError(error);
    }
};

export const updatePhoto = async (id: string, file: Blob) => {
    try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('id', id);
        return await axiosInstance.post(`/users/photo`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
    } catch (error) {
        handleError(error);
    }
};

export const deleteUser = async (id: string) => {
    try {
        return await axiosInstance.delete(`/users/${id}`);
    } catch (error) {
        handleError(error);
    }
};

export const fetchContacts = async () => {
    try {
        return await axiosInstance.post(`/users/fetch`);
    } catch (error) {
        handleError(error);
    }
};