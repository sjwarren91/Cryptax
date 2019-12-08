import React, { Component } from "react";
import "./style.css";

class LoginForm extends Component {
  render() {
    return (
      <div>
        <div className="contact-wrap flex">
          <div className="contact-title intersect" data-animation="slideLeft">
            {/* <img src="./assets/images/formimg.jpg" alt="" /> */}
            <span className="section-header">Want to get in touch?</span>
          </div>
          <form className="contact-form flex">
            <div className="input-wrap intersect" data-animation="slideRight">
              <label htmlFor="" className="input-label">
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
                name="name"
                id="name"
                placeholder="Full name"
              />
            </div>

            <div className="input-wrap intersect" data-animation="slideRight">
              <label htmlFor="" className="input-label">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#999999"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="feather feather-lock"
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
                name="email"
                id="email"
                placeholder="E.g example@email.com"
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
