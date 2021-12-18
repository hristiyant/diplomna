
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../../actions/authActions";

import { ReactComponent as CloseMenu } from "../../../assets/x.svg";
import { ReactComponent as MenuIcon } from "../../../assets/menu.svg";
// import { ReactComponent as Logo } from "../../../assets/x.svg";

import "./Navbar2.css";

const Navbar2 = (props) => {
    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);
    const options = props.auth.isAuthenticated ? showAuthenticatedOptions() : showDefaultOptions();

    var menuOption;
    var menuOptionMobile;

    useEffect(() => {
        return () => {

        }
    }, [props.auth.isAuthenticated])

    function showAuthenticatedOptions() {
        menuOption =
            <ul className="signin-up">
                <li className="sign-in" onClick={closeMobileMenu}>
                    LOG OUT
                </li>
                <li onClick={closeMobileMenu}>
                    PROFILE
                </li>
            </ul>

        menuOptionMobile =
            <>
                <li className="option mobile-option" onClick={(e) => onLogoutClick(e)}>
                    LOG OUT
                </li>
                <li className="option mobile-option" onClick={closeMobileMenu}>
                    PROFILE
                </li>
            </>
    }

    function showDefaultOptions() {
        menuOption =
            <ul className="signin-up">
                <li className="sign-in" onClick={closeMobileMenu}>
                    {/* <a href="/#">SIGN-IN</a> */}
                    SIGN IN
                </li>
                <li onClick={closeMobileMenu}>
                    {/* <a href="/" className="signup-btn"> */}
                    SIGN-UP
                    {/* </a> */}
                </li>
            </ul>

        menuOptionMobile =
            <>
                <li className="option mobile-option" onClick={(e) => onLogoutClick(e)}>
                    {/* <button onClick={(e) => onLogoutClick(e)}>Register</button> */}
                    REGISTER
                </li>
                <li className="option mobile-option" onClick={closeMobileMenu}>
                    {/* <a href="/" className="sign-up"> */}
                    Log In
                    {/* </a> */}
                </li>
            </>
    }

    function onLogoutClick(e) {
        e.preventDefault()
        props.logoutUser()
    }

    return (
        <div className="header">
            <div className="logo-container">
                <Link to="/dashboard">
                    <b>My</b>
                    <img className="my-logo" src="logo.png" alt="running man icon" />
                    <b>ports</b>
                </Link>
            </div>
            <div className="logo-nav">
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
                    {menuOptionMobile}
                </ul>
            </div>
            {menuOption}
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

Navbar2.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { logoutUser }
)(Navbar2);
// export default Navbar2;