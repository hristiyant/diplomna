import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import { CLEAR_ERRORS, GET_ERRORS, SET_CURRENT_USER, USER_LOADING } from "./types";

// Clear errors in store
export const clearERROR = () => dispatch => {
  dispatch({
    type: CLEAR_ERRORS,
  })
};

// Get User Info
export const getUser = async (userID) => {
  const params = new URLSearchParams([["userID", userID]]);

  const res = await axios
    .get("/api/users/", { params });

  console.log(JSON.stringify(res));
  return res.data;
};

//Get List of All Users
export const getAllUsers = async () => {
  let res = await axios.get("api/users/get-all");

  return res.data;
}

// Register User
export const registerUser = (userData, history) => async dispatch => {
  try {
    await axios.post("/api/users/register", userData)

    // Upon registering, redirect to login page
    history.push("/login")

  } catch (err) {
    if (typeof err.response.data === 'string') {
      dispatch({
        type: GET_ERRORS,
        payload: { loginFailed: err.response.data }
      })
    } else {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    }
  }
};


// Login - get user token
export const loginUser = userData => async dispatch => {
  try {
    let res = await axios.post("/api/users/login", userData);

    // Save to localStorage
    // Set token to localStorage
    const { token } = res.data;
    localStorage.setItem("jwtToken", token);
    // Set token to Auth header
    setAuthToken(token);
    // Decode token to get user data
    const decoded = jwt_decode(token);
    // Set current user
    dispatch(setCurrentUser(decoded));

  } catch (err) {
    if (typeof err.response.data === 'string') {
      dispatch({
        type: GET_ERRORS,
        payload: { loginFailed: err.response.data }
      })
    } else {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    }
  }
};

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// User loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING
  };
};

// Log user out
export const logoutUser = () => dispatch => {
  // Remove token from local storage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};

// Get all friend requests by user id
export const getInvitations = async userID => {
  console.log("GETTING INVITATIONS");
  let res = await axios
    .get("/api/users/get-invitations-for", {
      params: {
        userID: userID
      }
    });

  return res;
}

// Delete invitation
export const deleteInvitation = async (toUser, fromUser) => {
  const params = new URLSearchParams([["toUser", toUser], ["fromUser", fromUser]]);
  let res = await axios
    .delete("/api/users/delete-friend-request", {
      params
    });

  return res;
}

// Create friend request
export const createFriendRequest = async (fromUser, toUser) => {
  const params = new URLSearchParams([["fromUser", fromUser], ["toUser", toUser], ["type", "FRIEND_REQUEST"]]);
  const res = await axios
    .put("/api/users/send-invitation", null, { params });

  return res.data;
}

// Accept friend request
export const acceptFriendRequest = async (fromUser, toUser, invitationID) => {
  const params = new URLSearchParams([["fromUser", fromUser], ["toUser", toUser], ["invitationID", invitationID]]);
  let res = await axios
    .put("/api/users/accept-friend", null, {
      params
    });

  return res;
}


// Accept event invitation
export const acceptEventInvitation = async (fromUser, toUser, invitationID, event) => {
  const params = new URLSearchParams([["fromUser", fromUser], ["toUser", toUser], ["invitationID", invitationID], ["event", event]]);
  let res = await axios
    .put("/api/users/accept-event", null, {
      params
    });

  return res;
}

// Remove user from friends
export const removeFriends = async (userID, friendID) => {
  const params = new URLSearchParams([["userID", userID], ["friendID", friendID]]);

  let res = await axios
    .put("/api/users/remove-friend", null, { params });

  return res;
}

// Set profile pic url from firebase storage
export const setProfileImage = async (userID, imageUrl) => {
  const params = new URLSearchParams([["userID", userID], ["imageUrl", imageUrl]]);

  let res = await axios
    .put("api/users/set-profile-pic", null, {
      params
    });
  // console.log(res.data.imageUrl);
  return res.data.imageUrl;
}