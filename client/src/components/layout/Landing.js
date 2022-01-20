import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import "./Landing.css"

const Landing = (props) => {
  useEffect(() => {
    if (props.auth.isAuthenticated) {
      props.history.push("/dashboard");
    }
  })

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

Landing.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps
)(Landing);