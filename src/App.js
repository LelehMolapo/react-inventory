import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import AdminLogin from "./components/AdminLogin";
import AdminRegister from "./components/AdminRegister";
import AdminProfile from "./components/AdminProfile";
import FoodCategory from "./components/FoodCategory";
import AddCategory from "./components/AddCategory";
import UpdateCategory from "./components/UpdateCategory";
import FoodTypes from "./components/FoodTypes";
import AddType from "./components/AddType";
import UpdateType from "./components/UpdateType";
import Inventory from "./components/Inventory";
import AddFood from "./components/AddFood";  // Updated import
import UpdateFood from "./components/UpdateFood";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<AdminLogin />} />
        <Route path="/register" element={<AdminRegister />} />
        <Route path="/profile" element={<AdminProfile />} />
        <Route path="/categories" element={<FoodCategory />} />
        <Route path="/addcategory" element={<AddCategory />} />
        <Route path="/updatecategory" element={<UpdateCategory />} />
        <Route path="/types" element={<FoodTypes />} />
        <Route path="/addtype" element={<AddType />} />
        <Route path="/updatetype" element={<UpdateType />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/addfood" element={<AddFood />} />  {/* Updated route */}
        <Route path="/updatefood" element={<UpdateFood />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
