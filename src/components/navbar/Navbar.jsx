import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { logoutUser } from "../services/authentication";
import { useContext, useState } from "react";
import { myContext } from "../../../context/MyContext";
import { CircleUserRound } from "lucide-react";

export default function Navbar() {
  const { user, setUser } = useContext(myContext);
  const navigate = useNavigate();
  const [toastMsg, setToastMsg] = useState("");
  const [toastType, setToastType] = useState("success");

  const handleLogout = async () => {
    try {
      await logoutUser();
      setUser(null);
      setToastType("success");
      setToastMsg(" User logged out successfully");
      setTimeout(() => setToastMsg(""), 3000);
      navigate("/login");
    } catch (err) {
      console.error(err);
      setToastType("error");
      setToastMsg(" Error while logging out, try again");
      setTimeout(() => setToastMsg(""), 3000);
    }
  };

  return (
    <>
      <div className="navbar">
        <h2 className="logo-cont" onClick={() => navigate("/")}>
          Emplytica
        </h2>
        <div className="links-cont">
          <ul className="link-list-cont">
            <li className="navabarBtn" onClick={() => navigate("/")}>
              Home
            </li>
            <li className="navabarBtn" onClick={() => navigate("/addEmp")}>
              Add New
            </li>
            <li className="navabarBtn" onClick={() => navigate("/about-us")}>
              About Us
            </li>
          </ul>
        </div>

        <div className="user-cont">
          <div className="dropdown">
            <Link
              className="dropdown-toggle user-img rounded-5"
              data-bs-toggle="dropdown"
            >
              <CircleUserRound />
            </Link>
            {/* <img
              className="dropdown-toggle user-img rounded-5"
              data-bs-toggle="dropdown"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJAVgEZdN3i24u5KqiegG9MCyzQPyAgKvmMw&s"
              alt="user-img"
            /> */}

            <ul className="dropdown-menu dropdown-menu-end">
              {user ? (
                <div>
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={handleLogout}
                      style={{ cursor: "pointer" }}
                    >
                      Logout
                    </button>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/help">
                      Help
                    </Link>
                  </li>
                </div>
              ) : (
                <div>
                  <li>
                    <Link className="dropdown-item" to="/login">
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/register">
                      Register
                    </Link>
                  </li>
                </div>
              )}
            </ul>
          </div>
        </div>
      </div>
      {toastMsg && (
        <div className={`toast-message ${toastType}`}>{toastMsg}</div>
      )}
    </>
  );
}
