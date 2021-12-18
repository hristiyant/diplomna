import React, { useMemo, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "./SearchForUser.css"

import UserCard from "../ui-cards/UserCard";
import { getAllUsers } from "../../actions/authActions"

import Table from "../../utils/EventsTable";
import "../../utils/EventsTable.css";
// import { getAllUsers } from "../../actions/authActions";

// function SearchForUser() {
//     const columns = useMemo(
//         () => [
//             {
//                 Header: "User",
//                 columns: [
//                     {
//                         Header: "Name",
//                         accessor: "name"
//                     },
//                     {
//                         Header: "Email",
//                         accessor: "email"
//                     }
//                 ]
//             },
//             // {
//             //     Header: "Details",
//             //     columns: [
//             //         {
//             //             Header: "Date",
//             //             accessor: "date",
//             //             Cell: ({ cell: { value } }) => {
//             //                 return getDisplayDate(value);
//             //             }
//             //         }
//             //         // ,{
//             //         //   Header: "Genre(s)",
//             //         //   accessor: "show.genres",
//             //         //   Cell: ({ cell: { value } }) => <Genres values={value} />
//             //         // },
//             //         // {
//             //         //   Header: "Runtime",
//             //         //   accessor: "show.runtime",
//             //         //   Cell: ({ cell: { value } }) => {
//             //         //     const hour = Math.floor(value / 60);
//             //         //     const min = Math.floor(value % 60);
//             //         //     return (
//             //         //       <>
//             //         //         {hour > 0 ? `${hour} hr${hour > 1 ? "s" : ""} ` : ""}
//             //         //         {min > 0 ? `${min} min${min > 1 ? "s" : ""}` : ""}
//             //         //       </>
//             //         //     );
//             //         //   }
//             //         // },
//             //         // {
//             //         //   Header: "Status",
//             //         //   accessor: "show.status"
//             //         // }
//             //     ]
//             // }
//         ],
//         []
//     );

//     const [data, setData] = useState([]);

//     useEffect(() => {
//         (async () => {
//             const result = await axios("http://localhost:3000/api/users/get-all-users", { params: { answer: 42 } });
//             setData(result.data);
//             console.log(result.data);
//         })();
//     }, []);

//     return (
//         <div className="RecordList">
//             <Table columns={columns} data={data} />
//         </div>
//     );
// }

// export default SearchForUser;

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