import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import CRUD_OP from "../services/Employee_Service";
import "./UpdateEmp.css";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";

export default function UpdateEmp() {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");
  const [address, setAddress] = useState("");
  const [dept, setDept] = useState("");
  const [empType, setEmpType] = useState("");
  const [salary, setSalary] = useState("");

  const [message, setMessage] = useState({ error: false, msg: "" });

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        if (state) {
          setName(state.name || "");
          setEmail(state.email || "");
          setPhone(state.phone || "");
          setAge(state.age || "");
          setAddress(state.address || "");
          setDept(state.dept || "");
          setEmpType(state.empType || "");
          setSalary(state.salary || "");
        } else if (id) {
          const docSnap = await CRUD_OP.getEmployee(id);
          if (docSnap.exists()) {
            const data = docSnap.data();
            setName(data.name || "");
            setEmail(data.email || "");
            setPhone(data.phone || "");
            setAge(data.age || "");
            setAddress(data.address || "");
            setDept(data.dept || "");
            setEmpType(data.empType || "");
            setSalary(data.salary || "");
          } else {
            setMessage({ error: true, msg: "No such employee found!" });
          }
        }
      } catch (error) {
        console.log("Error fetching employee:", error);
        setMessage({ error: true, msg: "Failed to fetch employee data!" });
      }
    };

    fetchEmployee();
  }, [id, state]);

  // update employee
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await CRUD_OP.updateEmployee(id, {
        name,
        email,
        phone,
        age,
        address,
        dept,
        empType,
        salary,
      });

      setMessage({ error: false, msg: "Employee updated successfully!" });

      setTimeout(() => navigate("/"), 1500);
    } catch (error) {
      console.log("Error updating employee:", error);
      setMessage({ error: true, msg: "Error updating employee!" });
    }
  };

  return (
    <>
      <Navbar />
      <div className="update-page-wrapper">
        <div className="update-emp-container">
          <h2>Update Employee</h2>

          {message.msg && (
            <div className={`alert ${message.error ? "error" : "success"}`}>
              {message.msg}
            </div>
          )}

          <form onSubmit={handleUpdate} className="update-form">
            <input
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="text"
              placeholder="Enter phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <input
              type="number"
              placeholder="Enter age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
            <input
              type="text"
              placeholder="Enter address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <input
              type="text"
              placeholder="Enter department"
              value={dept}
              onChange={(e) => setDept(e.target.value)}
            />
            <input
              type="text"
              placeholder="Enter employee type"
              value={empType}
              onChange={(e) => setEmpType(e.target.value)}
            />
            <input
              type="number"
              placeholder="Enter salary"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
            />

            <button type="submit" className="btn-submit">
              Update
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
