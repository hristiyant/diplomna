import React, { Component } from "react";

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
      <div className="container">
        <div className="container-landing">
        <h4 className="create-event-title">
          Welcome to <b>MySports</b>
        </h4>
        <p className="create-event-title">
          Create or join sport events around you
        </p>
        <ul className="nav-links">
          <li>
            <form action="/register">
              <button type="submit" className="create-event-button">Register</button>
            </form>
          </li>
          <li>
            <form action="/login">
              <button type="submit" className="create-event-button">Log In</button>
            </form>
          </li>
        </ul>
        {/* <div className="create-event-container">
          <div className="test" >
          </div>
        </div> */}
        </div>
      </div>
    );
  }
}

export default Landing;
