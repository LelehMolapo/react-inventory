import React, { useState, useEffect } from "react";
import AdminHeader from "./layouts/AdminHeader";
import AdminSideBar from "./layouts/AdminSideBar";
import AdminFooter from "./layouts/AdminFooter";
import { Link } from "react-router-dom";
import { db } from "../firebase";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";

export default function Inventory() {
  var counter = 1;
  const [foods, setFoods] = useState([]); // State for food items
  const foodsCollectionRef = collection(db, "food_inventory"); // Firebase collection reference

  // Fetch food items from Firestore
  const getFoods = async () => {
    const data = await getDocs(foodsCollectionRef);
    setFoods(
      data.docs.map((doc) => ({
        id: doc.id,
        FoodName: doc.data().FoodName,
        FoodCategory: doc.data().FoodCategory,
        FoodType: doc.data().FoodType,
        FoodPrice: doc.data().FoodPrice,
        Stock: doc.data().Stock,
      }))
    );
  };

  // Handle deletion of a food item
  const handleDeleteButton = async (id) => {
    const foodDoc = doc(foodsCollectionRef, id);
    await deleteDoc(foodDoc);
    getFoods(); // Refresh the list after deletion
  };

  useEffect(() => {
    getFoods(); // Fetch food items when the component mounts
  }, []);

  return (
    <>
      <AdminHeader />
      <AdminSideBar />
      <div className="main-panel">
        <div className="content">
          <div className="container-fluid">
            <h4 className="page-title">Food Inventory</h4>
            <div className="row">
              <div className="col-md-12">
                <div className="card card-tasks">
                  <div className="card-header">
                    <h4 className="card-title">
                      Inventory List{" "}
                      <Link to="/addfood" className="btn btn-primary btn-sm float-right">
                        Add New Food
                      </Link>{" "}
                    </h4>
                  </div>
                  <div className="card-body">
                    <div className="table-full-width px-5 py-4 table-striped">
                      <table className="table">
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Food Name</th>
                            <th>Food Category</th>
                            <th>Food Type</th>
                            <th>Food Price</th>
                            <th>Stock</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {foods.map((food) => {
                            return (
                              <tr key={food.id}>
                                <td>{counter++}</td>
                                <td>{food.FoodName}</td>
                                <td>{food.FoodCategory}</td>
                                <td>{food.FoodType}</td>
                                <td>₹{food.FoodPrice}</td>
                                <td>{food.Stock}</td>
                                <td className="td-actions">
                                  <div className="form-button-action">
                                    <Link to="/updatefood">
                                      <button
                                        type="button"
                                        className="btn btn-link btn-success"
                                        onClick={() => {
                                          localStorage.setItem(
                                            "food_obj",
                                            JSON.stringify(food)
                                          );
                                        }}
                                      >
                                        <i className="la la-edit"></i>
                                      </button>
                                    </Link>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        handleDeleteButton(food.id);
                                      }}
                                      className="btn btn-link btn-danger"
                                    >
                                      <i className="la la-times"></i>
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
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
