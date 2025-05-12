// import { useState } from 'react'
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Home from "./components/Home.jsx";
import Signin from "./components/Signin.jsx";
import Register from "./components/Register.jsx";
import "./App.css";
import ForgetPassword from "./components/ForgetPassword.jsx";
import UpdatePassword from "./components/UpdatePassword.jsx";

function App() {
  return (
    <>
      <ToastContainer />
      <div className="w-full bg-blue-600 text-white py-3 px-6 shadow-md text-center text-xl font-semibold">
        User Authentication Process
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<Signin />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route path="/update-password" element={<UpdatePassword />} />
      </Routes>
    </>
  );
}

export default App;
