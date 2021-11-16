import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../../App.css";

class Landing extends Component {
  render() {
    return (
      <div style={{ height: "75vh" }} className="container valign-wrapper">
        <div style={{
          backgroundColor: "rgba(0, 0, 0, 0.4)",
          borderRadius: "20px",
          height: "auto",
          width:"auto",
          position: "inherit"
        }} className="row">
          <div className="col s12 center-align white-text">
            <h4>
              Welcome to <b>MySports</b>
            </h4>
            <p className="flow-text white-text text-darken-1">
              Create or join sport events around you
            </p>
            <br />
            <div className="col s6">
              <Link
                to="/register"
                style={{
                  width: "140px",
                  borderRadius: "20px",
                  letterSpacing: "1.5px",
                }}
                className="btn btn-large waves-effect waves-light hoverable red accent-3"
              >
                <b>Register</b>
              </Link>
            </div>
            <div className="col s6">
              <Link
                to="/login"
                style={{
                  width: "140px",
                  borderRadius: "20px",
                  letterSpacing: "1.5px"
                }}
                className="btn btn-large btn-flat waves-effect white black-text"
              >
                <b>Log In</b>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;
