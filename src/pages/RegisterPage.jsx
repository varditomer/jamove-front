import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "react-toastify";

import Headphones from "../assets/images/headphones.png";
import RegisterImg from "../assets/images/register_img.png";
import EyeClosedIcon from "../assets/images/eye_closed_icon.png";
import EyeOpenIcon from "../assets/images/eye_open_icon.png";

export const RegisterPage = ({ isAdmin = false }) => {
  const navigate = useNavigate();
  const { register } = useAuth();

  // Form data state
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    instrument: "",
  });

  // Error and loading states
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Show password state
  const [showPassword, setShowPassword] = useState(false);

  // Instruments options array for select
  const instruments = [
    "Singer",
    "Drums",
    "Guitar",
    "Bass",
    "Saxophone",
    "Keyboard",
    "Vocals",
    "Other",
  ];

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  // Form validation method
  const validateForm = () => {
    const newErrors = {};
    if (!formData.username) newErrors.username = "Username is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (!isAdmin && !formData.instrument) {
      newErrors.instrument = "Please select your instrument";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        setIsLoading(true);

        const userToRegister = {
          username: formData.username,
          password: formData.password,
          instrument: formData.instrument,
        };

        await register(userToRegister);

        // Show success message
        toast.success("Registration successful! Please log in.");

        // Navigate to login
        navigate("/login");
      } catch (err) {
        const errorMessage = err.message || "Registration failed";
        setErrors({ ...errors, general: errorMessage });
        toast.error(errorMessage);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="register-page">
      <section className="register-form-section">
        <h2 className="welcome-heading">Welcome to JaMoveo</h2>
        <h1 className="page-identify-title">
          {isAdmin ? "Admin Registration" : "Register"}
        </h1>

        {errors.general && (
          <div className="error-message">{errors.general}</div>
        )}

        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-control">
            <div className="label">Username*</div>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Select your username"
              disabled={isLoading}
            />
            {errors.username && <div className="error">{errors.username}</div>}
          </div>

          {!isAdmin && (
            <div className="form-control">
              <div className="label">Your Instrument*</div>
              <div className="custom-select-wrapper">
                <select
                  name="instrument"
                  value={formData.instrument}
                  onChange={handleChange}
                  disabled={isLoading}
                >
                  <option value="" className="placeholder-option">
                    Select your instrument
                  </option>
                  {instruments.map((instrument) => (
                    <option key={instrument} value={instrument}>
                      {instrument}
                    </option>
                  ))}
                </select>
              </div>
              {errors.instrument && (
                <div className="error">{errors.instrument}</div>
              )}
            </div>
          )}

          <div className="form-control">
            <div className="label">Create Password*</div>
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
          </div>

          <button className="btn-submit" type="submit" disabled={isLoading}>
            {isLoading ? "Registering..." : "Register"}
          </button>

          <div className="register-link-wrapper">
            <span>Already have an account?</span>
            <Link to="/login" className="register-link">
              Log in
            </Link>
          </div>
        </form>
      </section>

      <section className="cover-section">
        <img src={RegisterImg} alt="welcome_img" className="welcome-img" />
        <div className="title">
          <img src={Headphones} alt="headphones_logo" className="logo" />
          <span className="text">JAMOVEO</span>
        </div>
      </section>
    </div>
  );
};
