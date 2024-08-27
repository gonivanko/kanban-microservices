import axios from 'axios';

const API_URL = 'http://localhost:8080'; // URL вашего сервиса авторизации

export const login = async (email, password) => {
    const response = await axios.post(`${API_URL}/login`, {
        login: email,
        password: password,
    });
    if (response.data.token) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
};

export const register = async (email, password) => {
    const response = await axios.post(`${API_URL}/register`, { email, password });
    console.log(response.data);
    return response.data;
};

export const logout = () => {
    localStorage.removeItem('user');
};

export const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user'));
}