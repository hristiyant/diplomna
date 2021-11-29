import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getUser } from "../../actions/authActions";

class UserProfile extends Component {
    constructor() {
        super();
        this.state = {
            name: "",
            email: "",
            // friends: [],
            errors: {}
        };
    }
    componentDidMount() {
        //fetch user by id from db
        this.props.getUser(this.props.auth.user.id)
            .then(data => {
                console.log("RESULT: " + JSON.stringify(data));
                this.setState({
                    name: data.name,
                    email: data.email,
                    friends: data.friends
                })
            });
    }

    render() {
        return (
            <div style={{ height: "75vh" }} className="container valign-wrapper">
                <div className="row">
                    <div className="landing-copy col s12 center-align">
                        <h4>
                            {this.state.name}
                        </h4>
                        <h4>
                            {this.state.email}
                        </h4>
                    </div>
                </div>
            </div>
        );
    }
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
