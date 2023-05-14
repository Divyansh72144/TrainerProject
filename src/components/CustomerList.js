import React, { useState, useEffect } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import "./CustomerList.css";
import Addcustomer from "./AddCustomer";
import EditCustomer from "./EditCustomer";
import AddTraining from "./AddTraining";
import { CSVLink } from "react-csv";

export default function Customerlist() {
  const [customers, setCustomers] = useState([]);
  const [csvData, setCSVData] = useState([]);

  useEffect(() => fetchData(), []);

  const fetchData = () => {
    fetch("https://traineeapp.azurewebsites.net/api/customers")
      .then((response) => response.json())
      .then((data) => {
        setCustomers(data.content);
        const csvData = data?.content.map((obj) => {
          const newObj = {
            firstname: obj.firstname,
            lastname: obj.lastname,
            streetaddress: obj.streetaddress,
            postcode: obj.postcode,
            city: obj.city,
            email: obj.email,
            phone: obj.phone,
          };
          return newObj;
        });
        setCSVData(csvData);
      });
  };
  const deleteCustomer = (link) => {
    console.log(link);
    const id = link.href.split("/")[5];
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this customer?"
    );

    if (confirmDelete) {
      fetch(`https://traineeapp.azurewebsites.net/api/customers/${id}`, {
        method: "DELETE",
      })
        .then((res) => fetchData())
        .catch((err) => console.error());
    }
  };

  const saveCustomer = (customer) => {
    fetch("https://traineeapp.azurewebsites.net/api/customers", {
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

  const saveTraining = (training, customer) => {
    fetch("https://traineeapp.azurewebsites.net/api/customers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(training),
    })
      .then((res) => fetchData())
      .catch((err) => console.error(err));
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
    {
      filterable: false,
      sortable: false,
      width: 100,
      Cell: (row) => (
        <AddTraining saveTraining={saveTraining} customer={row.original} />
      ),
    },
  ];

  return (
    <div>
      <Addcustomer saveCustomer={saveCustomer} />
      <CSVLink data={csvData}>Export CSV</CSVLink>
      <ReactTable
        id="customer-list-table"
        filterable={true}
        data={customers}
        columns={columns}
      ></ReactTable>
    </div>
  );
}
