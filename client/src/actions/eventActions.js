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
// export const getEvents = dispatch => {
//   axios
//     .post("/api/events/get")
//     .then(console.log())
//     // .then(res => history.push("/events"));
//     // .catch(err =>
//     //   dispatch({
//     //     type: GET_ERRORS,
//     //     payload: err.response.data
//     //   })
//     // );
// };