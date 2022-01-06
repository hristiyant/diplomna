import React from "react";
import { confirmAlert } from 'react-confirm-alert';
import { FrownFilled, CloseOutlined } from "@ant-design/icons"

import "./CustomAlertBox.css"

export const showAlert = (props, actionPrimary, actionSecondary) => {
    return confirmAlert({
        customUI: ({ onClose }) => {
            return (
                <div className='custom-alert-container'>
                    <div className="custom-alert-container-header">
                        <h1>Request Failed</h1>
                        <CloseOutlined className="icon-close" onClick={onClose} />
                    </div>
                    <div className="custom-alert-container-body">
                        <div className="body-title">
                            <FrownFilled />
                            <h1 style={{ color: "white" }}>Oops... Something went wrong!</h1>
                        </div>
                        <div className="body-message">
                            <div>{props.message}</div>
                        </div>
                        <div className="body-options">
                            <button className="options-button" onClick={() => {
                                actionPrimary();
                                onClose();
                            }}>{props.buttonPrimaryText}</button>
                            <button className="options-button" onClick={() => {
                                actionSecondary();
                                onClose();
                            }}>{props.buttonSecondaryText}</button>
                        </div>
                    </div>
                </div >
            );
        }
    });
}