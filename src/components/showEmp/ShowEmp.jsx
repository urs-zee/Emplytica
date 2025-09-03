import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CRUD_OP from "../services/Employee_Service";
import "./ShowEmp.css";

export default function ShowEmp() {
  const [empList, setEmpList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const data = await CRUD_OP.getEmployees();
      // console.log("Employee Data =>", data.docs);
      setEmpList(
        data.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    } catch (error) {
      console.log("Error fetching employees:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await CRUD_OP.deleteEmployee(id);
      fetchEmployees();
    } catch (error) {
      console.log("Error deleting employee:", error);
    }
  };

  return (
    <div className="show-emp-container">
      <h2 className="page-title">Employee List</h2>
      <div className="table-wrapper">
        <table className="emp-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Age</th>
              <th>Address</th>
              <th>Type</th>
              <th>Department</th>
              <th>Salary</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {empList.map((emp, idx) => (
              <tr key={emp.id}>
                <td>{idx + 1}</td>
                <td>{emp.name}</td>
                <td>{emp.email}</td>
                <td>{emp.phone}</td>
                <td>{emp.age}</td>
                <td>{emp.address}</td>
                <td>{emp.empType}</td>
                <td>{emp.dept}</td>
                <td>{emp.salary}</td>
                <td className="btn-group">
                  <button
                    className="btn btn-edit"
                    onClick={() => navigate(`/updateEmp/${emp.id}`)}
                  >
                    Edit
                  </button>

                  <button
                    className="btn btn-delete"
                    onClick={() => handleDelete(emp.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
