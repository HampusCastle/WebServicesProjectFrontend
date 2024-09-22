import axios from 'axios';
import { NewUser, User } from '../types/User';

const API_URL = 'https://localhost:8443';

const axiosInstance = axios.create({
    baseURL: API_URL,
    withCredentials: true,
});

const handleError = (error: any) => {
    const errorMessage = axios.isAxiosError(error) && error.response 
        ? `API Error: ${error.response.status} - ${error.response.data}`
        : `API Error: ${error.message}`;

    console.error('Logout Error:', errorMessage);
    throw new Error(errorMessage);
};

const requestHandler = async (method: 'GET' | 'POST' | 'PUT' | 'DELETE', url: string, data?: any) => {
    try {
        const response = await axiosInstance.request({ method, url, data });
        return response.data;
    } catch (error) {
        handleError(error);
        return null;
    }
};

export const login = async (username: string, password: string) => {
    return requestHandler('POST', '/login', new URLSearchParams({ username, password }));
};

export const logout = async () => {
    try {
        await requestHandler('POST', '/logout');
    } catch {
        throw new Error('Logout failed. Please try again.');
    }
};

export const saveUser = (user: NewUser) => requestHandler('POST', '/home/saveUser', user);
export const getUsers = (page = 0, size = 12) => requestHandler('GET', `/home/users?page=${page}&size=${size}`);
export const getUser = (id: string) => requestHandler('GET', `/home/users/${id}`);
export const updateUser = (user: User) => requestHandler('PUT', `/home/users/${user.id}`, user);
export const deleteUser = (id: string) => requestHandler('DELETE', `/home/users/${id}`);
export const fetchUsers = () => requestHandler('POST', '/home/fetch');
export const checkAuth = () => requestHandler('GET', '/auth/check').then(response => response.status === 200);