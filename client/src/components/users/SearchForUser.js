import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import UserCard from "../ui-cards/UserCard";
import { getAllUsers } from "../../actions/authActions"

import "./SearchForUser.css"

function SearchForUser(props) {
    const [clickedUser, setClickedUser] = useState({});
    const [allUsers, setAllUsers] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        console.log(props);
        (async () => {
            let userData;

            try {
                await getAllUsers()
                    .then(res => userData = res);
            } catch (error) {
                console.log(error);
                userData = [];
            }

            setAllUsers(userData);
            setUsers(userData);
        })();
    }, []);

    const filterCards = event => {
        const value = event.target.value.toLowerCase();
        const filteredUsers = allUsers.filter(user => (`${user.name}`.toLowerCase().includes(value)));
        setUsers(filteredUsers);
    }

    function onCardClick() {
        console.log(props.auth.user.name);
        // e.preventDefault();
        // console.log(value);
    }

    return (
        // <div className="SearchForUser">
        // {/* <h1>Users</h1> */}
        // {/* <input className="search-box" onInput={filterCards} placeholder="Search..." /> */}
        <div className="cards-grid">
            {users.map((user, index) => (
                <UserCard key={index} userData={user} loggedInUser={props.auth.user} />
            ))}
        </div>
        // </div>
    );
}

SearchForUser.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps
)(SearchForUser);