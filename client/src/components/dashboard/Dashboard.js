import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

import "./Dashboard.css"

const Dashboard = (props) => {
  const { user } = props.auth;

  const onLogoutClick = e => {
    e.preventDefault();
    props.logoutUser();
  };

  const onCreateEventClick = e => {
    e.preventDefault();
    props.history.push("/create-event");
  }

  return (
    <div className="dashboard-container">
      <h4>
        Hey there, {user.name.split(" ")[0]}
        <p>
          You are logged into MySports
        </p>
      </h4>
      <div className="buttons">
        <button className="btn-dashboard"
          onClick={onLogoutClick}
        >
          LOGOUT
        </button>
        <button className="btn-dashboard"
          onClick={onCreateEventClick}
        >
          CREATE EVENT
        </button>
      </div>
    </div>
  );
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Dashboard);
