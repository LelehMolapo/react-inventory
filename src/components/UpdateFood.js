import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import AdminHeader from "./layouts/AdminHeader";
import AdminSideBar from "./layouts/AdminSideBar";
import AdminFooter from "./layouts/AdminFooter";
import { db } from "../firebase";
import { collection, doc, updateDoc, getDocs } from "firebase/firestore";

export default function UpdateMedicine() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const categoriesCollectionReference = collection(db, "food_categories");
  const getCategories = async () => {
    const data = await getDocs(categoriesCollectionReference);
    setCategories(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };
  const [medTypes, setMedTypes] = useState([]);
  const medTypesCollectionRef = collection(db, "food_types");
  const getTypes = async () => {
    const data = await getDocs(medTypesCollectionRef);
    setMedTypes(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };
  useEffect(() => {
    getCategories();
    getTypes();
  }, []);
  const medicinesCollecitonRef = collection(db, "food_inventory");
  const [medicine, setMedicine] = useState(JSON.parse(localStorage.getItem("food_obj")));

  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const handleUpdateMedicine = async () => {
    if (
      medicine.name &&
      medicine.power &&
      medicine.category &&
      medicine.type &&
      medicine.price &&
      medicine.stock
    ) {
      const medDoc = doc(medicinesCollecitonRef, medicine.id);
      await updateDoc(medDoc, medicine);
      setErrorMsg("");
      setSuccessMsg("Food Updated Successfully!");
      setTimeout(() => {
        setSuccessMsg("");
        navigate("/inventory");
      }, 1000);
    } else {
      setErrorMsg("Please Fill Out All The Required Fields!");
    }
  };
  return (
    <>
      <AdminHeader />
      <AdminSideBar />
      <div className="main-panel">
        <div className="content">
          <div className="container-fluid">
            <h4 className="page-title">Change Meal</h4>
            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-header">
                    <div className="card-title">
                      Edit Medicine Details
                      <Link to="/inventory" className="btn btn-danger btn-sm float-right">
                        Go BACK
                      </Link>{" "}
                    </div>
                  </div>
                  <div className="card-body px-4">
                    <div className="form-group">
                      <label htmlFor="name">Meal Name</label>
                      <input
                        type="text"
                        className="form-control"
                        value={medicine.name}
                        id="name"
                        onChange={(event) =>
                          setMedicine((prev) => ({ ...prev, name: event.target.value }))
                        }
                        placeholder="Enter Medicine Name"
                      />
                    </div>

                    <div class="form-group">
                      <label for="exampleFormControlSelect1">Food Category</label>
                      <select
                        class="form-control"
                        onChange={(event) =>
                          setMedicine((prev) => ({ ...prev, category: event.target.value }))
                        }
                        id="exampleFormControlSelect1">
                        <option value="">Select a Category...</option>
                        {categories.map((category) => {
                          if (category.name === medicine.category) {
                            return (
                              <option value={category.name} selected="true">
                                {category.name}
                              </option>
                            );
                          } else {
                            return <option value={category.name}>{category.name}</option>;
                          }
                        })}
                      </select>
                    </div>
                    <div class="form-group">
                      <label for="exampleFormControlSelect2">Food Type</label>
                      <select
                        class="form-control"
                        onChange={(event) =>
                          setMedicine((prev) => ({ ...prev, type: event.target.value }))
                        }
                        id="exampleFormControlSelect2">
                        <option value="">Select a Type...</option>
                        {medTypes.map((medType) => {
                          if (medType.name === medicine.type) {
                            return (
                              <option value={medType.name} selected="true">
                                {medType.name}
                              </option>
                            );
                          } else {
                            return <option value={medType.name}>{medType.name}</option>;
                          }
                        })}
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="price">Food Price (in M.)</label>
                      <input
                        type="text"
                        className="form-control"
                        value={medicine.price}
                        id="price"
                        onChange={(event) =>
                          setMedicine((prev) => ({ ...prev, price: event.target.value }))
                        }
                        placeholder="Enter Medicine Price"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="stock">Food Stock</label>
                      <input
                        type="text"
                        className="form-control"
                        value={medicine.stock}
                        id="stock"
                        onChange={(event) =>
                          setMedicine((prev) => ({ ...prev, stock: event.target.value }))
                        }
                        placeholder="Enter Medicine Stock"
                      />
                    </div>
                  </div>

                  <div className="form-group px-4 mb-3">
                    <div className="text-center text-danger">{errorMsg}</div>
                    <div className="text-center text-success">{successMsg}</div>
                    <button className="btn btn-success mx-3" onClick={handleUpdateMedicine}>
                      Update Food
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
