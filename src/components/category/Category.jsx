import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { Toast } from "primereact/toast";
import { confirmDialog, ConfirmDialog } from "primereact/confirmdialog";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import $ from "jquery";
import "./categories.css";
import LoadingData from "../loading/LoadingData";

const CategoriesTable = () => {
  const [globalFilter, setGlobalFilter] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newCategory, setNewCategory] = useState({
    name: "",
    image: "",
    description: "",
    price: "",
    parentCategory: null,
    mainCategory: "",
  });
  const [editingCategory, setEditingCategory] = useState(null);
  const [parentCategories, setParentCategories] = useState([]);
  const toast = useRef(null);
  const [visible, setVisible] = useState(false);
  const [categoryLength, setCategoryLength] = useState(0);
  const [mainCategories] = useState([
    { name: "Pooja", value: "Pooja" },
    { name: "upcoming Pooja", value: "upcoming Pooja" },
  ]);

  useEffect(() => {
    fetchCategories();
    fetchParentCategories();
    localStorage.setItem("Caturl", "/category");
  }, []);

  const fetchCategories = () => {
    setLoading(true);
    $.ajax({
      url: "https://ehundi-api.onrender.com/api/categories",
      method: "GET",
      success: (data) => {
        setCategories(data);
        setCategoryLength(data.length);
        setLoading(false);
      },
      error: (xhr, status, error) => {
        console.error("Error fetching categories:", error);
        showToast("error", "Could not fetch categories.");
        setLoading(false);
      },
    });
  };

  const fetchParentCategories = () => {
    $.ajax({
      url: "https://ehundi-api.onrender.com/api/categories/root-categories",
      method: "GET",
      success: (data) => {
        setParentCategories(data?.categories || []);
      },
      error: (xhr, status, error) => {
        console.error("Error fetching parent categories:", error);
        showToast("error", "Could not fetch parent categories.");
      },
    });
  };

  const showToast = (severity, detail) => {
    if (toast && toast.current) {
      toast.current.show({
        severity,
        summary: severity === "error" ? "Error" : "Success",
        detail,
        life: 3000,
      });
    }
  };

  const submitCategory = (e) => {
    e.preventDefault();

    if (validateCategory()) {
      const requestType = editingCategory ? "PUT" : "POST";
      const url = editingCategory
        ? `https://ehundi-api.onrender.com/api/categories/${editingCategory._id}`
        : "https://ehundi-api.onrender.com/api/categories";

      $.ajax({
        url: url,
        method: requestType,
        data: JSON.stringify(newCategory),
        contentType: "application/json",
        success: (data) => {
          handleSuccess(data); // Success handling
          resetForm(); // Clear the form
        },
        error: (xhr, status, error) => {
          console.error("Error submitting category:", error);
          showToast("error", "Could not save category."); // Show error toast
        },
      });
    }
  };
  const validateCategory = () => {
    if (
      !newCategory.name ||
      !newCategory.image ||
      !newCategory.description ||
      !newCategory.price
    ) {
      alert("Please fill all mandatory fields.");
      return false;
    }
    return true;
  };

  const handleSuccess = (data) => {
    if (editingCategory) {
      setCategories((prevCategories) =>
        prevCategories.map((cat) =>
          cat._id === editingCategory._id ? data : cat
        )
      );
    } else {
      setCategories((prevCategories) => [...prevCategories, data]);
    }

    showToast("success", "Category saved successfully"); // Show success toast
    setTimeout(() => {
      fetchCategories();
    }, 2000); // Reload categories
  };

  const resetForm = () => {
    setNewCategory({
      name: "",
      image: "",
      description: "",
      price: "",
      mainCategory: "",
      parentCategory: "",
    });
    setEditingCategory(null);
    setVisible(false);
  };

  const confirmDeleteCategory = (id) => {
    confirmDialog({
      message: "Are you sure you want to delete this category?",
      header: "Delete Confirmation",
      icon: "pi pi-exclamation-triangle",
      acceptClassName: "p-button-danger",
      rejectClassName: "p-button-secondary",
      accept: () => deleteCategory(id),
    });
  };

  const deleteCategory = (id) => {
    $.ajax({
      url: `https://ehundi-api.onrender.com/api/categories/${id}`,
      method: "DELETE",
      success: () => {
        setCategories((prevCategories) =>
          prevCategories.filter((cat) => cat._id !== id)
        );
        showToast("success", "Category deleted successfully");
      },
      error: (xhr, status, error) => {
        console.error("Error deleting category:", error);
        showToast("error", "Could not delete category.");
      },
    });
  };

  const actionBodyTemplate = (rowData) => (
    <>
      <Button
        label="Edit"
        onClick={() => {
          setEditingCategory(rowData);
          setNewCategory({
            name: rowData.name,
            image: rowData.image,
            description: rowData.description,
            price: rowData.price,
            parentCategory: rowData.parentCategory,
          });
          setVisible(true);
        }}
        className="p-button-text"
      />
      <Button
        label="Delete"
        className="p-button-danger p-button-text"
        onClick={() => {
          confirmDeleteCategory(rowData._id);
        }}
      />
    </>
  );

  if (loading) {
    return <LoadingData />;
  }

  return (
    <div className="card">
      <Toast ref={toast} />
      <ConfirmDialog />
      <div
        style={{
          display: "flex",
          // height: "100vh",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "2%",
          marginTop: "5%",
        }}
      >
        <h2 style={{ width: "50%", padding: "0" }}>
          CATEGORY ({categoryLength})
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
          <Button
            label="Add Category"
            onClick={() => {
              resetForm();
              setVisible(true);
            }}
          />
        </div>
      </div>
      <div>
        <DataTable
          value={categories}
          paginator
          rows={5}
          rowsPerPageOptions={[5, 10, 25]}
          style={{ padding: "0 30px" }}
          globalFilter={globalFilter}
        >
          <Column field="name" header="CATEGORY NAME" />
          <Column field="description" header="DESCRIPTION" />
          <Column
            field="price"
            header="PRICE"
            body={(rowData) => `₹ ${rowData.price}`}
          />
          <Column
            field="parentCategory"
            header="PARENT CATEGORY"
            body={(rowData) => rowData.parentCategory?.name || "Main Category"}
          />
          <Column field="action" header="ACTION" body={actionBodyTemplate} />
        </DataTable>
      </div>

      <Dialog
        header={editingCategory ? "Edit Category" : "Add New Category"}
        visible={visible}
        onHide={resetForm}
        modal
        style={{ width: "50%" }}
      >
        <form onSubmit={submitCategory} className="p-fluid">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1rem",
            }}
          >
            <div className="p-field">
              <label htmlFor="name">
                Category Name
                <span style={{ color: "red" }}>*</span>
              </label>
              <InputText
                id="name"
                value={newCategory.name}
                onChange={(e) =>
                  setNewCategory({ ...newCategory, name: e.target.value })
                }
                style={{ marginTop: "0.5rem" }}
                required
              />
            </div>
            <div className="p-field">
              <label htmlFor="image">
                Image URL
                <span style={{ color: "red" }}>*</span>
              </label>
              <InputText
                style={{ marginTop: "0.5rem" }}
                id="image"
                value={newCategory.image}
                onChange={(e) =>
                  setNewCategory({ ...newCategory, image: e.target.value })
                }
                required
              />
            </div>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1rem",
              marginTop: "1rem",
            }}
          >
            <div className="p-field">
              <label htmlFor="description">
                Description
                <span style={{ color: "red" }}>*</span>
              </label>
              <InputText
                id="description"
                style={{ marginTop: "0.5rem" }}
                value={newCategory.description}
                onChange={(e) =>
                  setNewCategory({
                    ...newCategory,
                    description: e.target.value,
                  })
                }
                required
              />
            </div>
            <div className="p-field">
              <label htmlFor="price">
                Price<span style={{ color: "red" }}>*</span>
              </label>
              <InputText
                style={{ marginTop: "0.5rem" }}
                id="price"
                value={newCategory.price}
                onChange={(e) =>
                  setNewCategory({ ...newCategory, price: e.target.value })
                }
                required
              />
            </div>
          </div>
          <div
            className="p-field"
            style={{
              marginTop: "1rem",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1rem",
                marginTop: "1rem",
              }}
            >
              <div>
                <label htmlFor="mainCategory">Main Category</label>
                <Dropdown
                  id="mainCategory"
                  value={newCategory.mainCategory}
                  options={mainCategories}
                  style={{ marginTop: "0.5rem", width: "100%" }}
                  onChange={(e) =>
                    setNewCategory({ ...newCategory, mainCategory: e.value })
                  }
                  optionLabel="name"
                  placeholder="Select Main Category"
                />
              </div>
              <div>
                <label htmlFor="parentCategory">Parent Category</label>
                <Dropdown
                  id="parentCategory"
                  value={newCategory.parentCategory}
                  options={parentCategories}
                  style={{ marginTop: "0.5rem", width: "100%" }}
                  onChange={(e) =>
                    setNewCategory({ ...newCategory, parentCategory: e.value })
                  }
                  optionLabel="name"
                  placeholder="Select a Parent Category"
                />
              </div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "end",
              marginTop: "2rem",
              gap: "1rem",
              width: "100%",
            }}
          >
            <Button
              label="Cancel"
              onClick={resetForm}
              style={{ width: "25%" }}
            />
            <Button
              style={{ width: "25%" }}
              label="Submit"
              type="submit"
              className="p-button-success"
            />
          </div>
        </form>
      </Dialog>
    </div>
  );
};

export default CategoriesTable;
