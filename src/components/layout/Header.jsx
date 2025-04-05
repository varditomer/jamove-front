import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useRehearsal } from "../../contexts/RehearsalContext";
import HeadphonesURL from "../../assets/images/headphones_yellow.png";

export const Header = () => {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const { isInRehearsal, leaveRehearsal } = useRehearsal();

  const handleLogout = () => {
    if (isInRehearsal) {
      leaveRehearsal("default");
    }
    logout();
    navigate("/login");
  };

  return (
    <header className="app-header">
      <div className="header-content">
        <div className="logo-wrapper">
          <img src={HeadphonesURL} alt="headphones_logo" className="logo" />
          <span className="text">JAMOVEO</span>
        </div>
        {currentUser && (
          <div className="header-actions">
            {/* <span className="user-name">
              {currentUser.name || currentUser.email}
            </span> */}
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
