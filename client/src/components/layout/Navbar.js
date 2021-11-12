import React, { Component } from "react";
import { Link } from "react-router-dom";

class Navbar extends Component {
  render() {
    return (
      <div className="navbar-absolute">
        <nav className="z-depth-0">
          <div className="nav-wrapper">
            <Link
              to="/"
              style={{
                fontFamily: "monospace"
              }}
              className="col s5 brand-logo center white-text"
            >
              <i 
              style={{
                marginRight: "1rem"
              }}
              className="material-icons">directions_run</i>
              MySports
            </Link>
          </div>
        </nav>
      </div>
    );
  }
}

export default Navbar;
