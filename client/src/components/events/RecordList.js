// import React, { Component } from "react";
// // This will require to npm install axios
// import axios from 'axios';
// // import { Link } from "react-router-dom";

// const Event = (props) => (
//   <tr>
//     <td>{props.record.name}</td>
//     {/* <td>
//       <Link to={"/edit/" + props.record._id}>Edit</Link> |
//       <a
//         href="/"
//         onClick={() => {
//           props.deleteRecord(props.record._id);
//         }}
//       >
//         Delete
//       </a>
//     </td> */}
//   </tr>
// );

// class RecordList extends Component {
//   // This is the constructor that shall store our data retrieved from the database
//   constructor(props) {
//     super(props);
//     this.state = { records: [] };
//   }

//   // This method will get the data from the database.
//   componentDidMount() {
//     axios
//       .get("http://localhost:3000/events/get")
//       .then((response) => {
//         this.setState({ records: response.data });
//       })
//       .catch(function (error) {
//         console.log(error);
//       });
//   }

//   // // This method will delete a record based on the method
//   // deleteRecord(id) {
//   //   axios.delete("http://localhost:3000/" + id).then((response) => {
//   //     console.log(response.data);
//   //   });

//   //   this.setState({
//   //     record: this.state.records.filter((el) => el._id !== id),
//   //   });
//   // }

//   // This method will map out the users on the table
//   recordList() {
//     return this.state.records.map((currentrecord) => {
//       return (
//         <Event
//           record={currentrecord}
//           deleteRecord={this.deleteRecord}
//           key={currentrecord._id}
//         />
//       );
//     });
//   }

//   // This following section will display the table with the records of individuals.
//   render() {
//     return (
//       <div className="events">
//         {this.state.records.map(event => {
//           return (
//             <div key={event.id}>
//               <h4>{event.name}</h4>
//               <p>{event.date}</p>
//             </div>
//           )
//         })}
//         <h3>Record List</h3>
//         <table className="table table-striped" style={{ marginTop: 20 }}>
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Type</th>
//             </tr>
//           </thead>
//           <tbody>
//             {this.state.records.map(event => {
//               return (
//                 <div key={event.id}>
//                   <tr>{event}</tr>
//                   <h4>{event.name}</h4>
//                   <p>{event.date}</p>
//                 </div>
//               )
//             })}</tbody>
//         </table>
//       </div>
//       // <div>
//       //   <h3>Record List</h3>
//       //   <table className="table table-striped" style={{ marginTop: 20 }}>
//       //     <thead>
//       //       <tr>
//       //         <th>Name</th>
//       //         <th>Type</th>
//       //       </tr>
//       //     </thead>
//       //     <tbody>{this.recordList().}</tbody>
//       //   </table>
//       // </div>
//     );
//   }
// }

import React, { useMemo, useState, useEffect } from "react";
import axios from "axios";

import Table from "../../utils/EventsTable";
import { getDisplayDate } from "../../utils/DateUtils";
import "../../utils/EventsTable.css";

function RecordList() {
  const columns = useMemo(
    () => [
      {
        Header: "Event",
        columns: [
          {
            Header: "Name",
            accessor: "name"
          },
          {
            Header: "Type",
            accessor: "eventType"
          }
        ]
      },
      {
        Header: "Details",
        columns: [
          {
            Header: "Date",
            accessor: "date",
            Cell: ({ cell: { value } }) => {
              return getDisplayDate(value);
            }
          }
          // ,{
          //   Header: "Genre(s)",
          //   accessor: "show.genres",
          //   Cell: ({ cell: { value } }) => <Genres values={value} />
          // },
          // {
          //   Header: "Runtime",
          //   accessor: "show.runtime",
          //   Cell: ({ cell: { value } }) => {
          //     const hour = Math.floor(value / 60);
          //     const min = Math.floor(value % 60);
          //     return (
          //       <>
          //         {hour > 0 ? `${hour} hr${hour > 1 ? "s" : ""} ` : ""}
          //         {min > 0 ? `${min} min${min > 1 ? "s" : ""}` : ""}
          //       </>
          //     );
          //   }
          // },
          // {
          //   Header: "Status",
          //   accessor: "show.status"
          // }
        ]
      }
    ],
    []
  );

  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      const result = await axios("http://localhost:3000/api/events/get");
      setData(result.data);
    })();
  }, []);

  return (
    <div className="RecordList">
      <Table columns={columns} data={data} defaultPageSize={20} />
    </div>
  );
}

export default RecordList;