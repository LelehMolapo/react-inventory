import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AdminHeader from "./layouts/AdminHeader";
import AdminSideBar from "./layouts/AdminSideBar";
import AdminFooter from "./layouts/AdminFooter";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

export default function AddType() {
  const navigate = useNavigate();
  const medTypesCollectionRef = collection(db, "food_types");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [medTypeName, setFoodTypeName] = useState("");
  const handleAddType = async () => {
    if (medTypeName) {
      setErrorMsg("");
      await addDoc(medTypesCollectionRef, { name: medTypeName });
      setSuccessMsg("Food Type added successfully!");
      setTimeout(() => {
        setSuccessMsg("");
        navigate("/types");
      }, 1000);
    } else {
      setErrorMsg("Food Type Name Required!");
    }
  };
  return (
    <>
      <AdminHeader />
      <AdminSideBar />
      <div className="main-panel">
        <div className="content">
          <div className="container-fluid">
            <h4 className="page-title">Create Type</h4>
            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-header">
                    <div className="card-title">
                      New Type Details
                      <Link to="/types" className="btn btn-danger btn-sm float-right">
                        Go BACK
                      </Link>{" "}
                    </div>
                  </div>
                  <div className="card-body px-4">
                    <div className="form-group">
                      <label htmlFor="name">Type Name</label>
                      <input
                        type="text"
                        className="form-control"
                        value={medTypeName}
                        id="name"
                        onChange={(event) => {
                          setFoodTypeName(event.target.value);
                        }}
                        placeholder="Enter Food Type"
                      />
                    </div>
                  </div>
                  <div className="form-group px-4 mb-3">
                    <div className="text-center text-danger">{errorMsg}</div>
                    <div className="text-center text-success">{successMsg}</div>
                    <button className="btn btn-primary mx-3" onClick={handleAddType}>
                      Add Food Type
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
