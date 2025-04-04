import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../contexts/AuthContext";

import EyeClosedIcon from "../assets/images/eye_closed_icon.png";
import EyeOpenIcon from "../assets/images/eye_open_icon.png";
import HeadphonesURL from "../assets/images/headphones.png";
import LoginImgURL from "../assets/images/login_img.png";

export const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  // Form data state
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    rememberMe: false,
  });

  // Form validation errors
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Handle form input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};
    if (!formData.username) newErrors.username = "Username is required";
    if (!formData.password) newErrors.password = "Password is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
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

        <form onSubmit={handleSubmit} className="auth-form">
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
            {errors.username && <div className="error">{errors.username}</div>}
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
            {errors.password && <div className="error">{errors.password}</div>}

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

          <div className="auth-link-wrapper">
            <span>Don't have an account?</span>
            <Link to="/register" className="auth-link">
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
