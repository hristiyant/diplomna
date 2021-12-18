import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import classnames from "classnames";

class Logout extends Component {
    constructor() {
        super();
        this.state = {
            errors: {}
        };
    }

    componentDidMount() {
        // If user logged out redirect back to landing page
        this.props.history.push("/");
        logoutUser();
    }

    // onSubmit = e => {
    //     e.preventDefault();

        
    // };
}

export default connect(
    { logoutUser }
  )(Logout);