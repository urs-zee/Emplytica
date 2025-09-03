import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { loginUser } from "../services/authentication";
import { myContext } from "../../../context/MyContext";
import Footer from "../footer/Footer";

export default function Login() {
  const { setUser } = useContext(myContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setMessage({ type: "error", text: "Please fill all the fields" });
      return;
    }

    try {
      const res = await loginUser(email, password);
      setUser(res);

      setMessage({ type: "success", text: "Login successful!" });

      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (err) {
      setMessage({ type: "error", text: "Login failed. Please try again." });
      console.error(err);
    }
  };

  return (
    <>
      <div className="login-page-wrapper">
        <div className="Login-container">
          <form className="login-form" onSubmit={handleSubmit}>
            <h2>Login</h2>

            {message && (
              <div className={`alert ${message.type}`}>{message.text}</div>
            )}

            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button className="submit-btn" type="submit">
              Submit
            </button>

            <button
              className="submit-btn"
              type="button"
              onClick={() => navigate("/register")}
            >
              New User? Register
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
