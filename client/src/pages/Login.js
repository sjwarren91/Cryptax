import React, { Component } from "react";
import LoginForm from "../components/LoginForm/index";

class Login extends Component {
  render() {
    return (
      <>
        <LoginForm getSession={this.props.getSession} />
      </>
    );
  }
}

export default Login
