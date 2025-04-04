// src/pages/PlayerPage.jsx
import React, { useEffect } from "react";
import MusicNote from "../assets/images/music_note.png";
import { useAuth } from "../contexts/AuthContext";
import { useRehearsal } from "../contexts/RehearsalContext";

export const PlayerPage = () => {
  const { currentUser } = useAuth();
  const { joinRehearsal } = useRehearsal();

  // Join the default rehearsal when component mounts
  useEffect(() => {
    if (currentUser) {
      joinRehearsal("default");
    }
  }, [currentUser, joinRehearsal]);

  return (
    <div className="player-page">
      <img src={MusicNote} alt="" className="music-note-img" />
      <h2>Waiting for next song...</h2>
    </div>
  );
};
