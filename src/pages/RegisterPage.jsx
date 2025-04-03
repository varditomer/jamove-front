import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Headphones from "../assets/images/headphones.png";
import RegisterImg from "../assets/images/register_img.png";
import EyeClosedIcon from "../assets/images/eye_closed_icon.png";
import EyeOpenIcon from "../assets/images/eye_closed_icon.png";

export const RegisterPage = ({ isAdmin = false }) => {
  const navigate = useNavigate();

  // form data state
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    instrument: "",
  });

  // form errors state
  const [errors, setErrors] = useState({});

  // show password state
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
      // TODO: Registration API call here
      console.log("Form submitted:", formData);
      navigate("/login");
    }
  };

  return (
    <div className="register-page">
      <section className="register-form-section">
        <h2 className="welcome-heading">Welcome to JaMoveo</h2>
        <h1 className="page-identify-title">
          {isAdmin ? "Admin Registration" : "Register"}
        </h1>
        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-control">
            <div className="label">Username*</div>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Select your username"
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
              />
              <button
                type="button"
                className="toggle-password-visibility"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                style={{ position: "absolute", right: "15px" }}
              >
                <img
                  src={showPassword ? EyeOpenIcon : EyeClosedIcon}
                  alt={showPassword ? "Hide password" : "Show password"}
                />
              </button>
            </div>
            {errors.password && <div className="error">{errors.password}</div>}
          </div>

          <button className="btn-submit" type="submit">
            Register
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
