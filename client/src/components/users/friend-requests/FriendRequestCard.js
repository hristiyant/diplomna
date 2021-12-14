import "./FriendRequestCard.css";
import React from "react";
import { getDisplayDate } from "../../../utils/DateUtils";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteFriendRequest } from "../../../actions/authActions"
// import { createFriendRequest } from "../../actions/authActions";

export default function FriendRequestCard({ requestData, loggedInUser, history }) {

    function onAcceptClick() {
        console.log(requestData);
        console.log(loggedInUser);
    }

    function onRejectClick() {
        console.log(requestData);
        deleteFriendRequest(loggedInUser.id, requestData._id);
        history.push("/friend-requests");
    }

    return (
        <div className="card">
            <div className="card-header">
                From: {requestData.fromUserName}
                {/* <img className="profileUserImage" src="logo.png" alt="" /> */}
            </div>
            <div className="card-body">
                <span>{getDisplayDate(requestData.date)}</span>
                {/* <Location location={userData.location}/>
            <Phone number={userData.phone} type="Home"/>
            <Phone number={userData.cell} type="Cell"/> */}

                {/* <div className="card__image"><img src={userData.picture.medium}/></div> */}
            </div>
            <div class="card-footer">
                <button class="btn" onClick={onAcceptClick}>Accept</button>
                <button class="btn btn-outline" onClick={onRejectClick}>Reject</button>
            </div>
            {/* <button className="card-button-add-friend" onClick={onSendRequestClick}>Add Friend</button> */}
        </div>
    )
};