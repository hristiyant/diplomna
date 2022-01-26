import React, { useState, useEffect, useCallback } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Loader from "react-loader-spinner";
import { Scrollbars } from "react-custom-scrollbars";

import { Avatar, message, Radio } from 'antd';
import { UserOutlined, PlusOutlined, CheckOutlined } from '@ant-design/icons';

import { HEADER_REQUEST_FAILED_TEXT, MESSAGE_UNABLE_TO_FETCH_TEXT, showConfirmAlert, showLocationDetailsAlert, showUnableToFetchAlert, showUsersListAlert, TITLE_OOPS_TEXT } from "../../custom/CustomAlertBox";

import { getEvents, subscribeToEvent, unsubscribeToEvent, deleteEvent } from "../../../actions/eventActions";
import { getEventTypeIcon } from "../../../utils/EventTypeIconSelector"
import { getDisplayDate } from "../../../utils/DateUtils";
import { ReactComponent as GoingIcon } from "../../../assets/tick.svg";

import "./EventsList.css";

const EventsList = (props) => {
  const [value, setValue] = useState(1);
  const [initialEventsData, setInitialEventsData] = useState([]);
  const [eventsData, setEventsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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

  const onChange = e => {
    setIsLoading(true);
    var filteredEvents;

    switch (e.target.value) {
      case 2:
        filteredEvents = initialEventsData.filter(event =>
          (`${event.createdBy._id}` === props.auth.user.id)
        );
        break;
      case 3:
        filteredEvents = initialEventsData.filter(
          event => event.participants.every(
            participant => participant._id === props.auth.user.id
          )
        );
        break;
      default: // case "ALL"
        filteredEvents = initialEventsData;
        break;
    }

    setEventsData(filteredEvents);
    setValue(e.target.value);
    setIsLoading(false)
  };

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

  async function onSubscribeClick(event) {
    setIsLoading(true);

    let res = await subscribeToEvent(props.auth.user.id, event._id)
    setEventsData(res.data);
    setInitialEventsData(res.data);
    setIsLoading(false)
    message.success({
      content: "Subscribed to " + event.name,
      style: {
        fontSize: "x-large"
      }
    }, 5);
  }

  async function onUnsubscribeClick(event) {
    const alertProps = {
      message: "Are you sure you want unsubscribe from \"" + event.name + "\"",
      actionPrimary: async () => {
        setIsLoading(true);

        let res = await unsubscribeToEvent(props.auth.user.id, event._id)
        setEventsData(res.data);
        setInitialEventsData(res.data);
        setIsLoading(false);
        message.success({
          content: "Unsubscribed from " + event.name,
          style: {
            fontSize: "x-large"
          }
        }, 5);
      }
    }

    showConfirmAlert(alertProps);
  }

  function onViewParticipantsClick(participants) {
    const alertProps = {
      data: participants,
      title: "Participants"
    }

    showUsersListAlert(alertProps);
  }

  function onViewLocationClick(location) {
    const alertProps = {
      data: location,
      title: "Location"
    }

    showLocationDetailsAlert(alertProps);
  }

  function onCancelClick(event) {
    const alertProps = {
      message: "Are you sure you want to cancel \"" + event.name + "\"",
      actionPrimary: async () => {
        setIsLoading(true);

        let res = await deleteEvent(event._id);
        setEventsData(res.data);
        setInitialEventsData(res.data);
        setIsLoading(false);
        message.success({
          content: "Successfully canceled " + event.name,
          style: {
            fontSize: "x-large"
          }
        }, 5);
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
          {/* <div className="event-filters"> */}
          <input className="search-box-events" onInput={filterEvents} placeholder="Search by name..." />
          <Radio.Group className="radio-group-events" onChange={onChange} value={value}>
            <Radio className="invitations-radio" value={1}>All</Radio>
            <Radio className="invitations-radio" value={2}>Created by me</Radio>
            <Radio className="invitations-radio" value={3}>Going</Radio>
          </Radio.Group>
          {/* </div> */}
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
                    <div className="btn-view-participants" onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      onViewLocationClick(event.location);
                    }}>
                      Location: {event.location.name}
                    </div>
                    {showGoing(event) && <div className="going"><CheckOutlined style={{ color: "greenyellow" }} /><span >&nbsp;Going</span></div>}
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