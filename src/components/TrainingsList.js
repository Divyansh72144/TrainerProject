import React, { useState, useEffect } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import "./CustomerList.css";

export default function TrainingsList() {
  const [trainings, setTrainings] = useState([]);

  useEffect(() => fetchData(), []);

  const fetchData = () => {
    fetch("https://traineeapp.azurewebsites.net/gettrainings")
      .then((response) => response.json())
      .then((data) => setTrainings(data));
  };

  const deleteTraining = (link) => {
    const id = link.id;
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this customer?"
    );

    if (confirmDelete) {
      fetch(`http://traineeapp.azurewebsites.net/api/trainings/${id}`, {
        method: "DELETE",
      })
        .then((res) => fetchData())
        .catch((err) => console.error());
    }
  };

  const columns = [
    {
      Header: "Activity",
      accessor: "activity",
    },
    {
      Header: "Date",
      accessor: "date",
    },
    {
      Header: "Duration",
      accessor: "duration",
    },
    {
      accessor: "_links.self.href",
      Cell: (row) => (
        <button onClick={() => deleteTraining(row.original)}>Delete</button>
      ),
    },
  ];

  return (
    <div>
      <ReactTable
        id="trainings-list-table"
        filterable={true}
        data={trainings}
        columns={columns}
      ></ReactTable>
    </div>
  );
}
