import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import AdminHeader from "./layouts/AdminHeader";
import AdminSideBar from "./layouts/AdminSideBar";
import AdminFooter from "./layouts/AdminFooter";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

export default function AddCategory() {
  const navigate = useNavigate();

  // Updated collection name for food categories
  const categoryCollectionRef = collection(db, "food_categories");
  
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [catName, setCatName] = useState("");

  // Handle adding a new food category
  const handleAddCategory = async () => {
    if (catName) {
      setErrorMsg("");
      await addDoc(categoryCollectionRef, { name: catName });
      setSuccessMsg("Category added successfully!");
      setTimeout(() => {
        setSuccessMsg("");
        navigate("/categories"); // Redirect to categories page after success
      }, 1000);
    } else {
      setErrorMsg("Category name is required!");
    }
  };

  return (
    <>
      <AdminHeader />
      <AdminSideBar />
      <div className="main-panel">
        <div className="content">
          <div className="container-fluid">
            <h4 className="page-title">Food Category</h4> {/* Update the page title */}
            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-header">
                    <div className="card-title">
                      New Food Category Details {/* Update to food category */}
                      <Link to="/categories" className="btn btn-danger btn-sm float-right">
                        Go BACK
                      </Link>{" "}
                    </div>
                  </div>
                  <div className="card-body px-4">
                    <div className="form-group">
                      <label htmlFor="name">Category Name</label> {/* Label for category */}
                      <input
                        type="text"
                        className="form-control"
                        value={catName}
                        id="name"
                        onChange={(event) => {
                          setCatName(event.target.value);
                        }}
                        placeholder="Enter Category Name"
                      />
                    </div>
                  </div>
                  <div className="form-group px-4 mb-3">
                    <div className="text-center text-danger">{errorMsg}</div>
                    <div className="text-center text-success">{successMsg}</div>
                    <button className="btn btn-primary mx-3" onClick={handleAddCategory}>
                      Add Category {/* Button label */}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <AdminFooter />
      </div>
    </>
  );
}
