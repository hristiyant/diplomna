import { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Loader from "react-loader-spinner";
import { Scrollbars } from "react-custom-scrollbars";

import { Avatar, message } from 'antd'
import { UserOutlined, CloseOutlined, PhoneOutlined } from '@ant-design/icons';

import { getUser, removeFriends, setProfileImage } from "../../actions/authActions";
import { storage } from "../../firebase/firebase";

import "./userProfile.css"
import { HEADER_REQUEST_FAILED_TEXT, MESSAGE_UNABLE_TO_FETCH_TEXT, showConfirmAlert, showUnableToFetchAlert, TITLE_OOPS_TEXT } from "../custom/CustomAlertBox";

const UserProfile = (props) => {
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [visible, setVisible] = useState(false);
    const [file, setFile] = useState(null);

    const fetchData = useCallback(async () => {
        try {
            setIsLoading(true);

            let res = await getUser(props.auth.user.id);
            setUser(res);
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
    }, [props.auth.user.id])

    useEffect(() => {
        fetchData();
    }, [fetchData])

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

    const onImageClick = (e) => {
        e.preventDefault();
        setVisible(!visible);
    }

    function handleChange(e) {
        setFile(e.target.files[0]);
    }

    function handleUpload(e) {
        e.preventDefault();
        setIsLoading(true)
        const ref = storage.ref(`/images/${props.auth.user.id}`);
        const uploadTask = ref.put(file);
        uploadTask.on("state_changed", console.log, console.error, () => {
            ref
                .getDownloadURL()
                .then(async (url) => {
                    setFile(null);
                    let res = await setProfileImage(props.auth.user.id, url)

                    setUser(prevState => ({
                        ...prevState,
                        imageUrl: res
                    }));

                    setIsLoading(false);
                });
        });
    }

    function onRemoveFriendClick(user) {
        const alertProps = {
            message: "Are you sure you want to remove \"" + user.name + "\" from friends",
            actionPrimary: async () => {
                setIsLoading(true);

                let res = await removeFriends(props.auth.user.id, user._id);

                setUser(res.data);
                setIsLoading(false);
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

    function displayUserCard() {
        return (
            <div className="profile">
                <div className="profileInfo">
                    <h1 className="profileInfoName" style={{ color: "white" }}>{user.name}</h1>
                    <div className="profileInfoDetails">
                        <span className="profileInfoEmail">{user.email}</span>
                        <span className="profileInfoEmail"><PhoneOutlined /> {user.phone}</span>
                    </div>
                    <img className="profileUserImage" src={user.imageUrl} onClick={onImageClick} alt="" />
                    {visible && <form className="form-change-pic" onSubmit={handleUpload}>
                        <input type="file" onChange={handleChange} />
                        <button className="btn-dashboard upload" disabled={!file}>Upload</button>
                    </form>}
                </div>
                <div className="profileFriends">
                    <Scrollbars className="my-scrollbar" style={{ width: "100%", height: "100%" }}
                        renderTrackVertical={props => <div {...props} className="track-vertical" />}
                        renderThumbVertical={props => <div {...props} className="thumb-vertical" />}
                        renderView={props => <div {...props} className="view" />}
                    >
                        {user.friends.map((user, index) => {
                            return (
                                <div className="card-user" key={index}>
                                    <div className="card-user-body">
                                        <div className="card-user-body-left">
                                            <Avatar className="avatar" shape="circle" src={user.imageUrl} size={64} icon={<UserOutlined />} />
                                        </div>
                                        <div className="card-user-body-right">
                                            <div className="card-user-header">{user.name}</div>
                                            <div><PhoneOutlined /> {user.phone}</div>
                                        </div>
                                    </div>
                                    <div className="card-event-footer">
                                        <div className="btn-dashboard secondary" onClick={(e) => {
                                            e.stopPropagation();
                                            e.preventDefault();
                                            onRemoveFriendClick(user);
                                        }}><CloseOutlined style={{ fontSize: "15px", paddingRight: "5px" }} />Remove</div>
                                    </div>
                                </div>
                            )
                        })}
                    </Scrollbars>
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