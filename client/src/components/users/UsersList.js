import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Loader from "react-loader-spinner";
import { Avatar } from 'antd'
import { UserOutlined, UserAddOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';

import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { Scrollbars } from "react-custom-scrollbars";

import { getAllUsers, createFriendRequest, removeFriends, deleteFriendRequest } from "../../actions/authActions"

import "./UsersList.css"

const UserCard = ({ user, loggedInUser }) => {
    const [currentUser, setCurrentUser] = useState(user);

    function checkIfRequestSent(user) {
        return user.friendRequests.some(request => request.fromUser === loggedInUser.id);
    }

    function checkIfFriends(user) {
        return user.friends.includes(loggedInUser.id);
    }

    async function onAddFriendClick(user) {
        let res = await createFriendRequest(loggedInUser.id, user._id);

        setCurrentUser(res);
    }

    async function onRemoveFriendClick(user) {
        let res = await removeFriends(loggedInUser.id, user._id);

        setCurrentUser(res.data);
    }

    async function onCancelRequestClick(user) {
        let res = await deleteFriendRequest(user._id, loggedInUser.id)

        setCurrentUser(res.data);
    }

    function showUser(user) {
        return user._id !== loggedInUser.id;
    }

    return (showUser(currentUser) &&
        <div className="card-user">
            <div className="card-user-body">
                <div className="card-user-body-left">
                    <Avatar className="avatar" shape="circle" src={currentUser.imageUrl} size={64} icon={<UserOutlined />} />
                </div>
                <div className="card-user-body-right">
                    <div className="card-user-header">{currentUser.name}</div>
                    <div>{currentUser.email}</div>
                    {checkIfFriends(currentUser) && <div className="friends"><CheckOutlined style={{ color: "greenyellow" }} /> Friends</div>}
                </div>
            </div>
            <div className="card-event-footer">
                {!checkIfFriends(currentUser) && !checkIfRequestSent(currentUser) && <button className="btn-user-add-friend" onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    onAddFriendClick(currentUser);
                }}><UserAddOutlined style={{ fontSize: "15px", paddingRight: "5px" }} />Add Friend</button>}
                {checkIfFriends(currentUser) && <div className="btn-user-add-friend btn-outline" onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    onRemoveFriendClick(currentUser);
                }}><CloseOutlined style={{ fontSize: "15px", paddingRight: "5px" }} />Remove Friend</div>}
                {checkIfRequestSent(currentUser) && <div className="btn-user-add-friend btn-outline" onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    onCancelRequestClick(currentUser);
                }}><CloseOutlined style={{ fontSize: "15px", paddingRight: "5px" }} />Cancel Request</div>}
            </div>
        </div>
    )
}
const UsersList = (props) => {
    const [initialUsersData, setInitialUsersData] = useState([]);
    const [usersData, setUsersData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        (async () => {
            let userData;

            try {
                await getAllUsers()
                    .then(res => userData = res);
            } catch (error) {
                console.log(error);
                userData = [];
            }

            setInitialUsersData(userData);
            setUsersData(userData);
            setIsLoading(false);
        })();
    }, []);

    const filterUsers = user => {
        const value = user.target.value.toLowerCase();
        const filteredUsers = initialUsersData.filter(user =>
            (`${user.name}`.toLowerCase().includes(value))
        );

        setUsersData(filteredUsers);
    }

    function showLoader() {
        return (<Loader
            type="MutatingDots"
            color="tomato"
            secondaryColor="white"
            height={100}
            width={100}
            timeout={3000} //3 secs
        />)
    }



    function showContent() {
        return (
            <div className="container-users" >
                <div className="top-bar">
                    <input className="search-box-users" onInput={filterUsers} placeholder="Search..." />
                </div>
                <div className="container-users cards-grid">
                    <Scrollbars className="my-scrollbar" style={{ width: "100%", height: "100%" }}
                        renderTrackVertical={props => <div {...props} className="track-vertical" />}
                        renderThumbVertical={props => <div {...props} className="thumb-vertical" />}
                        renderView={props => <div {...props} className="view" />}
                    >
                        {usersData.map((user, index) => {
                            return <UserCard key={index} user={user} loggedInUser={props.auth.user} />
                        })}
                    </Scrollbars>
                </div >
            </div >
        );
    }

    return (
        isLoading ? showLoader() : showContent()
    );
}

UsersList.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps
)(UsersList);