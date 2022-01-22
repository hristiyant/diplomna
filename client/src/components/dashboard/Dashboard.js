import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Scrollbars } from "react-custom-scrollbars";
import Loader from "react-loader-spinner";

import { Avatar } from 'antd';
import { UserOutlined, ExportOutlined, PlusOutlined } from "@ant-design/icons"

import { HEADER_REQUEST_FAILED_TEXT, MESSAGE_UNABLE_TO_FETCH_TEXT, showUnableToFetchAlert, showConfirmAlert, showUsersListAlert, showLocationDetailsAlert, TITLE_OOPS_TEXT } from "../../components/custom/CustomAlertBox"
import { showNoData } from "../custom/CustomNoData";
import { logoutUser } from "../../actions/authActions";
import { getUpcomingEvents, unsubscribeToEvent, deleteEvent } from "../../actions/eventActions";
import { getDisplayDate } from "../../utils/DateUtils";
import { getEventTypeIcon } from "../../utils/EventTypeIconSelector"

import "./Dashboard.css"

const Dashboard = (props) => {
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = props.auth;

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);

      let res = await getUpcomingEvents(user.id);
      setUpcomingEvents(res.data)
      // console.log(res)
      setIsLoading(false);
    } catch (error) {
      console.log(JSON.stringify(error));
      const alertProps = {
        header: HEADER_REQUEST_FAILED_TEXT,
        title: TITLE_OOPS_TEXT,
        message: MESSAGE_UNABLE_TO_FETCH_TEXT,
        actionPrimary: () => fetchData(),
        actionSecondary: () => { }
      }
      showUnableToFetchAlert(alertProps);
      // userData = [];
    }
  }, [user.id])

  useEffect(() => {
    // console.log("PROPS: " + JSON.stringify(user));
    fetchData();
  }, [fetchData])

  const onLogoutClick = e => {
    props.logoutUser();
    props.history.push("/login");
  };

  const onCreateEventClick = e => {
    props.history.push("/create-event");
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
    return (user.id === event.createdBy._id);
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

  function onUnsubscribeClick(event) {
    const alertProps = {
      message: "Are you sure you want unsubscribe from \"" + event.name + "\"",
      actionPrimary: async () => {
        setIsLoading(true);

        await unsubscribeToEvent(user.id, event._id);

        fetchData();
      }
    }

    showConfirmAlert(alertProps);
  }

  function onCancelClick(event) {
    const alertProps = {
      message: "Are you sure you want to cancel \"" + event.name + "\"",
      actionPrimary: async () => {
        setIsLoading(true);

        await deleteEvent(event._id);

        fetchData();
      }
    }

    showConfirmAlert(alertProps);
  }

  const showUpcomingEvents = () => {
    return (
      <div className="container-events cards-grid">
        <Scrollbars className="my-scrollbar" style={{ width: "100%", height: "100%" }}
          renderTrackVertical={props => <div {...props} className="track-vertical" />}
          renderThumbVertical={props => <div {...props} className="thumb-vertical" />}
          renderView={props => <div {...props} className="view" />}
        >
          {upcomingEvents.map((event, index) => (
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
                </div>
              </div>
              <div className="card-event-footer">
                <div className="btn-dashboard" onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  onUnsubscribeClick(event);
                }}>UNSUBSCRIBE</div>
                {showCancelEventButton(event) && <div className="btn-dashboard" onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  onCancelClick(event);
                }}>CANCEL EVENT</div>}
              </div>
            </div>
          ))}
        </Scrollbars>
      </div >
    );
  }

  return (
    <div className="container-dashboard">
      <div className="container-dashboard-header">
        <h1>
          {user.name.split(" ")[0]}'s dashboard
        </h1>
        <div className="buttons">
          <button type="submit" className="btn-dashboard secondary"
            onClick={onLogoutClick}
          >
            <ExportOutlined />LOG OUT
          </button>
          <button type="submit" className="btn-dashboard"
            onClick={onCreateEventClick}
          >
            <PlusOutlined />CREATE EVENT
          </button>
        </div>
        <h3 style={{ color: "white", textAlign: "center", marginTop: "1rem" }}>Upcoming events:</h3>
      </div>
      {isLoading ? showLoader() : !upcomingEvents.length ? showNoData() : showUpcomingEvents()}
    </div>
  );
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  getUpcomingEvents: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  events: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  events: state.events
});

export default connect(
  mapStateToProps,
  { logoutUser, getUpcomingEvents }
)(Dashboard);