import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Scrollbars } from "react-custom-scrollbars";

import { Avatar } from 'antd';
import { UserOutlined, ExportOutlined, PlusOutlined } from "@ant-design/icons"

import { showNoData } from "../custom/CustomNoData";
import { logoutUser } from "../../actions/authActions";
import { getUpcomingEvents } from "../../actions/eventActions";
import { getDisplayDate } from "../../utils/DateUtils";
import { getEventTypeIcon } from "../../utils/EventTypeIconSelector"
import { ReactComponent as GoingIcon } from "../../assets/tick.svg";

import "./Dashboard.css"

const Dashboard = (props) => {
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const { user } = props.auth;

  useEffect(() => {
    (async () => {
      let userData;

      try {
        let res = await getUpcomingEvents(user.id)

        setUpcomingEvents(res.data)
        console.log(res)
      } catch (error) {
        console.log(error);
        userData = [];
      }

      // setInitialUsersData(userData);
      // setUsersData(userData);
      // setIsLoading(false);
    })();
    // fetchData()
    // console.log("RESPONSE: " + JSON.stringify(props.events))
    // setUpcomingEvents(props.events)
  }, [])

  const fetchData = async () => {
    // await props.getUpcomingEvents(user.id);
  }

  const onLogoutClick = e => {
    e.preventDefault();

    props.logoutUser();
    props.history.push("/login");
  };

  const onCreateEventClick = e => {
    e.preventDefault();

    props.history.push("/create-event");
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
                  <span>Date: {getDisplayDate(event.date)} @ {event.time}</span>
                  <div className="btn-view-participants" onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    // onViewParticipantsClick(event.participants);
                  }}>
                    Participants: <progress id="participants" className="progress-participants" value={event.participants.length} max={event.quota}></progress> {event.participants.length} / {event.quota}
                  </div>
                  <div>Location: {event.location.name}</div>
                  {/* {showGoing(event) && <div className="going"><GoingIcon className="going-icon" /><span style={{ fontSize: "larger" }}>Going</span></div>} */}
                </div>
              </div>
              <div className="card-event-footer">
                {/* {showGoing(event) && <div className="btn-event-subscribe btn-outline" onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  onUnsubscribeClick(event)
                }}>UNSUBSCRIBE</div>} */}
                {/* {showSubscribeButton(event) && <div className="btn-event-subscribe" onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  onSubscribeClick(event);
                }}>SUBSCRIBE</div>} */}
                {/* {showCancelEventButton(event) && <div className="btn-event-subscribe btn-outline" onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  onCancelClick(event)
                }}>CANCEL EVENT</div>} */}
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
        <h3 style={{ color: "white", textAlign: "center", marginTop:"1rem" }}>Upcoming events:</h3>
      </div>
      {!upcomingEvents.length ? showNoData() : showUpcomingEvents()}
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
