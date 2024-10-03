import React, { useEffect, useState } from "react";
import $ from "jquery";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import LoadingData from "../loading/LoadingData";

const User = () => {
  const [users, setUsers] = useState([]);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [usersLength, setUsersLength] = useState(0);

  const [user, setUser] = useState({
    id: null,
    fullName: "",
    email: "",
    phoneNumber: "",
    role: "",
  });
  const [visible, setVisible] = useState(false);

  const fetchUsers = () => {
    setLoading(true);
    $.ajax({
      url: "https://ehundi-api.onrender.com/auth/user-Profile",
      method: "GET",
      success: (data) => {
        setUsers(data);
        setUsersLength(data.length);
        setLoading(false);
      },
      error: (error) => {
        console.error("Error fetching users:", error);
        setLoading(false);
      },
    });
  };

  // Open dialog for adding/editing user
  // const openDialog = (
  //   user = { id: null, fullName: "", email: "", phoneNumber: "", role: "" }
  // ) => {
  //   setUser(user);
  //   setIsEditing(!!user.id);
  //   setVisible(true);
  // };

  // Handle form submission for adding/updating user
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const method = isEditing ? "PUT" : "POST";
  //   const url = isEditing
  //     ? `http://localhost:5000/api/users/${user.id}`
  //     : "http://localhost:5000/api/users";

  //   $.ajax({
  //     url: url,
  //     method: method,
  //     contentType: "application/json",
  //     data: JSON.stringify(user),
  //     success: () => {
  //       setVisible(false);
  //       fetchUsers(); // Refresh data after operation
  //     },
  //     error: (error) => console.error("Error submitting user:", error),
  //   });
  // };

  // Delete user
  // const handleDelete = (id) => {
  //   $.ajax({
  //     url: `http://localhost:5000/api/users/${id}`, // Replace with your API URL
  //     method: "DELETE",
  //     success: fetchUsers, // Refresh data after deletion
  //     error: (error) => console.error("Error deleting user:", error),
  //   });
  // };

  useEffect(() => {
    localStorage.setItem("Caturl", "/users");
    fetchUsers();
  }, []);

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
        <h2 style={{ width: "10%", padding: "0" }}>USERS ({usersLength})</h2>
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
      <DataTable
        value={users}
        paginator
        rows={5}
        rowsPerPageOptions={[5, 10, 25]}
        style={{ padding: "0 30px " }}
        globalFilter={globalFilter}
      >
        <Column field="fullName" header="FULL NAME" />
        <Column field="email" header="EMAIL" />
        <Column field="phoneNumber" header="MOBILE NUMBER" />
        <Column field="role" header="ROLE" />
        {/* <Column
          body={(data) => (
            <>
              <Button icon="pi pi-pencil" onClick={() => openDialog(data)} />
              <Button
                icon="pi pi-trash"
                onClick={() => handleDelete(data.id)}
              />
            </>
          )}
          header="Actions"
        /> */}
      </DataTable>

      {/* <Dialog
        header={isEditing ? "Edit User" : "Add User"}
        visible={visible}
        onHide={() => setVisible(false)}
      >
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="fullName">Full Name</label>
            <InputText
              id="fullName"
              value={user.fullName}
              onChange={(e) => setUser({ ...user, fullName: e.target.value })}
              required
            />
          </div>
          <div className="field">
            <label htmlFor="email">Email</label>
            <InputText
              id="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              required
            />
          </div>
          <div className="field">
            <label htmlFor="phoneNumber">Phone Number</label>
            <InputText
              id="phoneNumber"
              value={user.phoneNumber}
              onChange={(e) =>
                setUser({ ...user, phoneNumber: e.target.value })
              }
              required
            />
          </div>
          <div className="field">
            <label htmlFor="role">Role</label>
            <InputText
              id="role"
              value={user.role}
              onChange={(e) => setUser({ ...user, role: e.target.value })}
              required
            />
          </div>
          <Button type="submit" label={isEditing ? "Update" : "Add"} />
        </form>
      </Dialog> */}
    </div>
  );
};

export default User;
