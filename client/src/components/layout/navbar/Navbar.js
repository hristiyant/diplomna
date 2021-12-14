import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./Navbar.css"

class Navbar extends Component {
  render() {
    return (
      <header className="my-navbar" >
        <Link to="/">
          <b>My</b>
          <img className="my-logo" src="logo.png" alt="running man icon" />
          <b>ports</b>
        </Link>
        <nav>
          <ul className="nav-links">
            <li>
              <Link to="/events">
                Events
              </Link>
            </li>
            <li>
              <Link to="/users">
                Users
              </Link>
            </li>
            <li>
              <Link to="/">
                Home
              </Link>
            </li>
            <li>
              <Link to="/friend-requests">
                Requests
              </Link>
            </li>
          </ul>
        </nav>
        <Link style={{ }} to="/profile">
          Profile
        </Link>
      </header>
    );
  }
}

export default Navbar;
