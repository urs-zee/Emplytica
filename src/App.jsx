import "./App.css";
import AddEmp from "./components/addEmp/AddEmp";
import Register from "./components/register/Register";
import ShowEmp from "./components/showEmp/ShowEmp";
import UpdateEmp from "./components/updateEmp/UpdateEmp";
import RoutePath from "./routes/RoutePath";
import Login from "./components/login/Login";
import { Navbar } from "react-bootstrap";
function App() {
  return (
    <>
      {/* <ShowEmp /> */}
      {/* <AddEmp /> */}
      {/* <Register /> */}
      {/* <Login /> */}
      {/* <Navbar /> */}
      {/* <UpdateEmp /> */}
      <div className="main-content"></div>
      <RoutePath />
    </>
  );
}

export default App;
