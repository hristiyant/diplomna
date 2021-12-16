import axios from "axios";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { connect } from "react-redux";

import { getFriendRequests, deleteFriendRequest, addFriends } from "../../../actions/authActions";
import { getDisplayDate } from "../../../utils/DateUtils";

import "./FriendRequests.css"

// import io from "socket.io-client";
// const ENDPOINT = "http://localhost:4000";

const FriendRequests = (props) => {
    const [data, setData] = useState([]);

    async function onAcceptClick(request) {
        let response = await addFriends(request.fromUserID, props.auth.user.id, request._id);
        setData(response.data);
    }

    async function onRejectClick(request) {
        let response = await deleteFriendRequest(props.auth.user.id, request._id);
        setData(response.data);
    }

    useEffect(() => {
        console.log(props);
        axios
            .get("/api/users/get-friend-requests", {
                params: {
                    id: props.auth.user.id
                }
            })
            .then(res => setData(res.data));
    }, [])

    return (
        // <div className="notifications-container">
        <div className="cards-grid-requests">
            {data.map((request, index) => (
                <div key={index} className="card">
                    <div className="card-header">
                        From: {request.fromUserName}
                        {/* <img className="profileUserImage" src="logo.png" alt="" /> */}
                    </div>
                    <div className="card-body">
                        <span>{getDisplayDate(request.date)}</span>
                        {/* <div className="card__image"><img src={userData.picture.medium}/></div> */}
                    </div>
                    <div className="card-footer">
                        <button className="btn-accept" onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            onAcceptClick(request)
                        }}>Accept</button>
                        <button className="btn-accept btn-outline" onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            onRejectClick(request)
                        }}>Reject</button>
                    </div>
                </div>
            ))}
        </div>
        // </div>
    )
}

FriendRequests.propTypes = {
    auth: PropTypes.object.isRequired,
    getFriendRequests: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { getFriendRequests }
)(FriendRequests);
