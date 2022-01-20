import { SET_UPCOMING_EVENTS } from "../actions/types";

const isEmpty = require("is-empty");

const initialState = {
    upcomingEvents: []
};

export default function checkState(state = initialState, action) {
    console.log("IN REDUCER: " + JSON.stringify(action))
    switch (action.type) {
        case SET_UPCOMING_EVENTS:
            return {
                ...state,
                upcomingEvents: action.payload
            };
        // case USER_LOADING:
        //     return {
        //         ...state,
        //         loading: true
        //     };
        default:
            return state;
    }
}