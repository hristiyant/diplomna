
import React, { useState } from "react";
import { ReactComponent as CloseMenu } from "../../../assets/x.svg";
import { ReactComponent as MenuIcon } from "../../../assets/menu.svg";
import { ReactComponent as Logo } from "../../../assets/x.svg";
import { Link } from "react-router-dom";

import "./Navbar2.css";

const Navbar2 = () => {
    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    return (
        <div className="header">
            <div className="logo-nav">
                <div className="logo-container">
                    <Link to="/dashboard">
                        <b>My</b>
                        <img className="my-logo" src="logo.png" alt="running man icon" />
                        <b>ports</b>
                    </Link>
                </div>

                <ul className={click ? "nav-options active" : "nav-options"}>
                    <li className="option" onClick={closeMobileMenu}>
                        <Link to="/events">
                            EVENTS
                        </Link>
                    </li>
                    <li className="option" onClick={closeMobileMenu}>
                        <Link to="/users">
                            USERS
                        </Link>
                    </li>
                    <li className="option" onClick={closeMobileMenu}>
                        <Link to="/friend-requests">
                            REQUESTS
                        </Link>
                    </li>
                    <li className="option mobile-option" onClick={closeMobileMenu}>
                        <a href="/#">SIGN-IN</a>
                    </li>
                    <li className=" option mobile-option" onClick={closeMobileMenu}>
                        <a href="/" className="sign-up">
                            SIGN-UP
                        </a>
                    </li>
                </ul>
            </div>
            <ul className="signin-up">
                <li className="sign-in" onClick={closeMobileMenu}>
                    <a href="/#">SIGN-IN</a>
                </li>
                <li onClick={closeMobileMenu}>
                    <a href="/" className="signup-btn">
                        SIGN-UP
                    </a>
                </li>
            </ul>
            <div className="mobile-menu" onClick={handleClick}>
                {click ? (
                    <CloseMenu className="menu-icon" />
                ) : (
                    <MenuIcon className="menu-icon" />
                )}
            </div>
        </div>
    );
};

export default Navbar2;