import React, { Component } from "react";
import img from "../../images/login-banner.png"
import "./style.css";

class LoginForm extends Component {
  render() {
    return (
      <div>
        <div className="contact-wrap flex">
          <div className="contact-title">
            <img src={img} className="title-img" alt="" />
            <span className="section-header">CRYPTAX</span>
          </div>
          <form className="contact-form flex">
            <div className="input-wrap">
              <label className="input-label">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#999999"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-user"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </label>
              <input
                className="form-input"
                type="text"
                name="username"
                id="username"
                placeholder="Username"
              />
            </div>

            <div className="input-wrap">
              <label className="input-label">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#999999"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-lock"
                >
                  <rect
                    x="3"
                    y="11"
                    width="18"
                    height="11"
                    rx="2"
                    ry="2"
                  ></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
              </label>
              <input
                className="form-input"
                type="text"
                name="password"
                id="password"
                placeholder="Password"
              />
            </div>

            <div
              className="form-button-wrap intersect"
              data-animation="slideUp"
            >
              <button id="form-button">Submit</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default LoginForm;