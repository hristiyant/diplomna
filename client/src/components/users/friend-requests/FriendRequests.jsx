import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import Loader from "react-loader-spinner";
import { Scrollbars } from "react-custom-scrollbars";
import { Avatar, Radio } from 'antd';
import { UserOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';

import { getInvitations, deleteInvitation, acceptFriendRequest, acceptEventInvitation } from "../../../actions/authActions";
import { getDisplayDate } from "../../../utils/DateUtils";

import "./FriendRequests.css"

const FriendRequests = (props) => {
    const { user } = props.auth;
    const [value, setValue] = useState(1);
    const [allRequests, setAllRequests] = useState([]);
    const [data, setData] = useState([]);
    // const [friendRequests,]
    const [isLoading, setIsLoading] = useState(true);

    async function onAcceptClick(request) {
        if (request.type === "FRIEND_REQUEST") {
            let response = await acceptFriendRequest(request.fromUser._id, props.auth.user.id, request._id);
            setData(response.data.filter(request => request.type === "FRIEND_REQUEST"));
        } else {
            console.log(request.event);
            let response = await acceptEventInvitation(request.fromUser._id, props.auth.user.id, request._id, request.event);
            setData(response.data.filter(request => request.type === "EVENT"));
        }
    }

    async function onRejectClick(request) {
        let response = await deleteInvitation(props.auth.user.id, request.fromUser._id, request._id);
        setData(response.data);
    }

    useEffect(() => {
        console.log("USE EFFECT");
        setIsLoading(true)
        getInvitations(props.auth.user.id)
            .then(res => {
                setData(res.data.filter(request => request.type === "FRIEND_REQUEST"));
                setAllRequests(res.data);
                setIsLoading(false);
            });
    }, [props])

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

    const onChange = e => {
        setIsLoading(true);
        console.log('radio checked', e.target.value);
        let type = ""
        if (e.target.value === 1) {
            type = "FRIEND_REQUEST"
        } else {
            type = "EVENT"
        }
        const filteredUsers = allRequests.filter(request => request.type === type);
        setData(filteredUsers);
        setValue(e.target.value);
        setIsLoading(false)
    };

    function showEventInvitationCard(invitation) {
        return (
            <div className="invitation-event-container">
                <div>{invitation.name}</div>
                <div>{invitation.fromUser}</div>

            </div>
        );
    }

    function showFriendRequestCard(request, index) {
        return (
            <div key={index} className="card-requests">
                <div style={{ margin: "10px", fontSize: "large" }}>Friend Request</div>
                <div className="card-requests-body">
                    <div className="card-requests-body-left">
                        <Avatar id="by-avatar" className="avatar-created-by" shape="circle" src={request.fromUser.imageUrl} size={64} icon={<UserOutlined />} />
                    </div>
                    <div className="card-requests-body-right">
                        <div className="card-requests-header">{request.fromUser.name}</div>
                        <span>{getDisplayDate(request.date)}</span>
                    </div>
                </div>
                <div className="card-requests-footer">
                    <button className="btn-accept" onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        onAcceptClick(request)
                    }}><CheckOutlined style={{ fontSize: "15px", paddingRight: "5px" }} />Accept</button>
                    <button className="btn-accept btn-outline" onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        onRejectClick(request)
                    }}><CloseOutlined style={{ fontSize: "15px", paddingRight: "5px" }} />Reject</button>
                </div>
            </div>
        )
    }

    function showContent() {
        return (< div className="container-friend-requests" >
            <div className="top-bar">
                <h1 className="invitations-title">Waiting for response</h1>
                <Radio.Group onChange={onChange} value={value}>
                    {/* <Radio className="invitations-radio" value={1}>All</Radio> */}
                    <Radio className="invitations-radio" value={1}>Friend Requests</Radio>
                    <Radio className="invitations-radio" value={2}>Event Invitations</Radio>
                </Radio.Group>
            </div>
            <div className="container-friend-requests cards-grid">
                <Scrollbars className="my-scrollbar" style={{ width: "100%", height: "100%" }}
                    renderTrackVertical={props => <div {...props} className="track-vertical" />}
                    renderThumbVertical={props => <div {...props} className="thumb-vertical" />}
                    renderView={props => <div {...props} className="view" />}
                >
                    {data.map((request, index) => (
                        showFriendRequestCard(request, index)
                        // <div key={index} className="card-requests">
                        //     <div>{request.type}</div>
                        //     <div className="card-requests-body">
                        //         <div className="card-requests-body-left">
                        //             <Avatar className="avatar-created-by" shape="circle" src={request.fromUser.imageUrl} size={64} icon={<UserOutlined />} />
                        //         </div>
                        //         <div className="card-requests-body-right">
                        //             <div className="card-requests-header">{request.fromUser.name}</div>
                        //             <span>{getDisplayDate(request.date)}</span>
                        //         </div>
                        //     </div>
                        //     <div className="card-requests-footer">
                        //         <button className="btn-accept" onClick={(e) => {
                        //             e.stopPropagation();
                        //             e.preventDefault();
                        //             onAcceptClick(request)
                        //         }}><CheckOutlined style={{ fontSize: "15px", paddingRight: "5px" }} />Accept</button>
                        //         <button className="btn-accept btn-outline" onClick={(e) => {
                        //             e.stopPropagation();
                        //             e.preventDefault();
                        //             onRejectClick(request)
                        //         }}><CloseOutlined style={{ fontSize: "15px", paddingRight: "5px" }} />Reject</button>
                        //     </div>
                        // </div>
                    ))}
                </Scrollbars>
            </div>
        </div >)
    }

    return (
        isLoading ? showLoader() : showContent()
    );
}

FriendRequests.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps
)(FriendRequests);
