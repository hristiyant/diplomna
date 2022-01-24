import React, { useState, useEffect, useCallback } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Loader from "react-loader-spinner";
import { Scrollbars } from "react-custom-scrollbars";

import { Avatar } from 'antd';
import { UserOutlined, PlusOutlined } from '@ant-design/icons';

import { HEADER_REQUEST_FAILED_TEXT, MESSAGE_UNABLE_TO_FETCH_TEXT, showConfirmAlert, showUnableToFetchAlert, showUsersListAlert, TITLE_OOPS_TEXT } from "../../custom/CustomAlertBox";

import { getEvents, subscribeToEvent, unsubscribeToEvent, deleteEvent } from "../../../actions/eventActions";
import { getEventTypeIcon } from "../../../utils/EventTypeIconSelector"
import { getDisplayDate } from "../../../utils/DateUtils";
import { ReactComponent as GoingIcon } from "../../../assets/tick.svg";

import "./EventsList.css";

const EventsList = (props) => {
  const [initialEventsData, setInitialEventsData] = useState([]);
  const [eventsData, setEventsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isChecked, setIsChecked] = useState(true);

  const fetchEvents = useCallback(async () => {
    try {
      setIsLoading(true);

      let res = await getEvents();
      setEventsData(res.data);
      setInitialEventsData(res.data);
      console.log(JSON.stringify(res.data));
      setIsLoading(false);
    } catch (error) {
      const alertProps = {
        header: HEADER_REQUEST_FAILED_TEXT,
        title: TITLE_OOPS_TEXT,
        message: MESSAGE_UNABLE_TO_FETCH_TEXT,
        buttonPrimaryText: "RETRY",
        buttonSecondaryText: "DASHBOARD",
        actionPrimary: () => {
          fetchEvents()
        },
        actionSecondary: () => props.history.push("/dashboard")
      }
      showUnableToFetchAlert(alertProps);
    }
  }, [props.history])

  useEffect(() => {
    fetchEvents()
  }, [fetchEvents]);

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
        filteredEvents = initialEventsData.filter(
          event => event.participants.every(
            participant => participant._id === props.auth.user.id
          )
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
      timeout={10000}
    />)
  }

  function showCancelEventButton(event) {
    return (props.auth.user.id === event.createdBy._id);
  }

  function showGoing(event) {
    return (event.participants.some(e => e._id === props.auth.user.id));
  }

  function showSubscribeButton(event) {
    return !(showGoing(event) || event.participants.length === event.quota);
  }

  const onCreateEventClick = e => {
    e.preventDefault();

    props.history.push("/create-event");
  }

  function onSubscribeClick(event) {
    setIsLoading(true);

    subscribeToEvent(props.auth.user.id, event._id)
      .then(res => {
        setEventsData(res.data);
        setIsLoading(false);
      });
  }

  function onUnsubscribeClick(event) {
    setIsLoading(true);

    unsubscribeToEvent(props.auth.user.id, event._id)
      .then(res => {
        setEventsData(res.data);
        setIsLoading(false);
      });
  }

  function onViewParticipantsClick(participants) {
    const alertProps = {
      data: participants,
      title: "Participants"
    }

    showUsersListAlert(alertProps);
  }

  function onCancelClick(event) {
    const alertProps = {
      message: "Are you sure you want to cancel \"" + event.name + "\"",
      actionPrimary: () => {
        setIsLoading(true);

        deleteEvent(event._id)
          .then(res => {
            setEventsData(res.data);
            setInitialEventsData(res.data);
            setIsLoading(false);
          });
      }
    }

    showConfirmAlert(alertProps);
  }

  function showContent() {
    return (
      <div className="container-events" >
        <div className="side-bar">
          <button type="submit" className="btn-dashboard" style={{ margin: "5px" }}
            onClick={onCreateEventClick}
          >
            <PlusOutlined />CREATE EVENT
          </button>
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
                  <img className="icon-event-type" src={getEventTypeIcon(event.type)} alt="" />
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
                    <div className="btn-view-participants" onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      onViewParticipantsClick(event.participants);
                    }}>
                      Participants: <progress id="participants" className="progress-participants" value={event.participants.length} max={event.quota}></progress> {event.participants.length} / {event.quota}
                    </div>
                    <div>Location: {event.location.name}</div>
                    {showGoing(event) && <div className="going"><GoingIcon className="going-icon" /><span style={{ fontSize: "larger" }}>Going</span></div>}
                  </div>
                </div>
                <div className="card-event-footer">
                  {showGoing(event) && <div className="btn-dashboard" onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    onUnsubscribeClick(event)
                  }}>UNSUBSCRIBE</div>}
                  {showSubscribeButton(event) && <div className="btn-dashboard" style={{ background: "hsl(123deg 70% 28%)" }} onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    onSubscribeClick(event);
                  }}>SUBSCRIBE</div>}
                  {showCancelEventButton(event) && <div className="btn-dashboard" onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    onCancelClick(event)
                  }}>CANCEL EVENT</div>}
                </div>
              </div>
            ))}
          </Scrollbars>
        </div >
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