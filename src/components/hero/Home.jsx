import React from "react";
import Navbar from "../navbar/Navbar";
import ShowEmp from "../showEmp/ShowEmp";
import Footer from "../footer/Footer";
import "./Home.css";

export default function Home() {
  return (
    <div className="home-container">
      <Navbar />
      <ShowEmp />
      <Footer />
    </div>
  );
}
