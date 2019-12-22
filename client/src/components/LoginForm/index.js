import React, { useState, useEffect } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import img from "../../images/login-banner.png";
import API from "../../utils/API";
import "./style.css";

function LoginForm() {
  const [inputValue, setInputValue] = useState({
    username: "",
    password: "",
    firstname: "",
    lastname: ""
  });

  const [signup, setSignup] = useState(false);

  useEffect(() => {
    setSignup(false)
  }, [])

  const handleInputChange = event => {
    const { name, value } = event.target;
    setInputValue({ ...inputValue, [name]: value });
  };

  const handleLogin = event => {
    event.preventDefault();
    API.signIn({
      username: inputValue.username,
      password: inputValue.password
    }).then(data => {
      this.props.getSession();
    });
  };


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
              onChange={handleInputChange}
              value={inputValue.username}
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
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
            </label>
            <input
              className="form-input"
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              onChange={handleInputChange}
              value={inputValue.password}
            />
          </div>
            <CSSTransition in={signup} timeout={1000} classNames="signup">
                <div className="details">
                  <div className="details-wrap">
                    <label className="input-label"></label>
                    <input
                      className="form-input"
                      type="text"
                      name="firstname"
                      id="firstname"
                      placeholder="First Name"
                      onChange={handleInputChange}
                      value={inputValue.firstname}
                    />
                  </div>

                  <div className="details-wrap">
                    <label className="input-label"></label>
                    <input
                      className="form-input"
                      type="text"
                      name="lastname"
                      id="lastname"
                      placeholder="Last Name"
                      onChange={handleInputChange}
                      value={inputValue.lastname}
                    />
                  </div>
                </div>
            </CSSTransition>

        </form>
          <div className="button-group">
            <div className="form-button-wrap intersect">
              <button onClick={handleLogin}>Log In</button>
            </div>

            <div className="form-button-wrap intersect">
              <button onClick={() => setSignup(!signup)}>Sign Up</button>
            </div>
          </div>
      </div>
    </div>
  );
}

export default LoginForm;
