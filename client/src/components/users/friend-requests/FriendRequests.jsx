import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import Loader from "react-loader-spinner";
import { Scrollbars } from "react-custom-scrollbars";
import { Avatar } from 'antd'
import { UserOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';

import { getFriendRequests, deleteFriendRequest, addFriends } from "../../../actions/authActions";
import { getDisplayDate } from "../../../utils/DateUtils";

import "./FriendRequests.css"

const FriendRequests = (props) => {
    const [allRequests, setAllRequests] = useState([]);
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    async function onAcceptClick(request) {
        let response = await addFriends(request.fromUser._id, props.auth.user.id, request._id);
        setData(response.data);
    }

    async function onRejectClick(request) {
        let response = await deleteFriendRequest(props.auth.user.id, request._id);
        setData(response.data);
    }

    useEffect(() => {
        getFriendRequests(props.auth.user.id)
            .then(res => {
                setData(res.data);
                setAllRequests(res.data);
                setIsLoading(false);
            });
    }, [])

    const filterCards = event => {
        const value = event.target.value.toLowerCase();
        console.log(value)
        const filteredUsers = allRequests.filter(request => (`${request.fromUserName}`.toLowerCase().includes(value)));
        setData(filteredUsers);
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
        return (< div className="container-friend-requests" >
            <div className="top-bar">
                <input className="search-box-requests" onInput={filterCards} placeholder="Search..." />
            </div>
            <div className="container-friend-requests cards-grid">
                <Scrollbars className="my-scrollbar" style={{ width: "100%", height: "100%" }}
                    renderTrackVertical={props => <div {...props} className="track-vertical" />}
                    renderThumbVertical={props => <div {...props} className="thumb-vertical" />}
                    renderView={props => <div {...props} className="view" />}
                >
                    {data.map((request, index) => (
                        <div key={index} className="card-requests">
                            <div className="card-requests-body">
                                <div className="card-requests-body-left">
                                    <Avatar className="avatar-created-by" shape="circle" src={request.fromUser.imageUrl} size={64} icon={<UserOutlined />} />
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
