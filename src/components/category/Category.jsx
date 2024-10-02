// import React, { useState, useEffect, useRef } from "react";
// import { DataTable } from "primereact/datatable";
// import { Column } from "primereact/column";
// import { Button } from "primereact/button";
// import { OverlayPanel } from "primereact/overlaypanel";
// import { InputText } from "primereact/inputtext";
// import { Dropdown } from "primereact/dropdown";
// import $ from "jquery";
// import { Toast } from "primereact/toast";
// import { confirmDialog, ConfirmDialog } from "primereact/confirmdialog";
// import { Dialog } from "primereact/dialog";
// const CategoriesTable = () => {
//   const [categories, setCategories] = useState([]);
//   const [newCategory, setNewCategory] = useState({
//     name: "",
//     image: "",
//     description: "",
//     price: "",
//     parentCategory: "",
//   });
//   const [editingCategory, setEditingCategory] = useState(null);
//   const [parentCategories, setParentCategories] = useState([]);
//   const overlayPanelRef = useRef(null);
//   const toast = useRef(null);
//   const [visible, setVisible] = useState(false);
//   // Fetch categories and parent categories
//   useEffect(() => {
//     fetchCategories();
//     fetchParentCategories();
//   }, []);

//   const fetchCategories = () => {
//     $.ajax({
//       url: "https://ehundi-api.onrender.com/api/categories",
//       method: "GET",
//       success: (data) => {
//         setCategories(data);
//       },
//       error: (xhr, status, error) => {
//         console.error("Error fetching categories:", error);
//         showToast("error", "Could not fetch categories.");
//       },
//     });
//   };

//   const fetchParentCategories = () => {
//     $.ajax({
//       url: "https://ehundi-api.onrender.com/api/categories/root-categories",
//       method: "GET",
//       success: (data) => {
//         setParentCategories(data?.categories || []);
//       },
//       error: (xhr, status, error) => {
//         console.error("Error fetching parent categories:", error);
//         showToast("error", "Could not fetch parent categories.");
//       },
//     });
//   };

//   const showToast = (severity, detail) => {
//     toast.current.show({
//       severity,
//       summary: severity === "error" ? "Error" : "Success",
//       detail,
//       life: 3000,
//     });
//   };

//   // Add or edit category submission
//   const submitCategory = (e) => {
//     e.preventDefault();

//     if (validateCategory()) {
//       const requestType = editingCategory ? "PUT" : "POST";
//       const url = editingCategory
//         ? `https://ehundi-api.onrender.com/api/categories/${editingCategory._id}` // Ensure _id is used here
//         : "https://ehundi-api.onrender.com/api/categories";

//       $.ajax({
//         url: url,
//         method: requestType,
//         data: JSON.stringify(newCategory),
//         contentType: "application/json",
//         success: (data) => {
//           handleSuccess(data);
//           resetForm();
//         },
//         error: (xhr, status, error) => {
//           console.error("Error submitting category:", error);
//           showToast("error", "Could not save category.");
//         },
//       });
//       setVisible(false);
//     }
//   };

//   const validateCategory = () => {
//     if (
//       !newCategory.name ||
//       !newCategory.image ||
//       !newCategory.description ||
//       !newCategory.price
//     ) {
//       alert("Please fill all mandatory fields.");
//       return false;
//     }
//     return true;
//   };

//   const handleSuccess = (data) => {
//     if (editingCategory) {
//       setCategories((prevCategories) =>
//         prevCategories.map((cat) =>
//           cat.id === editingCategory.id ? data : cat
//         )
//       );
//     } else {
//       setCategories((prevCategories) => [...prevCategories, data]);
//     }
//     showToast("success", "Category saved successfully");
//     fetchCategories();
//   };

//   // Reset form and close popup
//   const resetForm = () => {
//     setNewCategory({
//       name: "",
//       image: "",
//       description: "",
//       price: "",
//       parentCategory: "",
//     });
//     setEditingCategory(null);
//     setVisible(false);
//     overlayPanelRef.current.hide();
//   };

//   const confirmDeleteCategory = (id) => {
//     confirmDialog({
//       message: "Are you sure you want to delete this category?",
//       header: "Delete Confirmation",
//       icon: "pi pi-exclamation-triangle",
//       acceptClassName: "p-button-danger",
//       rejectClassName: "p-button-secondary",
//       accept: () => deleteCategory(id),
//     });
//   };

//   // Delete category
//   const deleteCategory = (id) => {
//     $.ajax({
//       url: `https://ehundi-api.onrender.com/api/categories/${id}`,
//       method: "DELETE",
//       success: () => {
//         setCategories((prevCategories) =>
//           prevCategories.filter((cat) => cat.id !== id)
//         );
//         showToast("success", "Category deleted successfully");
//       },
//       error: (xhr, status, error) => {
//         console.error("Error deleting category:", error);
//         showToast("error", "Could not delete category.");
//       },
//     });
//   };

//   // Render action buttons for each category
//   const actionBodyTemplate = (rowData) => (
//     <>
//       <Button
//         label="Edit"
//         onClick={(e) => {
//           // Set the editing category and pre-fill the form with existing data
//           setEditingCategory(rowData);
//           setNewCategory({
//             name: rowData.name,
//             image: rowData.image,
//             description: rowData.description,
//             price: rowData.price,
//             parentCategory: rowData.parentCategory,
//           });
//           overlayPanelRef.current.show(e); // Show the overlay panel
//         }}
//         className="p-button-text"
//       />
//       <Button
//         label="Delete"
//         className="p-button-danger p-button-text"
//         onClick={() => {
//           confirmDeleteCategory(rowData._id); // Use confirm dialog before deleting
//         }}
//       />
//     </>
//   );

//   return (
//     <div className="card">
//       <Toast ref={toast} />
//       <ConfirmDialog />
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           padding: "20px",
//         }}
//       >
//         <h2 style={{ marginTop: "7%" }}>Category Management</h2>
//         {/* <Button
//           label="Add Category"
//           onClick={(e) => {
//             resetForm(); // Reset the form before showing
//             overlayPanelRef.current.toggle(e);
//           }}
//           style={{ marginRight: "20px" }}
//         /> */}
//         <Button
//           label="Add Category"
//           onClick={() => {
//             resetForm(); // Reset the form before showing
//             setVisible(true); // Open the dialog
//           }}
//           style={{ marginRight: "20px" }}
//         />
//       </div>

//       <DataTable
//         value={categories}
//         paginator
//         rows={5}
//         rowsPerPageOptions={[5, 10, 25]}
//         style={{ padding: "0 30px" }}
//       >
//         <Column field="name" header="Category Name" />
//         <Column field="description" header="Description" />
//         <Column field="price" header="Price" />
//         <Column
//           field="parentCategory"
//           header="Parent Category"
//           body={(rowData) => rowData.parentCategory?.name || "Main Category"}
//         />
//         <Column field="action" header="Action" body={actionBodyTemplate} />
//       </DataTable>

//       <OverlayPanel
//         ref={overlayPanelRef}
//         id="overlayPanel"
//         style={{
//           width: "90%",
//           maxWidth: "1200px",
//           padding: "20px",
//         }}
//       >
//         {/* <form onSubmit={submitCategory} className="p-fluid">
//           <div className="p-field" style={{ marginTop: "20px" }}>
//             <label htmlFor="name">Category Name*</label>
//             <InputText
//               id="name"
//               value={newCategory.name}
//               onChange={(e) =>
//                 setNewCategory({ ...newCategory, name: e.target.value })
//               }
//               required
//             />
//           </div>
//           <div className="p-field" style={{ marginTop: "20px" }}>
//             <label htmlFor="image">Image URL*</label>
//             <InputText
//               id="image"
//               value={newCategory.image}
//               onChange={(e) =>
//                 setNewCategory({ ...newCategory, image: e.target.value })
//               }
//               required
//             />
//           </div>
//           <div className="p-field" style={{ marginTop: "20px" }}>
//             <label htmlFor="description">Description*</label>
//             <InputText
//               id="description"
//               value={newCategory.description}
//               onChange={(e) =>
//                 setNewCategory({ ...newCategory, description: e.target.value })
//               }
//               required
//             />
//           </div>
//           <div className="p-field" style={{ marginTop: "20px" }}>
//             <label htmlFor="price">Price*</label>
//             <InputText
//               id="price"
//               value={newCategory.price}
//               onChange={(e) =>
//                 setNewCategory({ ...newCategory, price: e.target.value })
//               }
//               required
//             />
//           </div>

//           <div className="p-field" style={{ marginTop: "20px" }}>
//             <label htmlFor="parentCategory">Parent Category</label>
//             <Dropdown
//               id="parentCategory"
//               value={newCategory.parentCategory}
//               options={parentCategories}
//               onChange={(e) =>
//                 setNewCategory({ ...newCategory, parentCategory: e.value })
//               }
//               optionLabel="name"
//               placeholder="Select a Parent Category"
//             />
//           </div>

//           <div
//             style={{
//               display: "flex",
//               justifyContent: "space-between",
//               marginTop: "20px",
//             }}
//           >
//             <Button
//               type="button"
//               label="Cancel"
//               onClick={resetForm}
//               className="p-button-secondary"
//             />
//             <Button type="submit" label="Save" />
//           </div>
//         </form> */}
//         <Dialog
//           header="Add New Category"
//           visible={visible}
//           onHide={() => {
//             console.log("Dialog closed");
//             setVisible(false);
//           }}
//           modal
//           style={{ width: "500px" }} // Customize width if needed
//         >
//           <form onSubmit={submitCategory} className="p-fluid">
//             <div className="p-field">
//               <label htmlFor="name">Category Name*</label>
//               <InputText
//                 id="name"
//                 value={newCategory.name}
//                 onChange={(e) =>
//                   setNewCategory({ ...newCategory, name: e.target.value })
//                 }
//                 required
//               />
//             </div>
//             {/* Add the rest of the form fields */}
//             <div>
//               <Button
//                 type="button"
//                 label="Cancel"
//                 onClick={resetForm}
//                 className="p-button-secondary"
//               />
//               <Button type="submit" label="Save" />
//             </div>
//           </form>
//         </Dialog>
//       </OverlayPanel>
//     </div>
//   );
// };

// export default CategoriesTable;

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

const CategoriesTable = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({
    name: "",
    image: "",
    description: "",
    price: "",
    parentCategory: "",
  });
  const [editingCategory, setEditingCategory] = useState(null);
  const [parentCategories, setParentCategories] = useState([]);
  const toast = useRef(null);
  const [visible, setVisible] = useState(false);

  // Fetch categories and parent categories
  useEffect(() => {
    fetchCategories();
    fetchParentCategories();
  }, []);

  const fetchCategories = () => {
    $.ajax({
      url: "https://ehundi-api.onrender.com/api/categories",
      method: "GET",
      success: (data) => {
        setCategories(data);
      },
      error: (xhr, status, error) => {
        console.error("Error fetching categories:", error);
        showToast("error", "Could not fetch categories.");
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
    toast.current.show({
      severity,
      summary: severity === "error" ? "Error" : "Success",
      detail,
      life: 3000,
    });
  };

  // Add or edit category submission
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
          handleSuccess(data);
          resetForm();
        },
        error: (xhr, status, error) => {
          console.error("Error submitting category:", error);
          showToast("error", "Could not save category.");
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
    showToast("success", "Category saved successfully");
    fetchCategories();
  };

  // Reset form and close dialog
  const resetForm = () => {
    setNewCategory({
      name: "",
      image: "",
      description: "",
      price: "",
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

  // Delete category
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

  // Render action buttons for each category
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
          setVisible(true); // Open the dialog
        }}
        className="p-button-text"
      />
      <Button
        label="Delete"
        className="p-button-danger p-button-text"
        onClick={() => {
          confirmDeleteCategory(rowData._id); // Use confirm dialog before deleting
        }}
      />
    </>
  );

  return (
    <div className="card">
      <Toast ref={toast} />
      <ConfirmDialog />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px",
        }}
      >
        <h2 style={{ marginTop: "7%" }}>Category Management</h2>
        <Button
          label="Add Category"
          onClick={() => {
            resetForm(); // Reset the form before showing
            setVisible(true); // Open the dialog
          }}
          style={{ marginRight: "20px" }}
        />
      </div>

      <DataTable
        value={categories}
        paginator
        rows={5}
        rowsPerPageOptions={[5, 10, 25]}
        style={{ padding: "0 30px" }}
      >
        <Column field="name" header="Category Name" />
        <Column field="description" header="Description" />
        <Column field="price" header="Price" />
        <Column
          field="parentCategory"
          header="Parent Category"
          body={(rowData) => rowData.parentCategory?.name || "Main Category"}
        />
        <Column field="action" header="Action" body={actionBodyTemplate} />
      </DataTable>

      <Dialog
        header={editingCategory ? "Edit Category" : "Add New Category"}
        visible={visible}
        onHide={resetForm}
        modal
        style={{ width: "50%" }} // Customize width if needed
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
              <div></div>
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
