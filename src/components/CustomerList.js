import React, { useState, useEffect } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import "./CustomerList.css";
import Addcustomer from "./AddCustomer";
import EditCustomer from "./EditCustomer";

export default function Customerlist() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => fetchData(), []);

  const fetchData = () => {
    fetch("http://traineeapp.azurewebsites.net/api/customers")
      .then((response) => response.json())
      .then((data) => setCustomers(data.content));
  };
  const deleteCustomer = (link) => {
    console.log(link);
    const id = link.href.split("/")[5];
    console.log(id);
    fetch(`http://traineeapp.azurewebsites.net/api/customers/${id}`, {
      method: "DELETE",
    })
      .then((res) => fetchData())
      .catch((err) => console.error());
  };

  const saveCustomer = (customer) => {
    fetch("http://traineeapp.azurewebsites.net/api/customers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(customer),
    })
      .then((res) => fetchData())
      .catch((err) => console.error(err));
  };
  const updateCustomer = (customer, link) => {
    fetch(link, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(customer),
    })
      .then((res) => fetchData())
      .catch((err) => console.error(err));
  };
  const addTraining = (customer, link) => {
    fetch(link, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(training),
    });
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
      filterable: false,
      sortable: false,
      width: 100,
      Cell: (row) => (
        <EditCustomer updateCustomer={updateCustomer} customer={row.original} />
      ),
    },
    {
      accessor: "_links.self.href",
      Cell: (row) => (
        <button onClick={() => deleteCustomer(row.row._original.links[0])}>
          Delete
        </button>
      ),
    },
  ];

  return (
    <div>
      <Addcustomer saveCustomer={saveCustomer} />
      <ReactTable
        id="customer-list-table"
        filterable={true}
        data={customers}
        columns={columns}
      ></ReactTable>
    </div>
  );
}
