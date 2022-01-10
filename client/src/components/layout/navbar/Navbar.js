import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../../actions/authActions";
import { Avatar } from "antd"
import { UserOutlined, ImportOutlined, ExportOutlined, UnorderedListOutlined, TeamOutlined, UsergroupAddOutlined } from '@ant-design/icons';

import { ReactComponent as CloseMenu } from "../../../assets/x.svg";
import { ReactComponent as MenuIcon } from "../../../assets/menu.svg";
import DownIcon from "../../../assets/down.svg";

import "./Navbar.css";

const Navbar = (props) => {
    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    //profile menu
    const [clickProfile, setClickProfile] = useState(false);
    const handleClickProfile = () => setClickProfile(!clickProfile);
    const closeProfileMenu = () => setClickProfile(false);
    const options = props.auth.isAuthenticated ? showAuthenticatedOptions(clickProfile) : showDefaultOptions();

    var menuOption;
    var menuOptionMobile;

    useEffect(() => {
        // console.log(props.auth.user)
        // getUser(props.auth.user.id)
        //     .then(res => {
        //         setUser(res)
        //     });


        function handleEvent(e) {
            const isDropdownButton = e.target.matches("[data-dropdown-button]")
            if (!isDropdownButton) {
                closeProfileMenu()
            }
        };

        window.addEventListener("click", handleEvent);

        return () => {
            window.removeEventListener("click", handleEvent)
        }
    }, [props.auth])

    function onLogoutClick(e) {
        e.preventDefault()
        props.logoutUser()
    }

    function showAuthenticatedOptions(clickProfilee) {
        menuOption =
            <div className="nav-profile-options" data-dropdown-button>
                <div className="dropdown">
                    <button className="profile-button" data-dropdown-button onClick={() => {
                        handleClickProfile();
                    }}>
                        <Avatar size="large" className="profile-button-avatar" src={props.auth.user.imageUrl} alt="" />
                        <div className="profile-button-name" data-dropdown-button>{props.auth.user.name.split(" ")[0]}</div>
                        <img className="dropdown-icon" src={DownIcon} alt="" data-dropdown-button style={clickProfile ? { opacity: "0" } : { opacity: "1" }} />
                    </button>
                    <div className={clickProfilee ? "dropdown-menu active" : "dropdown-menu"}>
                        <Link className="option-profile" to="/profile" onClick={closeProfileMenu}>
                            <UserOutlined style={{ fontSize: "large" }} /> PROFILE
                        </Link>
                        <Link to="#" onClick={(e) => {
                            closeProfileMenu();
                            onLogoutClick(e);
                        }}>
                            <ExportOutlined style={{ fontSize: "large" }} /> LOG OUT
                        </Link>
                    </div>
                </div>
            </div>

        menuOptionMobile =
            <>
                <hr className="option mobile-option" style={{ backgroundColor: "white", width: "80%", height: ".5px", padding: "0px" }} />
                <li className="option mobile-option" onClick={closeMobileMenu}>
                    <Link className="option-profile" to="/profile" onClick={closeProfileMenu}>
                        <UserOutlined style={{ fontSize: "large" }} /> PROFILE
                    </Link>
                </li>
                <li className="option mobile-option" onClick={(e) => onLogoutClick(e)}>
                    <Link to="#" onClick={(e) => {
                        closeProfileMenu();
                        onLogoutClick(e);
                    }}>
                        <ExportOutlined style={{ fontSize: "large" }} /> LOG OUT
                    </Link>
                </li>
            </>
    }

    function showDefaultOptions() {
        menuOption =
            <div className="nav-profile-options">
                <Link className="option-profile" to="/login">
                    <ImportOutlined style={{ fontSize: "large" }} /> LOG IN
                </Link>
                <Link to="/register">
                    REGISTER
                </Link>
            </div >

        menuOptionMobile =
            <>
                <hr className="option mobile-option" style={{ backgroundColor: "white", width: "80%", height: ".5px", padding: "0px" }} />
                <li className="option mobile-option" onClick={closeMobileMenu}>
                    <Link to="/login">
                        <ImportOutlined style={{ fontSize: "large" }} /> LOG IN
                    </Link>
                </li>
                <li className="option mobile-option" onClick={closeMobileMenu}>
                    <Link to="/register">
                        REGISTER
                    </Link>
                </li>
            </>
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
            <div className="nav">
                <ul className={click ? "nav-options active" : "nav-options"}>
                    <li className="option" onClick={closeMobileMenu}>
                        <Link to="/events">
                            <UnorderedListOutlined style={{ fontSize: "large" }} /> EVENTS
                        </Link>
                    </li>
                    <li className="option" onClick={closeMobileMenu}>
                        <Link to="/users">
                            <TeamOutlined style={{ fontSize: "large" }} /> USERS
                        </Link>
                    </li>
                    <li className="option" onClick={closeMobileMenu}>
                        <Link to="/friend-requests">
                            <UsergroupAddOutlined style={{ fontSize: "large" }} /> REQUESTS
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

Navbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { logoutUser }
)(Navbar);