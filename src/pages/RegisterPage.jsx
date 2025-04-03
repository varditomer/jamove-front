import React from "react";
import { Link } from "react-router-dom";

import HeadphonesURL from "../assets/images/headphones.png";
import RegisterImgURL from "../assets/images/register_img.png";

export const RegisterPage = () => {
  return (
    <div className="register-page">
      <section className="register-form-section">
        <h2 className="welcome-heading">Welcome to JaMoveo</h2>
        <h1 className="page-identify-title">Register</h1>
        <form action="" className="register-form">
          <div className="form-control">
            <div className="label">Username*</div>
            <input type="text" placeholder="Select your username" />
          </div>
          <div className="form-control">
            <div className="label">Your instrument*</div>
            <select name="" id="" className="instrument-select">
              <option value="Guitar">Guitar</option>
            </select>
          </div>
          <div className="form-control">
            <div className="label">Create Password*</div>
            <input type="text" placeholder="Username" />
            <div className="password-actions">
              <div className="remember-me">
                <input type="checkbox" />
                <span className="text">Remember me</span>
              </div>
              <a href="/" className="forgot-password-link">
                Forgot Password ?
              </a>
            </div>
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
        <img src={RegisterImgURL} alt="welcome_img" className="welcome-img" />
        <div className="title">
          <img src={HeadphonesURL} alt="headphones_logo" className="logo" />
          <span className="text">JAMOVEO</span>
        </div>
      </section>
    </div>
  );
};
