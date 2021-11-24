import React, { Component } from "react";
import { Link } from "react-router-dom";

class Landing extends Component {
  render() {
    return (
      // <div className="full-screen-container">
      //   <div className="row">
      //     <div className="col s12 center-align white-text">
      //       <h4>
      //         Welcome to <b>MySports</b>
      //       </h4>
      //       <p className="flow-text white-text text-darken-1">
      //         Create or join sport events around you
      //       </p>
      //       <br />
      //       <div className="col s6">
      //         <Link
      //           to="/register"
      //           style={{
      //             width: "140px",
      //             borderRadius: "3px",
      //             letterSpacing: "1.5px",
      //           }}
      //           className="btn btn-large waves-effect waves-light hoverable red accent-3"
      //         >
      //           Register
      //         </Link>
      //       </div>
      //       <div className="col s6">
      //         <Link
      //           to="/login"
      //           style={{
      //             width: "140px",
      //             borderRadius: "3px",
      //             letterSpacing: "1.5px"
      //           }}
      //           className="btn btn-large btn-flat waves-effect white black-text"
      //         >
      //           Log In
      //         </Link>
      //       </div>
      //     </div>
      //   </div>
      // </div>
      <div className="full-screen-container">
        <div className="create-event-container">
          <h4 className="create-event-title">
            Welcome to <b>MySports</b>
          </h4>
          <p className="create-event-title">
            Create or join sport events around you
          </p>
          <div className="test">
            <form action="/register">
              <button type="submit" className="create-event-button">Register</button>
            </form>
            <form action="/login">
              <button type="submit" className="create-event-button">Log In</button>
            </form>
          </div>
        </div>
      </div >
    );
  }
}

export default Landing;
