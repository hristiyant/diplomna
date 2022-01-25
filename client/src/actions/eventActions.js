import axios from "axios";

// Create event
export const createEvent = async (eventData) => {
  await axios
    .post("/api/events/create", eventData)
};

// Get list of all events
export const getEvents = () => {
  let res = axios
    .get("/api/events/get-all")

  return res;
};

// Subscribe to an event
export const subscribeToEvent = async (userID, eventID) => {
  const paramsObject = { eventID: eventID, userID: userID }
  const params = new URLSearchParams(paramsObject);

  let res = await axios
    .put("api/events/subscribe", null, { params });

  return res;
}

// Unsubscribe to an event
export const unsubscribeToEvent = async (userID, eventID) => {
  const paramsObject = { eventID: eventID, userID: userID }
  const params = new URLSearchParams(paramsObject);

  let res = await axios
    .delete("api/events/unsubscribe", { params });

  return res;
}

// Delete an event
export const deleteEvent = async (eventID) => {
  const params = new URLSearchParams([["eventID", eventID]]);

  let res = await axios
    .delete("api/events/delete", { params });

  return res;
}

// Get upcoming events
export const getUpcomingEvents = async userID => {
  console.log("METOHD CALLED")
  const params = new URLSearchParams([["userID", userID]]);

  let res = await axios
    .get("/api/events/upcoming-for", { params });

  // console.log(res)
  // dispatch({
  //   type: SET_UPCOMING_EVENTS,
  //   payload: res.data
  // });
  return res;
};