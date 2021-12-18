import React, { useState } from "react";
import { ReactComponent as CloseMenu } from "../../../assets/x.svg";
import { ReactComponent as MenuIcon } from "../../../assets/x.svg";
import { ReactComponent as Logo } from "../../../assets/x.svg";
import { Link } from "react-router-dom";

import "./Navbar.css"

const Navbar = () => {
  // const [click, setClick] = useState(false);
  // const handleClick = () => setClick(!click);
  // const closeMobileMenu = () => setClick(false);

  // const toggleButton = document.getElementsByClassName("toggle-button")[0];
  // const navbarLinks = document.getElementsByClassName("navbar-links")[0];

  // toggleButton.addEventListener("click", () => {
  //   navbarLinks.classList.toggle("active");
  // })

  return (
    <nav className="navbar">
      <div className="brand-title">Title</div>
      <a href="/#" className="toggle-button">
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </a>
      <div className="navbar-links">
        <ul>
          <li>
            <Link to="/profile">
              Profile
            </Link>
          </li>
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
      </div>
    </nav>

    // <header className="my-navbar" >
    //   <Link to="/">
    //     <b>My</b>
    //     <img className="my-logo" src="logo.png" alt="running man icon" />
    //     <b>ports</b>
    //   </Link>
    //   <nav>
    //     <ul className="nav-links">
    //       <li>
    //         <Link to="/events">
    //           Events
    //         </Link>
    //       </li>
    //       <li>
    //         <Link to="/users">
    //           Users
    //         </Link>
    //       </li>
    //       <li>
    //         <Link to="/">
    //           Home
    //         </Link>
    //       </li>
    //       <li>
    //         <Link to="/friend-requests">
    //           Requests
    //         </Link>
    //       </li>
    //     </ul>
    //   </nav>
    //   <Link style={{ }} to="/profile">
    //     Profile
    //   </Link>
    // </header>
  );
}

export default Navbar;
