import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
// import io from "socket.io-client";

import { setCurrentUser, logoutUser } from "./actions/authActions";
import { Provider } from "react-redux";

// import store from "./store";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk"
import { composeWithDevTools } from 'redux-devtools-extension'
import allReducers from "./reducers/index";

import FriendRequests from "./components/users/friend-requests/FriendRequests";
import Navbar from "./components/layout/navbar/Navbar";
import Landing from "./components/layout/landing/Landing";
import Dashboard from "./components/dashboard/Dashboard";
import Register from "./components/auth/register/Register";
import Login from "./components/auth/login/Login";
import CreateEvent from "./components/events/create/CreateEvent";
import PrivateRoute from "./components/private-route/PrivateRoute";
import RecordList from "./components/events/list/EventsList";
import UsersList from "./components/users/UsersList";
import UserProfile from "./components/users/UserProfile";

import "./App.css";
import "./styles/css/antd.css"

const composedEnhancer = composeWithDevTools(applyMiddleware(thunk))
const store = createStore(allReducers, composedEnhancer)
// const ENDPOINT = "http://localhost:4000";

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
  var isLoggedIn = localStorage.getItem("jwtToken")

  useEffect(() => {
    // const socket = io(ENDPOINT);
    // return () => {
    //   return () => socket.disconnect();
    // }
  }, [])

  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Navbar />
          <div className="full-screen-container">
            <Route exact path="/" component={isLoggedIn ? () => (<Redirect to="/dashboard" />) : Landing} />
            <Route exact path="/login" render={props => <Login {...props} />} />
            <Route exact path="/register" component={Register} />
            <Switch>
              <PrivateRoute exact path="/events" component={RecordList} />
              <PrivateRoute exact path="/users" component={UsersList} />
              <PrivateRoute exact path="/create-event" component={CreateEvent} />
              <PrivateRoute exact path="/invitations" component={FriendRequests} />
              <PrivateRoute exact path="/profile" component={UserProfile} />
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
            </Switch>
          </div>
        </div>
      </Router>
    </Provider>
  );
}