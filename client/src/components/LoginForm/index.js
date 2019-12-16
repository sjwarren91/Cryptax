import React, { Component } from "react";
import img from "../../images/login-banner.png";
import API from "../../utils/API";
import "./style.css";

class LoginForm extends Component {
  state = {
    username: "",
    password: "",
    signup: false
  };

  handleInputChange = event => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });
  };

  handleLogin = event => {
    event.preventDefault();
    API.signIn({
      username: this.state.username,
      password: this.state.password
    }).then(data => {
      this.props.getSession();
    });
  };

  handleSignup = event => {
    event.preventDefault();
    this.setState({
      signup: true
    });
  };

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
                onChange={this.handleInputChange}
                value={this.state.username}
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
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                onChange={this.handleInputChange}
                value={this.state.password}
              />
            </div>
            {this.state.signup ? (
              <div className="details">
                <div className="details-wrap">
                  <label className="input-label">
                    {/* <svg
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
                    </svg> */}
                  </label>
                  <input
                    className="form-input"
                    type="text"
                    name="firstname"
                    id="firstname"
                    placeholder="First Name"
                    onChange={this.handleInputChange}
                    value={this.state.password}
                  />
                </div>
                <div className="details-wrap">
                  <label className="input-label">
                    {/* <svg
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
                    </svg> */}
                  </label>
                  <input
                    className="form-input"
                    type="text"
                    name="lastname"
                    id="lastname"
                    placeholder="Last Name"
                    onChange={this.handleInputChange}
                    value={this.state.password}
                  />
                </div>
              </div>
            ) : null}

            <div className="button-group">
              {!this.state.signup ? (
                <div className="form-button-wrap intersect">
                  <button id="form-button" onClick={this.handleLogin}>
                    Log In
                  </button>
                </div>
              ) : null}

              <div className="form-button-wrap intersect">
                <button id="form-button" onClick={this.handleSignup}>
                  Sign Up
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default LoginForm;
