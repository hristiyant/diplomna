import PropTypes from "prop-types";
import { useState, useEffect, useCallback } from "react";
import { connect } from "react-redux";
import Loader from "react-loader-spinner";
import { Scrollbars } from "react-custom-scrollbars";
import { Avatar, message, Radio } from 'antd';
import { UserOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';

import { getInvitations, deleteInvitation, acceptFriendRequest, acceptEventInvitation } from "../../../actions/authActions";
import { getDisplayDate } from "../../../utils/DateUtils";

import "./FriendRequests.css"
import { HEADER_REQUEST_FAILED_TEXT, MESSAGE_UNABLE_TO_FETCH_TEXT, showLocationDetailsAlert, showUnableToFetchAlert, TITLE_OOPS_TEXT } from "../../custom/CustomAlertBox";

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
            fetchData();
            message.success({
                content: "Invitation accepted",
                style: {
                    fontSize: "x-large"
                }
            }, 5);
        } else {
            console.log(request.event);
            let response = await acceptEventInvitation(request.fromUser._id, props.auth.user.id, request._id, request.event);
            fetchData();
            fetchData();
            message.success({
                content: "Invitation accepted",
                style: {
                    fontSize: "x-large"
                }
            }, 5);
        }
    }

    async function onRejectClick(request) {
        let response = await deleteInvitation(props.auth.user.id, request.fromUser._id, request._id);
        fetchData();
        message.success({
            content: "Invitation rejected",
            style: {
                fontSize: "x-large"
            }
        }, 5);
    }

    const fetchData = useCallback(async () => {
        try {
            setIsLoading(true);

            let res = await getInvitations(user.id)
            setData(res.data.filter(request => request.type === "FRIEND_REQUEST"));
            setAllRequests(res.data);
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
            // userData = [];
        }
    }, [user.id])

    useEffect(() => {
        fetchData()
    }, [fetchData])

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

    function onViewLocationClick(location) {
        const alertProps = {
            data: location,
            title: "Location"
        }

        showLocationDetailsAlert(alertProps);
    }

    function showEventInvitationCard(invitation, index) {
        console.log(invitation);
        return (
            <div key={index} className="card-requests">
                <div style={{ margin: "10px", fontSize: "large" }}>Event Invitation</div>
                <div className="card-requests-body">
                    <div className="card-requests-body-left">
                        <Avatar id="by-avatar" className="avatar-created-by" shape="circle" src={invitation.fromUser.imageUrl} size={64} icon={<UserOutlined />} />
                    </div>
                    <div className="card-requests-body-right">
                        <div className="card-requests-header">{invitation.fromUser.name}</div>
                        <span>{getDisplayDate(invitation.date)}</span>
                        <div className="card-requests-header">For event:</div>
                        <div>{invitation.event.name}</div>
                        <div>{getDisplayDate(invitation.event.date)}</div>
                        <div className="btn-view-participants" onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            onViewLocationClick(invitation.event.location);
                        }}>{invitation.event.location.name}</div>
                        {/* <span>{invitation.date}</span> */}
                    </div>
                </div>
                <div className="card-requests-footer">
                    <button className="btn-accept" onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        onAcceptClick(invitation)
                    }}><CheckOutlined style={{ fontSize: "15px", paddingRight: "5px" }} />Accept</button>
                    <button className="btn-accept btn-outline" onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        onRejectClick(invitation)
                    }}><CloseOutlined style={{ fontSize: "15px", paddingRight: "5px" }} />Reject</button>
                </div>
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

    function showInvitationCard(invitation, index) {
        if (invitation.type === "FRIEND_REQUEST") {
            return showFriendRequestCard(invitation, index);
        } else {
            return showEventInvitationCard(invitation, index)
        }
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
                        showInvitationCard(request, index)
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
