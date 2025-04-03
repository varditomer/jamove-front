import React from "react";
import LoginImgURL from "../assets/images/login_img.png";
import HeadphonesURL from "../assets/images/headphones.png";

export const LoginPage = () => {
  return (
    <div className="login-page">
      <section className="login-form-section">
        <h2 className="welcome-heading">Welcome to JaMoveo</h2>
        <h1 className="page-identify-title">Log in</h1>
        <form action="" className="login-form">
          <div className="form-control">
            <div className="label">Enter your Username*</div>
            <input type="text" placeholder="Username" />
          </div>
          <div className="form-control">
            <div className="label">Enter your Password*</div>
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

          <button className="btn-submit" type="submit">Log in</button>

          <div className="register-link-wrapper">
            <span>Don’t have an account?</span>
            <a href="/" className="register-link">
              Register
            </a>
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
