import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Loader from "react-loader-spinner";
import { Avatar } from 'antd'

import { getUser, setProfileImage } from "../../actions/authActions";
import { storage } from "../../firebase/firebase"

import "./userProfile.css"

const UserProfile = (props) => {
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [visible, setVisible] = useState(false);
    const [file, setFile] = useState(null);

    useEffect(() => {
        if (!props.auth.isAuthenticated) {
            props.history.push("/login");
        } else {
            getUser(props.auth.user.id)
                .then(res => {
                    setUser(res);
                    setIsLoading(false);
                });
        }
    }, [props.auth.user.id])

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
                .then((url) => {
                    setFile(null);
                    setProfileImage(props.auth.user.id, url)
                        .then(res => {
                            setUser(res.data)
                            setIsLoading(false)
                        })
                });
        });
    }

    function displayUserCard() {
        return (
            <div className="profile">
                <div className="profileInfo">
                    <img className="profileUserImage" src={user.imageUrl} onClick={onImageClick} alt="" />
                    {visible && <form onSubmit={handleUpload}>
                        <input type="file" onChange={handleChange} />
                        <button disabled={!file}>upload to firebase</button>
                    </form>}
                    <h4 className="profileInfoName">{user.name}</h4>
                    <span className="profileInfoEmail">{user.email}</span>
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