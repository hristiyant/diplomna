import axios from "axios";

import { GET_ERRORS } from "./types";

// Create Event
export const createEvent = (eventData, history) => dispatch => {
  axios
    .post("/api/events/create", eventData)
    .then(res => history.push("/events"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Get List of All Events
export const getEvents = () => {
  return axios
    .get("/api/events/get-all")


  // .catch(err =>
  //   dispatch({
  //     type: GET_ERRORS,
  //     payload: err.response.data
  //   })
  // );

  // return res;
};

// Subscribe for Event
export const subscribeToEvent = (userID, eventID) => {
  let res = axios
    .post("api/events/subscribe", {
      params: {
        eventID: eventID,
        userID: userID
      }
    });

  return res;
}

// Delet an Event
export const deleteEvent = (eventID) => {
  let res = axios
    .post("api/events/delete-event", {
      params: {
        eventID: eventID
      }
    });

  return res;
}