import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Loader from "react-loader-spinner";
import { Avatar } from 'antd'
import { UserOutlined } from '@ant-design/icons';

import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { Scrollbars } from "react-custom-scrollbars";

import { getEvents, subscribeToEvent, deleteEvent } from "../../../actions/eventActions";
import { getDisplayDate } from "../../../utils/DateUtils";
import { ReactComponent as GoingIcon } from "../../../assets/tick.svg";

import "./EventsList.css";

const EventsList = (props) => {
  const [initialEventsData, setInitialEventsData] = useState([]);
  const [eventsData, setEventsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isChecked, setIsChecked] = useState(true);

  useEffect(() => {
    getEvents()
      .then(res => {
        setEventsData(res.data);
        setInitialEventsData(res.data);
        setIsLoading(false);
      })
  }, []);

  const filterEvents = event => {
    const value = event.target.value.toLowerCase();
    const filteredEvents = initialEventsData.filter(event =>
      (`${event.name}`.toLowerCase().includes(value))
    );

    setEventsData(filteredEvents);
  }

  const onInputChanged = event => {
    setIsChecked(false);
    const value = event.target.value;
    console.log(value)
    var filteredEvents;

    switch (value) {
      case "CREATED":
        filteredEvents = initialEventsData.filter(event =>
          (`${event.createdBy._id}` === props.auth.user.id)
        );
        break;
      case "GOING":
        filteredEvents = initialEventsData.filter(event =>
          (`${event.participants}`.includes(props.auth.user.id))
        );
        break;
      default: // case "ALL"
        setIsChecked(true);
        filteredEvents = initialEventsData;
        break;
    }

    setEventsData(filteredEvents);
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

  function showCancelEventButton(event) {
    if (props.auth.user.id === event.createdBy._id) {
      return true;
    }

    return false;
    // return true;
  }

  function showGoing(event) {
    if (showCancelEventButton(event) || event.participants.includes(props.auth.user.id)) {
      return true;
    }

    return false;
  }

  function showSubscribeButton(event) {
    if (showGoing(event) || event.participants.length === event.quota) {
      return false;
    }

    return true;
    // return true;
  }

  function onSubscribeClick(event) {
    // loading = true
    subscribeToEvent(props.auth.user.id, event._id)
      .then(res => setEventsData(res.data))
    // loading = false
  }

  async function onCancelClick(event) {
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
                      setEventsData(res.data);
                      setInitialEventsData(res.data);
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


  function showContent() {
    return (
      <div className="container-events" >
        <div className="side-bar">
          <Link to="/create-event" className="link-create-new-event">CREATE NEW EVENT</Link>
          <input className="search-box-events" onInput={filterEvents} placeholder="Search..." />
          <div className="filter">
            <div className="input-group-events" onChange={onInputChanged}>
              <div className="radio-item">
                <input id="all" type="radio" value="ALL" name="event-filter" defaultChecked={isChecked} />
                <label htmlFor="all">All</label>
              </div>
              <div className="radio-item">
                <input id="created" type="radio" value="CREATED" name="event-filter" />
                <label htmlFor="created">Created by me</label>
              </div>
              <div className="radio-item">
                <input id="going" type="radio" value="GOING" name="event-filter" />
                <label htmlFor="going">Going</label>
              </div>
            </div>
          </div>
        </div>
        <div className="container-events cards-grid">
          <Scrollbars className="my-scrollbar" style={{ width: "100%", height: "100%" }}
            renderTrackVertical={props => <div {...props} className="track-vertical" />}
            renderThumbVertical={props => <div {...props} className="thumb-vertical" />}
            renderView={props => <div {...props} className="view" />}
          >
            {eventsData.map((event, index) => (
              <div key={index} className="card-event">
                <div className="card-event-header">
                  {event.name}
                </div>
                <div className="card-event-body">
                  <div className="card-event-left">
                    <div>Created by:</div>
                    <Avatar className="avatar-created-by" shape="circle" src={event.createdBy.imageUrl} size="large" icon={<UserOutlined />} />
                    <div>{event.createdBy.name}</div>
                  </div>
                  <div className="card-event-right">
                    <span>Date: {getDisplayDate(event.date)}</span>
                    <div>Participants: {event.participants.length} / {event.quota}
                    </div>
                    <progress id="participants" className="progress-participants" value={event.participants.length} max={event.quota}></progress>
                    {/* <div className="card__image"><img src={userData.picture.medium}/></div> */}
                    {showGoing(event) && <div className="going"><GoingIcon className="going-icon" /><span>Going</span></div>}
                  </div>
                </div>
                <div className="card-event-footer">
                  {showSubscribeButton(event) && <div className="btn-event-subscribe" onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    onSubscribeClick(event);
                  }}>SUBSCRIBE</div>}
                  {showCancelEventButton(event) && <div className="btn-event-subscribe btn-outline" onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    onCancelClick(event)
                  }}>CANCEL EVENT</div>}
                </div>
              </div>
            ))}
          </Scrollbars>
        </div>
      </div >
    );
  }

  return (
    isLoading ? showLoader() : showContent()
  );
}

EventsList.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps
)(EventsList);