import { useState, useEffect } from "react";
import PropTypes from "prop-types";
// import axios from "axios";
import { connect } from "react-redux";
import { setProfileImage } from "../../../actions/authActions";
// import Loader from "react-loader-spinner";

import { Avatar, Checkbox } from "antd";
import { UserOutlined } from '@ant-design/icons';
import "antd/dist/antd.css";
// import "./userProfile.css"
import { Modal, Button } from 'antd';
import { storage } from "../../../firebase/firebase"

const UploadProfileImage = (props) => {
    const [file, setFile] = useState(null);
    const [url, setURL] = useState("");

    function handleChange(e) {
        setFile(e.target.files[0]);
    }

    function handleUpload(e) {
        e.preventDefault();
        const ref = storage.ref(`/images/${props.auth.user.id}`);
        const uploadTask = ref.put(file);
        uploadTask.on("state_changed", console.log, console.error, () => {
            ref
                .getDownloadURL()
                .then((url) => {
                    setFile(null);
                    setURL(url);
                    setProfileImage(props.auth.user.id, url)
                });
        });
    }

    const [visible, setVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState('Content of the modal');

    const showModal = () => {
        setVisible(true);
    };

    const handleOk = () => {
        setModalText('The modal will be closed after two seconds');
        setConfirmLoading(true);
        setTimeout(() => {
            setVisible(false);
            setConfirmLoading(false);
        }, 2000);
    };

    const handleCancel = () => {
        console.log('Clicked cancel button');
        setVisible(false);
    };

    useEffect(() => {



    }, [])

    return (
        <div>
            <h3>Profile pic</h3>
            <Avatar shape="square" size={64} icon={<UserOutlined />} />
            <Checkbox />
            <Button type="primary" onClick={showModal}>
                Open Modal with async logic
            </Button>
            <Modal
                title="Title"
                visible={visible}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
            >
                {/* <p>{modalText}</p> */}
            </Modal>
            <div>
                <form onSubmit={handleUpload}>
                    <input type="file" onChange={handleChange} />
                    <button disabled={!file}>upload to firebase</button>
                </form>
                <img src={url} alt="" />
            </div>
        </div>
    )
}

UploadProfileImage.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps
)(UploadProfileImage);
