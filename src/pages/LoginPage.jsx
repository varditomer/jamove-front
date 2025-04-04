import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "react-toastify";

import LoginImgURL from "../assets/images/login_img.png";
import HeadphonesURL from "../assets/images/headphones.png";
import EyeClosedIcon from "../assets/images/eye_closed_icon.png";
import EyeOpenIcon from "../assets/images/eye_open_icon.png";

export const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  // Form data state
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    rememberMe: false,
  });

  // Error and loading states
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Show password state
  const [showPassword, setShowPassword] = useState(false);

  // Handle form input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Basic validation
    if (!formData.username || !formData.password) {
      setError("Username and password are required");
      return;
    }

    try {
      setIsLoading(true);

      const credentials = {
        username: formData.username,
        password: formData.password,
        rememberMe: formData.rememberMe,
      };

      const response = await login(credentials);

      // Show success message
      toast.success("Login successful!");

      // Redirect based on user role
      if (response.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/player");
      }
    } catch (err) {
      const errorMessage =
        err.message || "Login failed. Please check your credentials.";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      <section className="login-form-section">
        <h2 className="welcome-heading">Welcome to JaMoveo</h2>
        <h1 className="page-identify-title">Log in</h1>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-control">
            <div className="label">Enter your Username*</div>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
              disabled={isLoading}
            />
          </div>

          <div className="form-control">
            <div className="label">Enter your Password*</div>
            <div className="password-field">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                disabled={isLoading}
              />
              <button
                type="button"
                className="toggle-password-visibility"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                <img
                  src={showPassword ? EyeOpenIcon : EyeClosedIcon}
                  alt={showPassword ? "Hide password" : "Show password"}
                />
              </button>
            </div>

            <div className="password-actions">
              <div className="remember-me">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  disabled={isLoading}
                />
                <span className="text">Remember me</span>
              </div>
              <Link to="/forgot-password" className="forgot-password-link">
                Forgot Password?
              </Link>
            </div>
          </div>

          <button className="btn-submit" type="submit" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Log in"}
          </button>

          <div className="register-link-wrapper">
            <span>Don't have an account?</span>
            <Link to="/register" className="register-link">
              Register
            </Link>
          </div>
        </form>
      </section>

      <section className="cover-section">
        <img src={LoginImgURL} alt="welcome_img" className="welcome-img" />
        <div className="title">
          <img src={HeadphonesURL} alt="headphones_logo" className="logo" />
          <span className="text">JAMOVEO</span>
        </div>
      </section>
    </div>
  );
};
