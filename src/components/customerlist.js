import React, { useState, useEffect } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
export default function Customerlist() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => fetchData(), []);

  const fetchData = () => {
    fetch("http://traineeapp.azurewebsites.net/api/customers")
      .then((response) => response.json())
      .then((data) => setCustomers(data.content));
  };
  const deleteCustomer = (link) => {
    fetch(link, { method: "DELETE" })
      .then((res) => fetchData())
      .catch((err) => console.error());
  };
  const columns = [
    {
      Header: "firstname",
      accessor: "firstname",
    },
    {
      Header: "lastname",
      accessor: "lastname",
    },
    {
      Header: "streetaddress",
      accessor: "streetaddress",
    },
    {
      Header: "postcode",
      accessor: "postcode",
    },
    {
      Header: "city",
      accessor: "city",
    },
    {
      Header: "email",
      accessor: "email",
    },
    {
      Header: "phone",
      accessor: "phone",
    },
    {
      accessor: "_links.self.href",
      Cell: (row) => (
        <button onClick={() => deleteCustomer(row.value)}>Delete</button>
      ),
    },
  ];

  return (
    <div>
      <ReactTable
        filterable={true}
        data={customers}
        columns={columns}
      ></ReactTable>
    </div>
  );
}
