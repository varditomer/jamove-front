// src/services/socket.service.js
import io from 'socket.io-client';
import { userService } from './user.service';

// Socket event constants
export const SOCKET_EVENT_SELECT_SONG = 'song-selected';
export const SOCKET_EVENT_JOIN_REHEARSAL = 'join-rehearsal';
export const SOCKET_EVENT_LEAVE_REHEARSAL = 'leave-rehearsal';
export const SOCKET_EVENT_END_REHEARSAL = 'end-rehearsal';
export const SOCKET_EVENT_USER_CONNECTED = 'user-connected';
export const SOCKET_EVENT_USER_DISCONNECTED = 'user-disconnected';

// Socket emit constants
const SOCKET_EMIT_LOGIN = 'set-user-socket';
const SOCKET_EMIT_LOGOUT = 'unset-user-socket';

// Base URL for socket connection
const baseUrl = process.env.NODE_ENV === 'production'
    ? window.location.origin // In production, connect to same origin
    : 'http://localhost:3000'; // Development URL (your NestJS server)

class SocketService {
    socket = null;

    setup() {
        this.socket = io(baseUrl);

        // Auto-login if user is already logged in
        setTimeout(() => {
            const user = userService.getLoggedInUser();
            if (user) this.login(user._id);
        }, 500);

        return this;
    }

    on(eventName, callback) {
        if (!this.socket) return;
        this.socket.on(eventName, callback);
        return () => this.off(eventName, callback); // Return cleanup function
    }

    off(eventName, callback = null) {
        if (!this.socket) return;
        if (!callback) {
            this.socket.removeAllListeners(eventName);
        } else {
            this.socket.off(eventName, callback);
        }
    }

    emit(eventName, data) {
        if (!this.socket) return;
        this.socket.emit(eventName, data);
    }

    login(userId) {
        this.emit(SOCKET_EMIT_LOGIN, userId);
    }

    logout() {
        this.emit(SOCKET_EMIT_LOGOUT);
    }

    joinRehearsal(rehearsalId) {
        this.emit(SOCKET_EVENT_JOIN_REHEARSAL, rehearsalId);
    }

    leaveRehearsal(rehearsalId) {
        this.emit(SOCKET_EVENT_LEAVE_REHEARSAL, rehearsalId);
    }

    selectSong(rehearsalId, song) {
        this.emit(SOCKET_EVENT_SELECT_SONG, { rehearsalId, song });
    }

    endRehearsal(rehearsalId) {
        this.emit(SOCKET_EVENT_END_REHEARSAL, rehearsalId);
    }

    terminate() {
        if (!this.socket) return;
        this.socket.disconnect();
        this.socket = null;
    }
}

export const socketService = new SocketService();

// Make available for debugging
window.socketService = socketService;
