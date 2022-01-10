import React from "react";
import { confirmAlert } from 'react-confirm-alert';
import { Avatar } from 'antd';
import { FrownFilled, CloseOutlined, QuestionOutlined, UserOutlined } from "@ant-design/icons"

import "./CustomAlertBox.css"

export const HEADER_REQUEST_FAILED_TEXT = "Request Failed";
export const HEADER_CONFIRM_TEXT = "Confirm";
export const TITLE_OOPS_TEXT = "Oops... Something went wrong!";
export const MESSAGE_UNABLE_TO_FETCH_TEXT = "Unable to fetch records. Please try again in a few moments...";
export const MESSAGE_NOT_ABLE_TO_LOGIN = "Unable to log in. Please try again in a few moments...";
export const BTN_YES_TEXT = "Yes";
export const BTN_NO_TEXT = "No";
export const BTN_RETRY_TEXT = "RETRY";
export const BTN_DASHBOARD_TEXT = "DASHBOARD";

export const showLoginFailedAlert = () => {
    return confirmAlert({
        customUI: ({ onClose }) => {
            return (
                <div className='custom-alert-container'>
                    <div className="custom-alert-container-header">
                        <h1>{HEADER_REQUEST_FAILED_TEXT}</h1>
                        <CloseOutlined className="icon-close" onClick={onClose} style={{ color: 'white' }} />
                    </div>
                    <div className="custom-alert-container-body">
                        <div className="body-title">
                            <FrownFilled style={{ fontSize: "x-large" }} />
                            <h1 style={{ color: "white" }}>{TITLE_OOPS_TEXT}</h1>
                        </div>
                        <div className="body-message">
                            <div>{MESSAGE_NOT_ABLE_TO_LOGIN}</div>
                        </div>
                        <div className="body-options">
                            <button className="options-button" onClick={() => {
                                onClose();
                            }}>OK</button>
                        </div>
                    </div>
                </div >
            );
        }
    });
}

export const showUnableToFetchAlert = props => {
    return confirmAlert({
        customUI: ({ onClose }) => {
            return (
                <div className='custom-alert-container'>
                    <div className="custom-alert-container-header">
                        <h1>{props.header}</h1>
                        <CloseOutlined className="icon-close" onClick={onClose} style={{ color: 'white' }} />
                    </div>
                    <div className="custom-alert-container-body">
                        <div className="body-title">
                            <FrownFilled style={{ fontSize: "x-large" }} />
                            <h1 style={{ color: "white" }}>{props.title}</h1>
                        </div>
                        <div className="body-message">
                            <div>{props.message}</div>
                        </div>
                        <div className="body-options">
                            <button className="options-button" onClick={() => {
                                props.actionPrimary();
                                onClose();
                            }}>{BTN_RETRY_TEXT}</button>
                            <button className="options-button" onClick={() => {
                                props.actionSecondary();
                                onClose();
                            }}>{BTN_DASHBOARD_TEXT}</button>
                        </div>
                    </div>
                </div >
            );
        }
    });
}

export const showConfirmAlert = (props) => {
    return confirmAlert({
        customUI: ({ onClose }) => {
            return (
                <div className='custom-alert-container'>
                    <div className="custom-alert-container-header">
                        <h1>{HEADER_CONFIRM_TEXT}</h1>
                        <CloseOutlined className="icon-close" onClick={onClose} style={{ color: 'white' }} />
                    </div>
                    <div className="custom-alert-container-body">
                        <div className="body-title">
                            <QuestionOutlined style={{ fontSize: "x-large" }} />
                            <h1 style={{ color: "white" }}>{props.title}</h1>
                        </div>
                        <div className="body-message">
                            <div>{props.message}</div>
                        </div>
                        <div className="body-options">
                            <button className="options-button" onClick={() => {
                                props.actionPrimary();
                                onClose();
                            }}>{BTN_YES_TEXT}</button>
                            <button className="options-button" onClick={() => {
                                onClose();
                            }}>{BTN_NO_TEXT}</button>
                        </div>
                    </div>
                </div >
            );
        }
    });
}

export const showUsersListAlert = props => {
    console.log(props.data)
    return confirmAlert({
        customUI: ({ onClose }) => {
            return (
                <div className="custom-alert-container ">
                    <div className="custom-alert-container-header">
                        <h1>{props.title}</h1>
                        <CloseOutlined className="icon-close" fill="white" onClick={onClose} />
                    </div>
                    <div className="custom-alert-container-body">
                        {!props.data.length && <div style={{ color: "white", margin: "20px", fontSize: "large" }}>No records found...</div>}
                        {props.data.map((user, index) => (
                            <div key={index} className="container-users-list-row">
                                <Avatar
                                    className="avatar-user-alert"
                                    shape="circle"
                                    size={50}
                                    src={user.imageUrl}
                                    icon={<UserOutlined />} />
                                <div style={{ marginLeft: "10px" }}>{user.name}</div>
                            </div>
                        ))}
                    </div>
                </div>
            );
        }
    });
}