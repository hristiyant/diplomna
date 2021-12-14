import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import io from "socket.io-client";

import { setCurrentUser, logoutUser } from "./actions/authActions";
import { Provider } from "react-redux";
import store from "./store";

import FriendRequests from "./components/users/friend-requests/FriendRequests";
import Navbar from "./components/layout/navbar/Navbar";
import Landing from "./components/layout/Landing";
import Dashboard from "./components/dashboard/Dashboard";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import CreateEvent from "./components/events/CreateEvent";
import PrivateRoute from "./components/private-route/PrivateRoute";
import RecordList from "./components/events/RecordList";
import SearchForUser from "./components/users/SearchForUser";
import UserProfile from "./components/users/UserProfile";

import "./App.css";

const ENDPOINT = "http://localhost:4000";

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());

    // Redirect to login
    window.location.href = "./login";
  }
}

export default function App() {

  useEffect(() => {
    const socket = io(ENDPOINT);
    return () => {
      return () => socket.disconnect();
    }
  }, [])

  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <div className="App">
          {/* <div className="full-screen-container"> */}
          <Route exact path="/" component={Landing} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/create-event" component={CreateEvent} />
          <Route exact path="/profile" component={UserProfile} />
          <Route exact path="/users" component={SearchForUser} />
          <Route exact path="/friend-requests" component={FriendRequests} />
          <Route exact path="/events" component={RecordList} />
          <Switch>
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
          </Switch>
          {/* </div> */}
        </div>
      </Router>
    </Provider>
  );
}