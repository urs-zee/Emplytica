import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc, // <-- yeh add karna zaroori hai
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../../config/firebase_config";

const employeeCollectionRef = collection(db, "Employees");

const getEmployees = async () => {
  return await getDocs(employeeCollectionRef);
};
const getEmployee = async (id) => {
  const employeeDoc = doc(db, "Employees", id);
  return await getDoc(employeeDoc);
};

const addEmployee = (newEmp) => {
  return addDoc(employeeCollectionRef, newEmp);
};

const updateEmployee = async (id, employeeUpdates) => {
  try {
    const employeesDoc = doc(db, "Employees", id);
    await updateDoc(employeesDoc, employeeUpdates);
    console.log("Employee updated successfully");
  } catch (error) {
    console.log("Error updating employee:", error);
  }
};

const deleteEmployee = (id) => {
  const employeesDoc = doc(db, "Employees", id);
  return deleteDoc(employeesDoc);
};

const CRUD_OP = {
  getEmployees,
  getEmployee,
  addEmployee,
  updateEmployee,
  deleteEmployee,
};

export default CRUD_OP;
