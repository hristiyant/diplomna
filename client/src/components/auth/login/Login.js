import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";

import { Input } from "antd";

import { clearERROR, loginUser } from "../../../actions/authActions";
import { MESSAGE_NOT_ABLE_TO_LOGIN, showLoginFailedAlert } from "../../custom/CustomAlertBox";

import "./Login.css";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }

  loginUser = () => {
    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(userData);
  }

  componentDidMount() {
    this.props.clearERROR();
    
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.auth.isAuthenticated) {
      nextProps.history.push("/dashboard");
    }

    if (nextProps.errors.loginFailed) {
      showLoginFailedAlert({ message: MESSAGE_NOT_ABLE_TO_LOGIN });
    }

    if (nextProps.errors) {
      return ({
        errors: nextProps.errors
      });
    }
  }

  onChange = e => {
    this.props.clearERROR();

    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    this.loginUser();
  };


  render() {
    const { errors } = this.state;

    return (
      <div className="login-container">
        <div className="login-container-header">
          <h2 style={{ color: "white" }}>
            <b>Log in</b> below
          </h2>
          <p className="grey-text text-darken-1">
            Don't have an account?&ensp;<Link to="/register">Register</Link>
          </p>
        </div>
        <form noValidate onSubmit={this.onSubmit} style={{ width: "100%", maxWidth: "400px" }}>
          <div className="login-input-field">
            <Input
              placeholder="Email"
              onChange={this.onChange}
              value={this.state.email}
              error={errors.email}
              id="email"
              type="email"
              className={classnames("", {
                invalid: errors.email || errors.emailnotfound
              })}
            />
            <span className="red-text">
              {errors.email}
              {errors.emailnotfound}
            </span>
          </div>
          <div className="login-input-field">
            <Input.Password
              placeholder="Password"
              onChange={this.onChange}
              value={this.state.password}
              error={errors.password}
              id="password"
              type="password"
              className={classnames("", {
                invalid: errors.password || errors.passwordincorrect
              })}
            />
            <span className="red-text">
              {errors.password}
              {errors.passwordincorrect}
            </span>
          </div>
        </form>
        <button
          onClick={this.onSubmit}
          type="submit"
          className="btn-dashboard login"
          disabled={!this.state.email || !this.state.password}
        >
          LOG IN
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  clearERROR: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser, clearERROR }
)(Login);