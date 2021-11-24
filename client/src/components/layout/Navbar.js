import React, { Component } from "react";

class Navbar extends Component {
  render() {
    return (
      <div className="navbar">
        <div className="navbar-links">
          {/* <ul> */}
          <li>
            <a href="/">
              <b>My</b><img className="my-logo" src="logo.png" alt="running man icon" /><b>ports</b></a>
          </li>
          {/* </ul> */}
        </div>
      </div>
    );
  }
}

export default Navbar;
