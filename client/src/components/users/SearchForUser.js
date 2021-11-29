import React, { useMemo, useState, useEffect } from "react";
import axios from "axios";

import Table from "../../utils/EventsTable";
import "../../utils/EventsTable.css";

function SearchForUser() {
    const columns = useMemo(
        () => [
            {
                Header: "User",
                columns: [
                    {
                        Header: "Name",
                        accessor: "name"
                    },
                    {
                        Header: "Email",
                        accessor: "email"
                    }
                ]
            },
            // {
            //     Header: "Details",
            //     columns: [
            //         {
            //             Header: "Date",
            //             accessor: "date",
            //             Cell: ({ cell: { value } }) => {
            //                 return getDisplayDate(value);
            //             }
            //         }
            //         // ,{
            //         //   Header: "Genre(s)",
            //         //   accessor: "show.genres",
            //         //   Cell: ({ cell: { value } }) => <Genres values={value} />
            //         // },
            //         // {
            //         //   Header: "Runtime",
            //         //   accessor: "show.runtime",
            //         //   Cell: ({ cell: { value } }) => {
            //         //     const hour = Math.floor(value / 60);
            //         //     const min = Math.floor(value % 60);
            //         //     return (
            //         //       <>
            //         //         {hour > 0 ? `${hour} hr${hour > 1 ? "s" : ""} ` : ""}
            //         //         {min > 0 ? `${min} min${min > 1 ? "s" : ""}` : ""}
            //         //       </>
            //         //     );
            //         //   }
            //         // },
            //         // {
            //         //   Header: "Status",
            //         //   accessor: "show.status"
            //         // }
            //     ]
            // }
        ],
        []
    );

    const [data, setData] = useState([]);

    useEffect(() => {
        (async () => {
            const result = await axios("http://localhost:3000/api/users/get-all-users");
            setData(result.data);
        })();
    }, []);

    return (
        <div className="RecordList">
            <Table columns={columns} data={data} />
        </div>
    );
}

export default SearchForUser;