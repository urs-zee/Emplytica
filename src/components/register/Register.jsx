import React, { useState, useEffect } from "react";
import "./Register.css";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../../config/firebase_config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import Footer from "../footer/Footer";

export default function Registration() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState({ error: false, msg: "" });
  const navigate = useNavigate();

  useEffect(() => {
    if (message.msg) {
      const timer = setTimeout(
        () => setMessage({ error: false, msg: "" }),
        3000
      );
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setMessage({ error: true, msg: "Please fill all fields" });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setMessage({ error: true, msg: "Passwords do not match" });
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      const uid = userCredential.user.uid;

      await addDoc(collection(db, "Users"), {
        uid: uid,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        createdAt: new Date(),
      });

      setMessage({ error: false, msg: "Registration Successful!" });

      setFormData({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
      });
      navigate("/login");
    } catch (err) {
      setMessage({ error: true, msg: err.message });
    }
  };

  return (
    <>
      <div className="register-page-wrapper">
        <div className="registration-container">
          {message.msg && (
            <div className={`alert ${message.error ? "error" : "success"}`}>
              {message.msg}
            </div>
          )}
          <form className="registration-form" onSubmit={handleSubmit}>
            <h2>Sign Up</h2>

            <input
              type="text"
              name="name"
              placeholder="Enter Full Name"
              value={formData.name}
              onChange={handleChange}
            />

            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              value={formData.email}
              onChange={handleChange}
            />

            <input
              type="tel"
              name="phone"
              placeholder="Enter Phone Number"
              value={formData.phone}
              onChange={handleChange}
            />

            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              value={formData.password}
              onChange={handleChange}
            />

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />

            <button type="submit" className="btn-submit">
              Register
            </button>

            <button
              type="button"
              className="btn-submit"
              onClick={() => navigate("/login")}
            >
              Already A User? Login
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
