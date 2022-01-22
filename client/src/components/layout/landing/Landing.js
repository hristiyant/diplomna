import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import IconBadminton from "../../../assets/event-type-icons/badminton.svg";
import IconBasketball from "../../../assets/event-type-icons/basketball.svg";
import IconBox from "../../../assets/event-type-icons/box.svg";
import IconFootball from "../../../assets/event-type-icons/football.svg";
import IconGolf from "../../../assets/event-type-icons/golf.svg";
import IconHandball from "../../../assets/event-type-icons/handball.svg";
import IconHockey from "../../../assets/event-type-icons/hockey.svg";
import IconRugby from "../../../assets/event-type-icons/rugby.svg";
import IconRunning from "../../../assets/event-type-icons/running.svg";
import IconSwimming from "../../../assets/event-type-icons/swimming.svg";
import IconTableTennis from "../../../assets/event-type-icons/table-tennis.svg";
import IconTennis from "../../../assets/event-type-icons/tennis.svg";
import IconTriathlon from "../../../assets/event-type-icons/triathlon.svg";
import IconVolleyball from "../../../assets/event-type-icons/volleyball.svg";

import "./Landing.css"

const Landing = (props) => {
  useEffect(() => {
    if (props.auth.isAuthenticated) {
      props.history.push("/dashboard");
    }
  })

  return (
    <div className="container-landing">
      <div className="container-landing-icons">
        <img src={IconBadminton} alt="" />
        <img src={IconBasketball} alt="" />
        <img src={IconBox} alt="" />
        <img src={IconFootball} alt="" />
        <img src={IconGolf} alt="" />
        <img src={IconHandball} alt="" />
        <img src={IconHockey} alt="" />
        <img src={IconRugby} alt="" />
        <img src={IconRunning} alt="" />
        <img src={IconSwimming} alt="" />
        <img src={IconTableTennis} alt="" />
        <img src={IconTennis} alt="" />
        <img src={IconTriathlon} alt="" />
        <img src={IconVolleyball} alt="" />
      </div>
      <h1 className="landing-greeting">
        Welcome to <b>MySports</b>
      </h1>
      <p className="landing-title">
        Create or join sport events around you
      </p>
      <div className="buttons">
        <button type="submit" className="btn-dashboard secondary landing" onClick={(e) => {
          e.preventDefault();
          props.history.push("/register");
        }}>REGISTER</button>
        <button type="submit" className="btn-dashboard landing" onClick={(e) => {
          e.preventDefault();
          props.history.push("/login");
        }}>LOG IN</button>
      </div>
    </div>
  );
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps
)(Landing);