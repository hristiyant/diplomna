import axios from "axios";

// Create Event
export const createEvent = async (eventData) => {
  await axios
    .post("/api/events/create", eventData)
};

// Get List of All Events
export const getEvents = () => {
  let res = axios
    .get("/api/events/get-all")

  return res;
};

// Subscribe to an Event
export const subscribeToEvent = async (userID, eventID) => {
  let res = await axios
    .post("api/events/subscribe", {
      params: {
        eventID: eventID,
        userID: userID
      }
    });

  return res;
}

// Unsubscribe to an Event
export const unsubscribeToEvent = async (userID, eventID) => {
  let res = await axios
    .post("api/events/unsubscribe", {
      params: {
        eventID: eventID,
        userID: userID
      }
    });

  return res;
}

// Delete an Event
export const deleteEvent = async (eventID) => {
  let res = await axios
    .post("api/events/delete-event", {
      params: {
        eventID: eventID
      }
    });

  return res;
}