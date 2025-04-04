// src/pages/AdminPage.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useRehearsal } from "../contexts/RehearsalContext";

export const AdminPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { currentUser } = useAuth();
  const { joinRehearsal } = useRehearsal();
  const navigate = useNavigate();

  // Join the default rehearsal when component mounts
  useEffect(() => {
    if (currentUser) {
      joinRehearsal("default");
    }
  }, [currentUser, joinRehearsal]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    // Store search query in sessionStorage for use in ResultsPage
    sessionStorage.setItem("songSearchQuery", searchQuery);
    navigate("/results");
  };

  return (
    <div className="admin-page">
      <h1>Search any song...</h1>

      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Enter song name or artist"
          className="search-input"
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>
    </div>
  );
};
