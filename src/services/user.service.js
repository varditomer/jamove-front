// src/services/userService.js
import { httpService } from './http.service';
import { localStorageService, sessionStorageService } from './storage.service';

// Constants
const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser';
const TOKEN_KEY = 'token';

async function login(credentials) {
    try {
        const res = await httpService.post('auth/login', credentials);

        // Save token if exists
        if (res.token) {
            if (credentials.rememberMe) {
                localStorageService.set(TOKEN_KEY, res.token);
            } else {
                sessionStorageService.set(TOKEN_KEY, res.token);
            }
        }

        // Save user to session storage
        sessionStorageService.set(STORAGE_KEY_LOGGEDIN_USER, res.user);

        return res;
    } catch (error) {
        console.error('Login failed:', error);
        throw error;
    }
}

async function register(userInfo) {
    try {
        const res = await httpService.post('auth/register', userInfo);
        return res;
    } catch (error) {
        console.error('Registration failed:', error);
        throw error;
    }
}

const registerAdmin = async (userInfo) => {
    try {
        const res = await httpService.post('auth/register-admin', userInfo);
        return res;
    } catch (error) {
        console.error('Admin registration failed:', error);
        throw error;
    }
}


async function logout() {
    try {
        // Optionally call the server to invalidate the token
        await httpService.post('auth/logout');
    } catch (error) {
        console.error('Error during logout:', error);
    } finally {
        // Clear local storage and session storage
        sessionStorageService.remove(STORAGE_KEY_LOGGEDIN_USER);
        localStorageService.remove(TOKEN_KEY);
        sessionStorageService.remove(TOKEN_KEY);
    }
}

function getLoggedInUser() {
    return sessionStorageService.get(STORAGE_KEY_LOGGEDIN_USER);
}

function isAdmin() {
    const user = getLoggedInUser();
    return user?.role === 'admin';
}

export const userService = {
    login,
    register,
    registerAdmin,
    logout,
    getLoggedInUser,
    isAdmin
};
