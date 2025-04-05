import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useRehearsal } from "../../contexts/RehearsalContext";
import HeadphonesURL from "../../assets/images/headphones_yellow.png";
import AvatarURL from "../../assets/images/avatar.svg";

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
            {/* <button onClick={handleLogout} className="logout-btn"> */}
              <img src={AvatarURL} alt="avatar" onClick={handleLogout} />
            {/* </button> */}
          </div>
        )}
      </div>
    </header>
  );
};
