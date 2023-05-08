import React, { useState, useEffect } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import "./CustomerList.css"

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
      Header: "First Name",
      accessor: "firstname",
    },
    {
      Header: "Last Name",
      accessor: "lastname",
    },
    {
      Header: "Street Address",
      accessor: "streetaddress",
    },
    {
      Header: "Post Code",
      accessor: "postcode",
    },
    {
      Header: "City",
      accessor: "city",
    },
    {
      Header: "Email",
      accessor: "email",
    },
    {
      Header: "Phone",
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
      <ReactTable id='customer-list-table'
        filterable={true}
        data={customers}
        columns={columns}
      ></ReactTable>
    </div>
  );
}
