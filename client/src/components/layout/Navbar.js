import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Logo from "../../../public/logo192.png"

class Navbar extends Component {

  componentDidUpdate() {
    if (this.props.auth.isAuthenticated) {
      console.log("USER LOGGED IN");
    } else {
      console.log("USER LOGGED OUT");
    }
  }

  render() {
    return (
      <div className="navbar-relative">
        {/* <div className="button center right">
          Hello
        </div> */}
        
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
                  // marginRight: "1rem",
                  fontSize: "2rem"
                }}
                className="material-icons">directions_run</i>
              MySports
            </Link>
            {this.props.auth.isAuthenticated ? <ProfileIcon /> : null}
          </div>
        </nav>
      </div>
    );
  }
}

function onClickBtn(e) {
  e.preventDefault();
  console.log("hello");
}

const ProfileIcon = () => {
  return (
  <button onClick={onClickBtn}
      style={{
        // backgroundColor: "white",
        // borderStyle: "solid",
        borderColor: "white",
        borderWidth: "2px",
        color: "white",
        borderRadius: "2rem",
        fontSize: "2rem",
        position: "absolute",
        float: "right",
        right: "0px",
        margin: "1rem",
        backgroundImage:Logo
        
      }}>
      {/* className="material-icons center">perm_identity</i> */}
      Text
  </button>)
}

Navbar.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps
)(Navbar);