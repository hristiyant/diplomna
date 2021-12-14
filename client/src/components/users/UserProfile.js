import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getUser } from "../../actions/authActions";
import Loader from "react-loader-spinner";

import "./userProfile.css"

class UserProfile extends Component {
    constructor() {
        super();
        this.state = {
            name: "",
            email: "",
            // friends: [],
            errors: {},
            isLoading: true
        };
    }

    componentDidMount() {
        //fetch user by id from db
        this.props.getUser(this.props.auth.user.id)
            .then(data => {
                console.log("RESULT: " + JSON.stringify(data));
                this.setState({
                    isLoading: false,
                    name: data.name,
                    email: data.email,
                    friends: data.friends
                })
            });
    }

    render() {
        return (
            this.state.isLoading ? showLoader() : displayUserCard(this.state.name, this.state.email)

            // <div style={{ height: "75vh" }} className="container valign-wrapper">
            //     <div className="row">
            //         <div className="landing-copy col s12 center-align">
            //             <h4>
            //                 {this.state.name}
            //             </h4>
            //             <h4>
            //                 {this.state.email}
            //             </h4>
            //         </div>
            //     </div>
            // </div>
        );
    }
}

function showLoader() {
    return (
        <Loader className="loader"
            type="MutatingDots"
            color="white"
            secondaryColor="tomato"
            height={100}
            width={100}
            timeout="50000"
            radius="10"
        />
    );
}

function displayUserCard(name, email) {
    return (
        <div className="profile">
            <div className="profileInfo">
                <img className="profileUserImage" src="logo.png" alt="" />
                <h4 className="profileInfoName">{name}</h4>
                <span className="profileInfoEmail">{email}</span>
            </div>
        </div>
    );
}

UserProfile.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { getUser }
)(UserProfile);
