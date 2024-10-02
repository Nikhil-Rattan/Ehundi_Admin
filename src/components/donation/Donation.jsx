// src/components/Donation.jsx
import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import $ from "jquery"; // Import jQuery

const Donation = () => {
  const [donations, setDonations] = useState([]); // State to hold the donation data
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [formData, setFormData] = useState({
    name: "",
    gotra: "",
    poojaDate: "",
    donationAmount: "",
    paymentStatus: "",
  }); // State for form data
  // const [isEditing, setIsEditing] = useState(false); // State to track if editing

  useEffect(() => {
    fetchDonations();
  }, []); // Fetch donations on component mount

  // Fetch donations from the API
  const fetchDonations = () => {
    $.ajax({
      url: "https://ehundi-api.onrender.com/api/newDonations", // Replace with your API endpoint
      method: "GET",
      dataType: "json",
      success: (data) => {
        console.log(data);

        setDonations(data.donations); // Set the donation data
        setLoading(false); // Set loading to false after fetching data
      },
      error: (error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      },
    });
  };

  // Create a new donation
  // const createDonation = () => {
  //   $.ajax({
  //     url: "https://api.example.com/donations", // Replace with your API endpoint
  //     method: "POST",
  //     contentType: "application/json",
  //     data: JSON.stringify(formData),
  //     success: (data) => {
  //       setDonations((prevDonations) => [...prevDonations, data]); // Update state with new donation
  //       resetForm(); // Reset form after successful creation
  //     },
  //     error: (error) => {
  //       console.error("Error creating donation:", error);
  //     },
  //   });
  // };

  // Update an existing donation
  // const updateDonation = () => {
  //   $.ajax({
  //     url: `https://api.example.com/donations/${formData.id}`, // Replace with your API endpoint
  //     method: "PUT",
  //     contentType: "application/json",
  //     data: JSON.stringify(formData),
  //     success: (data) => {
  //       setDonations((prevDonations) =>
  //         prevDonations.map((donation) =>
  //           donation.id === formData.id ? data : donation
  //         )
  //       ); // Update donation in state
  //       resetForm(); // Reset form after successful update
  //     },
  //     error: (error) => {
  //       console.error("Error updating donation:", error);
  //     },
  //   });
  // };

  // Delete a donation
  // const deleteDonation = (id) => {
  //   $.ajax({
  //     url: `https://api.example.com/donations/${id}`, // Replace with your API endpoint
  //     method: "DELETE",
  //     success: () => {
  //       setDonations((prevDonations) =>
  //         prevDonations.filter((donation) => donation.id !== id)
  //       ); // Remove donation from state
  //     },
  //     error: (error) => {
  //       console.error("Error deleting donation:", error);
  //     },
  //   });
  // };

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Set form data for editing
  const handleEdit = (donation) => {
    setFormData(donation);
    setIsEditing(true);
  };

  // Reset form data
  const resetForm = () => {
    setFormData({
      id: "",
      name: "",
      gotra: "",
      poojaDate: "",
      donationAmount: "",
      paymentStatus: "",
    });
    setIsEditing(false);
  };

  if (loading) {
    return <div>Loading...</div>; // Show loading indicator while fetching data
  }

  return (
    <div className="card">
      <h2 style={{ marginTop: "7%", padding: "20px" }}>DONATIONS</h2>
      {/* 
      <form
        onSubmit={(e) => {
          e.preventDefault();
          isEditing ? updateDonation() : createDonation();
        }}
        style={{ marginBottom: "20px" }}
      >
        <input
          type="text"
          name="name"
          placeholder="Donor Name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="gotra"
          placeholder="Gotra"
          value={formData.gotra}
          onChange={handleInputChange}
          required
        />
        <input
          type="date"
          name="poojaDate"
          value={formData.poojaDate}
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          name="donationAmount"
          placeholder="Donation Amount"
          value={formData.donationAmount}
          onChange={handleInputChange}
          required
        />
        <select
          name="paymentStatus"
          value={formData.paymentStatus}
          onChange={handleInputChange}
          required
        >
          <option value="">Select Payment Status</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
          <option value="Failed">Failed</option>
        </select>
        <Button
          type="submit"
          label={isEditing ? "Update Donation" : "Add Donation"}
        />
        {isEditing && <Button label="Cancel" onClick={resetForm} />}
      </form> */}

      <DataTable
        value={donations}
        paginator // Enable pagination
        rows={5} // Number of rows per page
        rowsPerPageOptions={[5, 10, 25]} // Options for rows per page
        style={{ padding: "0 30px " }}
      >
        <Column field="name" header="DONOR" />
        <Column field="gotra" header="GOTRA" />
        <Column
          field="poojaDate"
          header="POOJA DATE"
          body={(data) => new Date(data.poojaDate).toLocaleDateString()}
        />
        <Column
          field="donationAmount"
          header="DONATION AMOUNT"
          body={(data) => `$${data.donationAmount}`}
        />
        <Column field="paymentStatus" header="PAYMENT STATUS" />
        {/* <Column
          body={(rowData) => (
            <>
              <Button label="Edit" onClick={() => handleEdit(rowData)} />
              <Button
                label="Delete"
                onClick={() => deleteDonation(rowData.id)}
                className="p-button-danger"
              />
            </>
          )}
        /> */}
      </DataTable>
    </div>
  );
};

export default Donation;
