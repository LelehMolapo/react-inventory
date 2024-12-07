import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import AdminHeader from "./layouts/AdminHeader";
import AdminSideBar from "./layouts/AdminSideBar";
import AdminFooter from "./layouts/AdminFooter";
import { db } from "../firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

export default function AddFood() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const categoriesCollectionReference = collection(db, "food_categories");
  const getCategories = async () => {
    const data = await getDocs(categoriesCollectionReference);
    setCategories(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };
  const [foodTypes, setFoodTypes] = useState([]);
  const foodTypesCollectionRef = collection(db, "food_types");
  const getTypes = async () => {
    const data = await getDocs(foodTypesCollectionRef);
    setFoodTypes(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };
  useEffect(() => {
    getCategories();
    getTypes();
  }, []);
  const foodCollectionRef = collection(db, "food_inventory");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [food, setFood] = useState({
    name: "",
    category: "",
    type: "",
    price: "",
    stock: "",
  });
  const handleAddFood = async () => {
    if (
      food.name &&
      food.category &&
      food.type &&
      food.price &&
      food.stock
    ) {
      setErrorMsg("");
      await addDoc(foodCollectionRef, {
        name: food.name,
        category: food.category,
        type: food.type,
        price: food.price,
        stock: food.stock,
      });
      setSuccessMsg("Food added successfully!");
      setTimeout(() => {
        setSuccessMsg("");
        navigate("/inventory");
      }, 1000);
    } else {
      setErrorMsg("Please fill out all the required fields!");
    }
  };
  return (
    <>
      <AdminHeader />
      <AdminSideBar />
      <div className="main-panel">
        <div className="content">
          <div className="container-fluid">
            <h4 className="page-title">Add Stock</h4>
            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-header">
                    <div className="card-title">
                      New Inventory Details
                      <Link to="/inventory" className="btn btn-danger btn-sm float-right">
                        Go BACK
                      </Link>{" "}
                    </div>
                  </div>
                  <div className="card-body px-4">
                    <div className="form-group">
                      <label htmlFor="name">Food Name</label>
                      <input
                        type="text"
                        className="form-control"
                        value={food.name}
                        id="name"
                        onChange={(event) =>
                          setFood((prev) => ({ ...prev, name: event.target.value }))
                        }
                        placeholder="Enter Food Name"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="exampleFormControlSelect1">Food Category</label>
                      <select
                        className="form-control"
                        onChange={(event) =>
                          setFood((prev) => ({ ...prev, category: event.target.value }))
                        }
                        id="exampleFormControlSelect1">
                        <option value="">Select Food Category...</option>
                        {categories.map((category) => {
                          return <option value={category.name} key={category.id}>{category.name}</option>;
                        })}
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="exampleFormControlSelect2">Food Type</label>
                      <select
                        className="form-control"
                        onChange={(event) =>
                          setFood((prev) => ({ ...prev, type: event.target.value }))
                        }
                        id="exampleFormControlSelect2">
                        <option value="">Select Food Type...</option>
                        {foodTypes.map((foodType) => {
                          return <option value={foodType.name} key={foodType.id}>{foodType.name}</option>;
                        })}
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="price">Food Price (in M.)</label>
                      <input
                        type="text"
                        className="form-control"
                        value={food.price}
                        id="price"
                        onChange={(event) =>
                          setFood((prev) => ({ ...prev, price: event.target.value }))
                        }
                        placeholder="Enter Food Price"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="stock">Food Stock</label>
                      <input
                        type="text"
                        className="form-control"
                        value={food.stock}
                        id="stock"
                        onChange={(event) =>
                          setFood((prev) => ({ ...prev, stock: event.target.value }))
                        }
                        placeholder="Enter Food Stock"
                      />
                    </div>
                  </div>

                  <div className="form-group px-4 mb-3">
                    <div className="text-center text-danger">{errorMsg}</div>
                    <div className="text-center text-success">{successMsg}</div>
                    <button className="btn btn-primary mx-3" onClick={handleAddFood}>
                      Add Food
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
