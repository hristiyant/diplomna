import axios from "axios";

import { GET_ERRORS } from "./types";

// Create Event
export const createEvent = (eventData, history) => dispatch => {
  axios
    .post("/api/events/create", eventData)
    .then(res => history.push("/events"));
  // .catch(err =>
  //   dispatch({
  //     type: GET_ERRORS,
  //     payload: err.response.data
  //   })
  // );
};

// Get List of All Events
export const getEvents = () => {
  let res = axios
    .get("/api/events/get-all");
  // .then(console.log())
  // .then(res => history.push("/events"));
  // .catch(err =>
  //   dispatch({
  //     type: GET_ERRORS,
  //     payload: err.response.data
  //   })
  // );

  return res;
};

// Subscribe for Event
export const subscribeForEvent = (userID, eventID) => {
  let res = axios
    .post("api/events/subscribe")

  return res;
}