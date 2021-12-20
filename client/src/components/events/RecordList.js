import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Loader from "react-loader-spinner";

import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { Scrollbars } from "react-custom-scrollbars";

import { getEvents, subscribeToEvent, deleteEvent } from "../../actions/eventActions";
import { getDisplayDate } from "../../utils/DateUtils";


import "../../utils/EventsTable.css";

const RecordList = (props) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const content = isLoading ? showLoader() : showContent();

  useEffect(() => {
    console.log("user: " + props.auth.user.id)
    getEvents()
      .then(res => {
        setData(res.data);
        setIsLoading(false);
      })
  }, []);

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

  function showSubscribeButton(event) {
    if (showCancelEventButton(event) || event.participants.length === event.quota || event.participants.includes(props.auth.user.id)) {
      return false;
    }

    return true;
  }

  function showCancelEventButton(event) {
    if (props.auth.user.id === event.createdByID) {
      return true;
    }

    return false;
  }

  function filterCards() { }

  async function onDeleteClick(event) {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className='custom-ui'>
            <h1>Cancel event</h1>
            <p>Are you sure you want to cancel this event?</p>
            <div className="alert-buttons">
              <button
                onClick={() => {
                  setIsLoading(true)
                  deleteEvent(event._id)
                    .then(res => {
                      setData(res.data)
                      setIsLoading(false);
                    });
                  onClose();
                }}
              >
                Yes
              </button>
              <button onClick={onClose}>No</button>
            </div>
          </div>
        );
      }
    });
  }

  function onSubscribeClick(event) {
    // loading = true
    subscribeToEvent(props.auth.user.id, event._id)
      .then(res => setData(res.data))
    // loading = false
  }

  function showContent() {
    return (
      <div className="friend-requests" >
        <input className="search-box" onInput={filterCards} placeholder="Search..." />
        <div className="cards-grid-requests">
          <Scrollbars className="my-scrollbar" style={{ width: "100%", height: "100%" }}
            renderTrackVertical={props => <div {...props} className="track-vertical" />}
            renderThumbVertical={props => <div {...props} className="thumb-vertical" />}
            renderView={props => <div {...props} className="view" />}
          >
            {data.map((event, index) => (
              <div key={index} className="card-requests">
                <div className="card-header">
                  {event.name}
                  {/* <img className="profileUserImage" src="logo.png" alt="" /> */}
                </div>
                <div className="card-body">
                  <span>Date: {getDisplayDate(event.date)}</span>
                  <div>Created by: {event.createdByName}</div>
                  <div>Participants: {event.participants.length} / {event.quota}</div>
                  {/* <div className="card__image"><img src={userData.picture.medium}/></div> */}
                </div>
                <div className="card-footer">
                  {showSubscribeButton(event) && <button className="btn-accept" onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    onSubscribeClick(event);
                  }}>SUBSCRIBE</button>}
                  {showCancelEventButton(event) && <button className="btn-accept btn-outline" onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    onDeleteClick(event)
                  }}>CANCEL EVENT</button>}
                </div>
              </div>
            ))}
          </Scrollbars>
        </div>
      </div >
    );
  }

  return (
    <div>{content}</div>
  );
}

RecordList.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps
)(RecordList);