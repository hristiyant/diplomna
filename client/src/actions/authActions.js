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
  const res = await axios
    .get("/api/users/", {
      params: {
        id: userID
      }
    })

  return res.data;
};

//Get List of All Users
export const getAllUsers = async () => {
  let res = await axios.get("api/users/get-all-users");

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
export const getFriendRequests = async userID => {
  let res = await axios
    .get("/api/users/get-friend-requests", {
      params: {
        id: userID
      }
    });

  return res;
}

// Delete friend request by user id and request id
export const deleteFriendRequest = async (toUserID, fromUserID) => {
  let res = await axios
    .post("/api/users/delete-friend-request", {
      params: {
        toUserID: toUserID,
        fromUserID: fromUserID
      }
    });

  return res;
}

// Create friend request
export const createFriendRequest = async (fromUser, toUser) => {
  const res = await axios
    .post("/api/users/create-friend-request", {
      params: {
        fromUser: fromUser,
        toUser: toUser
      }
    });

  return res.data;
}

// Add users as friends
export const addFriends = async (requestSenderID, requestReceiverID, friendRequestID) => {
  let res = await axios
    .post("/api/users/add-friend", {
      params: {
        requestSenderID: requestSenderID,
        requestReceiverID: requestReceiverID,
        friendRequestID: friendRequestID
      }
    });

  return res;
}

// Remove user from friends
export const removeFriends = async (userID, friendID) => {
  let res = await axios
    .post("/api/users/remove-friend", {
      params: {
        userID: userID,
        friendID: friendID
      }
    });

  return res;
}

// Set profile pic url from firebase storage
export const setProfileImage = async (userID, imageUrl) => {
  let res = await axios
    .post("api/users/set-profile-pic", {
      params: {
        userID: userID,
        imageUrl: imageUrl
      }
    });

  return res;
}