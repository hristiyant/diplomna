import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Loader from "react-loader-spinner";

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

  function showButton(event) {
    if (props.auth.user.id === event.createdBy) {
      return true;
    }

    return false;
  }

  function filterCards() { }

  function onDeleteClick(event) {
    // loading = true
    console.log(event._id);
    deleteEvent(event._id)
      .then(res => setData(res.data));
    //loading = false
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
          {data.map((event, index) => (
            <div key={index} className="card-requests">
              <div className="card-header">
                From: {event.name}
                {/* <img className="profileUserImage" src="logo.png" alt="" /> */}
              </div>
              <div className="card-body">
                <span>{getDisplayDate(event.date)}</span>
                <span>{event.createdBy}</span>
                <div>{event.participants.length} / {event.quota}</div>
                {/* <div className="card__image"><img src={userData.picture.medium}/></div> */}
              </div>
              <div className="card-footer">
                {!showButton(event) && <button className="btn-accept" onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  onSubscribeClick(event);
                }}>SUBSCRIBE</button>}
                {showButton(event) && <button className="btn-accept btn-outline" onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  onDeleteClick(event)
                }}>CANCEL EVENT</button>}
              </div>
            </div>
          ))}
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