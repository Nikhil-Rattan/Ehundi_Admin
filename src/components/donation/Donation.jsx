import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import $ from "jquery";
import { InputText } from "primereact/inputtext";
import LoadingData from "../loading/LoadingData";

const Donation = () => {
  const [globalFilter, setGlobalFilter] = useState(null);

  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [donationLength, setDonationLength] = useState(0);

  useEffect(() => {
    localStorage.setItem("Caturl", "/donation");
    fetchDonations();
  }, []);

  const fetchDonations = () => {
    setLoading(true);
    $.ajax({
      url: "https://ehundi-api.onrender.com/api/newDonations",
      method: "GET",
      dataType: "json",
      success: (data) => {
        setDonations(data.donations);
        setDonationLength(data.donations.length);
        setLoading(false);
      },
      error: (error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      },
    });
  };

  if (loading) {
    return <LoadingData />;
  }

  return (
    <div className="card">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "2%",
          marginTop: "5%",
        }}
      >
        <h2 style={{ width: "50%", padding: "0" }}>
          DONATION ({donationLength})
        </h2>
        <div style={{ display: "flex", gap: "1rem" }}>
          <div
            className="p-inputgroup"
            style={{
              width: "auto",
              justifyContent: "space-between",
            }}
          >
            <span className="p-inputgroup-addon">
              <i className="pi pi-search"></i>
            </span>
            <InputText
              type="search"
              placeholder="Search..."
              onInput={(e) => setGlobalFilter(e.target.value)}
            />
          </div>
        </div>
      </div>

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
        paginator
        rows={5}
        rowsPerPageOptions={[5, 10, 25]}
        style={{ padding: "0 30px " }}
        globalFilter={globalFilter}
        globalFilterFields={[
          "name",
          "gotra",
          "poojaDate",
          "poojaId",
          "donationAmount",
          "poojaName",
          "paymentStatus",
        ]}
      >
        <Column
          field="data.name"
          header="NAME OF"
          body={(data) => `${data.name}`}
        />
        <Column
          field="data.gotra"
          header="GOTRA"
          body={(data) => `${data.gotra}`}
        />
        <Column
          field="data.poojaName"
          header="POOJA NAME"
          body={(data) => `${data.poojaName}`}
        />
        <Column
          field="data.poojaId"
          header="POOJA ID"
          body={(data) =>
            Array.isArray(data.poojaId)
              ? data.poojaId.map((pooja) => pooja.name).join(", ")
              : data.poojaId
          }
        />
        <Column
          field="data.poojaDate"
          header="POOJA DATE"
          body={(data) =>
            new Date(data.poojaDate).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })
          }
        />

        <Column
          field="data.donationAmount"
          header="DONATION AMOUNT"
          body={(data) => `₹ ${data.donationAmount}`}
        />

        <Column
          field="data.paymentStatus"
          header="PAYMENT STATUS"
          body={(data) => `${data.paymentStatus}`}
        />
        <Column
          field="data.user.name"
          header="BOOKED BY"
          body={(data) => (data.user ? data.user.fullName : "")}
        />
      </DataTable>
    </div>
  );
};

export default Donation;
