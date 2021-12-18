import { useEffect } from "react";
import "./UserCard.css";
import { getUser, createFriendRequest } from "../../actions/authActions";
import { GET_ERRORS } from "../../actions/types";

const UserCard = ({ userData, loggedInUser }) => {

    function onAddFriendClick() {
        console.log(loggedInUser);
        // checkIfFriends(loggedInUser.id, userData._id)
        createFriendRequest(loggedInUser.id, userData._id)
            .then(res => userData = res)

        //hideAddFriendButton
    }

    function showAddFriendButton() {
        return (
            <button class="btn" onClick={onAddFriendClick}>Add Friend</button>
        );
    }

    function showRemoveFriendButton() {
        return (
            <button class="btn btn-outline">Remove Friend</button>
        );
    }

    function checkIfFriends() {
        return !userData.friends.includes(loggedInUser.id);
    }

    return (
        <div className="card">
            <div className="card-header">
                {userData.name}
                {/* <img className="profileUserImage" src="logo.png" alt="" /> */}
            </div>
            <div className="card-body">
                <span>{userData.email}</span>
                {/* <div className="card__image"><img src={userData.picture.medium}/></div> */}
            </div>
            <div class="card-footer">
                {checkIfFriends() ? showAddFriendButton() : showRemoveFriendButton()}
                {/* <button class="btn" onClick={onAddFriendClick}>Add Friend</button> */}
                {/* <button class="btn btn-outline">Remove Friend</button> */}
            </div>
        </div>
    )
};

export default UserCard;