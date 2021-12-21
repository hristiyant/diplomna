import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getUser } from "../../actions/authActions";
import Loader from "react-loader-spinner";

import "./userProfile.css"

const UserProfile = (props) => {
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getUser(props.auth.user.id)
            .then(res => {
                setUser(res);
                setIsLoading(false);
            });
    }, [])

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

    return (
        isLoading ? showLoader() : displayUserCard(user.name, user.email)
    );
}

UserProfile.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps
)(UserProfile);
