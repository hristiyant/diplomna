import React from "react";

import { ReactComponent as NoData } from "../../assets/no-data.svg";

import "./CustomNoData.css"

const MESSAGE_NO_RECORDS_FOUND = "Sorry, no records found..."

export const showNoData = () => {
    return (
        <div className='custom-no-data-container'>
            <NoData className="custom-no-data-image" />
            <div className="custom-no-data-message">{MESSAGE_NO_RECORDS_FOUND}</div>
        </div >
    );
}