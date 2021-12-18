import React, { Component } from "react";

import "./Landing.css"

class Landing extends Component {
  render() {
    return (
      <div className="container-landing">
        <h4 className="landing-greeting">
          Welcome to <b>MySports</b>
        </h4>
        <p className="landing-title">
          Create or join sport events around you
        </p>
        {/* <ul className="nav-links">
          <li> */}
        <div className="landing-footer">
          <form action="/register">
            <button type="submit" className="landing-button-register">REGISTER</button>
          </form>
          {/* </li> */}
          {/*  <li> */}
          <form action="/login">
            <button type="submit" className="landing-button-log-in">LOG IN</button>
          </form>
        </div>
        {/* </li>
        </ul> */}
      </div>
    );
  }
}

export default Landing;
