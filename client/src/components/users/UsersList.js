import React, { useState, useEffect, useRef, useCallback } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Loader from "react-loader-spinner";
import { Avatar, message } from 'antd'
import { UserOutlined, UserAddOutlined, CheckOutlined, CloseOutlined, PhoneOutlined } from '@ant-design/icons';

import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { Scrollbars } from "react-custom-scrollbars";

import { getAllUsers, createFriendRequest, removeFriends, deleteInvitation } from "../../actions/authActions"
import { HEADER_REQUEST_FAILED_TEXT, MESSAGE_UNABLE_TO_FETCH_TEXT, showConfirmAlert, showUnableToFetchAlert, TITLE_OOPS_TEXT } from "../custom/CustomAlertBox";

import "./UsersList.css"


const UsersList = (props) => {
    const [initialUsersData, setInitialUsersData] = useState([]);
    const [usersData, setUsersData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = useCallback(async () => {
        try {
            setIsLoading(true);

            let res = await getAllUsers();
            setUsersData(res);
            setInitialUsersData(res);
            setIsLoading(false);
        } catch (error) {
            console.log(JSON.stringify(error));
            const alertProps = {
                header: HEADER_REQUEST_FAILED_TEXT,
                title: TITLE_OOPS_TEXT,
                message: MESSAGE_UNABLE_TO_FETCH_TEXT,
                actionPrimary: () => fetchData(),
                actionSecondary: () => { }
            }
            showUnableToFetchAlert(alertProps);
        }
    }, [])

    useEffect(() => {
        fetchData();
    }, [fetchData]);
    
    const filterUsers = e => {
        console.log(e.target.value.toLowerCase());
        const value = e.target.value.toLowerCase();
        let filteredUsers = initialUsersData.filter(user =>
            // console.log(user.name.toLowerCase().includes(value))
            (user.name.toLowerCase().includes(value))
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

    function checkIfRequestSent(user) {
        return user.invitations.some(invitation => invitation.fromUser === props.auth.user.id && invitation.type === "FRIEND_REQUEST");
    }

    function checkIfFriends(user) {
        return user.friends.some(friend => friend._id === props.auth.user.id);
    }
    
    async function onAddFriendClick(user) {
        await createFriendRequest(props.auth.user.id, user._id);

        fetchData(); 
        message.success({
            content: "Request has been sent",
            style: {
                fontSize:"x-large"
            }
        }, 5);
    }

    async function onCancelRequestClick(user){
        const alertProps = {
            message: "Are you sure you want to cancel the friend request",
            actionPrimary: async () => {

                await deleteInvitation(user._id,props.auth.user.id);

                fetchData();
                message.success({
                    content: "Request has been canceled",
                    style: {
                        fontSize:"x-large"
                    }
                }, 5);
            }
        }

        showConfirmAlert(alertProps);
        // await deleteInvitation(user._id,props.auth.user.id);

        // fetchData();
    }

    async function onRemoveFriendClick(user) {
        const alertProps = {
            message: "Are you sure you want to remove \"" + user.name + "\" from friends",
            actionPrimary: async () => {

                await removeFriends(props.auth.user.id, user._id);

                fetchData()
                // setUser(res.data);
                message.success({
                    content: "Successfully removed " + user.name + " from friends",
                    style: {
                        fontSize:"x-large"
                    }
                }, 5);
            }
        }

        showConfirmAlert(alertProps);
    }

    function showUser(user) {
        return user._id !== props.auth.user.id;
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
                        {usersData.map((currentUser, index) => {
                            return (showUser(currentUser) && <div className="card-user" key={index}>
                                <div className="card-user-body">
                                    <div className="card-user-body-left">
                                        <Avatar className="avatar" shape="circle" src={currentUser.imageUrl} size={64} icon={<UserOutlined />} />
                                    </div>
                                    <div className="card-user-body-right">
                                        <div className="card-user-header">{currentUser.name}</div>
                                        <div><PhoneOutlined /> {currentUser.phone}</div>
                                        {checkIfFriends(currentUser) && <div className="friends"><CheckOutlined style={{ color: "greenyellow" }} />&nbsp;Friends</div>}
                                    </div>
                                </div>
                                <div className="card-event-footer">
                                    {!checkIfFriends(currentUser) && !checkIfRequestSent(currentUser) && <button className="btn-dashboard" style={{ background: "hsl(123deg 70% 28%)" }}  onClick={(e) => {
                                        e.stopPropagation();
                                        e.preventDefault();
                                        onAddFriendClick(currentUser);
                                    }}><UserAddOutlined style={{ fontSize: "15px", paddingRight: "5px" }} />Add Friend</button>}
                                    {checkIfFriends(currentUser) && <div className="btn-dashboard secondary" onClick={(e) => {
                                        e.stopPropagation();
                                        e.preventDefault();
                                        onRemoveFriendClick(currentUser);
                                    }}><CloseOutlined style={{ fontSize: "15px", paddingRight: "5px" }} />Remove Friend</div>}
                                    {checkIfRequestSent(currentUser) && <div className="btn-dashboard secondary" onClick={(e) => {
                                        e.stopPropagation();
                                        e.preventDefault();
                                        onCancelRequestClick(currentUser);
                                    }}><CloseOutlined style={{ fontSize: "15px", paddingRight: "5px" }} />Cancel Request</div>}
                                </div>
                            </div>)
                        }
                        )}
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
    
    // const UserCard = ({ user, loggedInUser }) => {
    //     const [currentUser, setCurrentUser] = useState(user);
    
    //     function checkIfRequestSent(user) {
    //         console.log(user.invitations.some(invitation => invitation.fromUser === loggedInUser.id && invitation.type === "FRIEND_REQUEST"));
    //         return user.invitations.some(invitation => invitation.fromUser === loggedInUser.id && invitation.type === "FRIEND_REQUEST");
    //     }
    
    //     function checkIfFriends(user) {
    //         // console.log(user.friends);
    //         console.log(user.friends.some(friend => friend._id === loggedInUser.id));
    //         return user.friends.some(friend => friend._id === loggedInUser.id);
    //     }
    
    //     async function onAddFriendClick(user) {
    //         let res = await createFriendRequest(loggedInUser.id, user._id);
    
    //         setCurrentUser(res);
    //     }
    
    //     async function onRemoveFriendClick(user) {
    //         let res = await removeFriends(loggedInUser.id, user._id);
    
    //         setCurrentUser(res.data);
    //     }
    
    //     async function onCancelRequestClick(user) {
    //         // let res = await deleteFriendRequest(user._id, loggedInUser.id)
    
    //         // setCurrentUser(res.data);
    //     }
    
    //     function showUser(user) {
    //         return user._id !== loggedInUser.id;
    //     }
    
    //     return (showUser(currentUser) &&
    //         <div className="card-user">
    //             <div className="card-user-body">
    //                 <div className="card-user-body-left">
    //                     <Avatar className="avatar" shape="circle" src={currentUser.imageUrl} size={64} icon={<UserOutlined />} />
    //                 </div>
    //                 <div className="card-user-body-right">
    //                     <div className="card-user-header">{currentUser.name}</div>
    //                     <div>{currentUser.email}</div>
    //                     {checkIfFriends(currentUser) && <div className="friends"><CheckOutlined style={{ color: "greenyellow" }} /> Friends</div>}
    //                 </div>
    //             </div>
    //             <div className="card-event-footer">
    //                 {!checkIfFriends(currentUser) && !checkIfRequestSent(currentUser) && <button className="btn-user-add-friend" onClick={(e) => {
    //                     e.stopPropagation();
    //                     e.preventDefault();
    //                     onAddFriendClick(currentUser);
    //                 }}><UserAddOutlined style={{ fontSize: "15px", paddingRight: "5px" }} />Add Friend</button>}
    //                 {checkIfFriends(currentUser) && <div className="btn-user-add-friend btn-outline" onClick={(e) => {
    //                     e.stopPropagation();
    //                     e.preventDefault();
    //                     onRemoveFriendClick(currentUser);
    //                 }}><CloseOutlined style={{ fontSize: "15px", paddingRight: "5px" }} />Remove Friend</div>}
    //                 {checkIfRequestSent(currentUser) && <div className="btn-user-add-friend btn-outline" onClick={(e) => {
    //                     e.stopPropagation();
    //                     e.preventDefault();
    //                     // onCancelRequestClick(currentUser);
    //                 }}><CloseOutlined style={{ fontSize: "15px", paddingRight: "5px" }} />Cancel Request</div>}
    //             </div>
    //         </div>
    //     )
    // }