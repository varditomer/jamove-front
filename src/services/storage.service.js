// src/services/storageService.js

// Local Storage Service
export const localStorageService = {
    set(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (err) {
            console.error('Error saving to localStorage:', err);
        }
    },
    get(key) {
        try {
            const value = localStorage.getItem(key);
            return value ? JSON.parse(value) : null;
        } catch (err) {
            console.error('Error getting from localStorage:', err);
            return null;
        }
    },
    remove(key) {
        try {
            localStorage.removeItem(key);
        } catch (err) {
            console.error('Error removing from localStorage:', err);
        }
    },
    clear() {
        try {
            localStorage.clear();
        } catch (err) {
            console.error('Error clearing localStorage:', err);
        }
    }
};

// Session Storage Service
export const sessionStorageService = {
    set(key, value) {
        try {
            sessionStorage.setItem(key, JSON.stringify(value));
        } catch (err) {
            console.error('Error saving to sessionStorage:', err);
        }
    },
    get(key) {
        try {
            const value = sessionStorage.getItem(key);
            return value ? JSON.parse(value) : null;
        } catch (err) {
            console.error('Error getting from sessionStorage:', err);
            return null;
        }
    },
    remove(key) {
        try {
            sessionStorage.removeItem(key);
        } catch (err) {
            console.error('Error removing from sessionStorage:', err);
        }
    },
    clear() {
        try {
            sessionStorage.clear();
        } catch (err) {
            console.error('Error clearing sessionStorage:', err);
        }
    }
};
