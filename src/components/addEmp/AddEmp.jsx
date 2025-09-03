import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CRUD_OP from "../services/Employee_Service";
import "./addEmp.css";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";

export default function AddEmp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");
  const [address, setAddress] = useState("");
  const [dept, setDept] = useState("");
  const [empType, setEmpType] = useState("");
  const [salary, setSalary] = useState("");
  const [message, setMessage] = useState({ error: false, msg: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !name ||
      !email ||
      !phone ||
      !age ||
      !address ||
      !dept ||
      !empType ||
      !salary
    ) {
      setMessage({ error: true, msg: "Please fill all the fields" });
      return;
    }

    const newEmp = { name, email, phone, age, address, dept, empType, salary };
    setMessage("");
    try {
      await CRUD_OP.addEmployee(newEmp);
      setMessage({ error: false, msg: "New Employee Added Successfully" });

      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (err) {
      console.log(err);
      setMessage({ error: true, msg: err.message });
    }

    // Reset fields
    setName("");
    setEmail("");
    setPhone("");
    setAge("");
    setAddress("");
    setDept("");
    setEmpType("");
    setSalary("");
  };

  return (
    <>
      <Navbar />
      <div
        className="d-flex justify-content-center align-items-center"
        style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #0a4270f2, #4b0082d9 100%)",
          padding: "20px",
        }}
      >
        <div
          className="card shadow-lg p-4"
          style={{
            width: "70%",
            maxWidth: "800px",
            background: "rgba(255, 255, 255, 0.15)",
            backdropFilter: "blur(12px)",
            borderRadius: "15px",
            border: "1px solid rgba(255, 255, 255, 0.3)",
            color: "#fff",
          }}
        >
          {message?.msg && (
            <div
              className={`alert ${
                message.error ? "alert-danger" : "alert-success"
              } alert-dismissible fade show`}
              role="alert"
              style={{
                fontSize: "1rem",
                fontWeight: "600",
                borderRadius: "10px",
                backgroundColor: message.error
                  ? "rgba(220,53,69,0.85)"
                  : "rgba(40,167,69,0.85)",
                color: "#fff",
              }}
            >
              {message.msg}
              <button
                type="button"
                className="btn-close btn-close-white"
                onClick={() => setMessage("")}
                style={{ boxShadow: "none" }}
              ></button>
            </div>
          )}

          <h2 className="text-center mb-4 fw-bold"> Add Employee </h2>

          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <label htmlFor="Name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  id="Name"
                  className="form-control bg-light text-dark"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  placeholder="Enter Employee Name"
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="Email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  id="Email"
                  className="form-control bg-light text-dark"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Employee Email"
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="Phone" className="form-label">
                  Phone
                </label>
                <input
                  type="tel"
                  id="Phone"
                  className="form-control bg-light text-dark"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter Employee Phone"
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="Age" className="form-label">
                  Age
                </label>
                <input
                  type="number"
                  id="Age"
                  className="form-control bg-light text-dark"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="Enter Employee Age"
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="Address" className="form-label">
                  Address
                </label>
                <input
                  type="text"
                  id="Address"
                  className="form-control bg-light text-dark"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter Employee Address"
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="Dept" className="form-label">
                  Department
                </label>
                <input
                  type="text"
                  id="Dept"
                  className="form-control bg-light text-dark"
                  value={dept}
                  onChange={(e) => setDept(e.target.value)}
                  placeholder="Enter Employee Dept"
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="empType" className="form-label">
                  Employee Type
                </label>
                <input
                  type="text"
                  id="empType"
                  className="form-control bg-light text-dark"
                  value={empType}
                  onChange={(e) => setEmpType(e.target.value)}
                  placeholder="Enter Employee Type"
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="Salary" className="form-label">
                  Salary
                </label>
                <input
                  type="number"
                  id="Salary"
                  className="form-control bg-light text-dark"
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                  placeholder="Enter Employee Salary"
                />
              </div>
            </div>

            <div className="text-center mt-4">
              <button type="submit" className="btn btn-light fw-bold px-4 me-3">
                Submit
              </button>
              <a href="/" className="btn btn-outline-light fw-bold px-4">
                Home
              </a>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
