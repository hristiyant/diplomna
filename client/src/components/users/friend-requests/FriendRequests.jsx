import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import Loader from "react-loader-spinner";

import { getFriendRequests, deleteFriendRequest, addFriends } from "../../../actions/authActions";
import { getDisplayDate } from "../../../utils/DateUtils";

import "./FriendRequests.css"

// import io from "socket.io-client";
// const ENDPOINT = "http://localhost:4000";

const FriendRequests = (props) => {
    const [allRequests, setAllRequests] = useState([]);
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    async function onAcceptClick(request) {
        let response = await addFriends(request.fromUserID, props.auth.user.id, request._id);
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
        return (< div className="friend-requests" >
            <input className="search-box" onInput={filterCards} placeholder="Search..." />
            <div className="cards-grid-requests">
                {data.map((request, index) => (
                    <div key={index} className="card-requests">
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
