// src/contexts/RehearsalContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
    SOCKET_EVENT_END_REHEARSAL,
    SOCKET_EVENT_SELECT_SONG,
    socketService,
} from "../services/socket.service";
import { useAuth } from "./AuthContext";

// Create context
const RehearsalContext = createContext();

// Custom hook to use rehearsal context
export const useRehearsal = () => useContext(RehearsalContext);

export const RehearsalProvider = ({ children }) => {
  const [currentSong, setCurrentSong] = useState(null);
  const [isInRehearsal, setIsInRehearsal] = useState(false);
  const [rehearsalId, setRehearsalId] = useState("default"); // Default rehearsal ID
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  // Connect to socket when component mounts
  useEffect(() => {
    const socket = socketService.setup();

    // Add a listener to log when connection is established
    socket.on("connect", () => {
      console.log("Socket connected successfully!");
      toast.success("Connected to rehearsal server");
    });

    // Add a listener for connection errors
    socket.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
      toast.error("Failed to connect to rehearsal server");
    });

    // Cleanup on unmount
    return () => {
      socketService.terminate();
    };
  }, []);

  // Listen for socket events
  useEffect(() => {
    if (!currentUser) return;

    // Handle song selection
    const songSelectedCleanup = socketService.on(
      SOCKET_EVENT_SELECT_SONG,
      (song) => {
        setCurrentSong(song);
        setIsInRehearsal(true);
        navigate("/live");
        toast.info(`Now playing: ${song.title} by ${song.artist}`);
      }
    );

    // Handle rehearsal end
    const rehearsalEndCleanup = socketService.on(
      SOCKET_EVENT_END_REHEARSAL,
      () => {
        setCurrentSong(null);
        setIsInRehearsal(false);

        // Navigate admin and players back to their respective main pages
        if (currentUser.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/player");
        }

        toast.info("The rehearsal has ended");
      }
    );

    // Join rehearsal room
    joinRehearsal(rehearsalId);

    // Cleanup listeners on unmount or user change
    return () => {
      songSelectedCleanup();
      rehearsalEndCleanup();
      leaveRehearsal(rehearsalId);
    };
  }, [currentUser, navigate, rehearsalId]);

  // Join a rehearsal
  const joinRehearsal = (id) => {
    if (!id) return;
    setRehearsalId(id);
    socketService.joinRehearsal(id);
    setIsInRehearsal(true);
  };

  // Leave a rehearsal
  const leaveRehearsal = (id) => {
    if (!id) return;
    socketService.leaveRehearsal(id);
    setIsInRehearsal(false);
    setCurrentSong(null);
  };

  // Select a song (admin only)
  const selectSong = (song) => {
    socketService.selectSong(rehearsalId, song);
    setCurrentSong(song);
    navigate("/live");
  };

  // End rehearsal (admin only)
  const endRehearsal = () => {
    socketService.endRehearsal(rehearsalId);
    setCurrentSong(null);
    setIsInRehearsal(false);
    navigate("/admin");
  };

  const value = {
    currentSong,
    isInRehearsal,
    rehearsalId,
    joinRehearsal,
    leaveRehearsal,
    selectSong,
    endRehearsal,
  };

  return (
    <RehearsalContext.Provider value={value}>
      {children}
    </RehearsalContext.Provider>
  );
};
