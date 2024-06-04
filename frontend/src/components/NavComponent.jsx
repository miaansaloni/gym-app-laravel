import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { LOGOUT } from "../redux/actions";

const NavComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user);

  const logout = () => {
    axios
      .post("/logout")
      .then(() => dispatch({ type: LOGOUT }))
      .then(() => navigate("/"));
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src="/logo.png" alt="Logo" />
      </div>
      <div className="navbar-links">
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          {user?.role === "user" && (
            <li className="nav-item">
              <Link className="nav-link active" to="/userdashboard">
                Booked Courses
              </Link>
            </li>
          )}
          {user?.role === "admin" && (
            <li className="nav-item">
              <Link className="nav-link active" to="/admindashboard">
                Admin Dashboard
              </Link>
            </li>
          )}
          <li>
            <a href="/courses">Courses</a>
          </li>
          <li>
            <a href="/plans&pricing">Plans & Pricing</a>
          </li>
          <li>
            <a href="/contacts">Contacts</a>
          </li>
        </ul>
      </div>
      {user ? (
        <>
          <Link className="nav-link active" to="/profile">
            {user.name}
          </Link>
          <img className="me-2" src={user.profile_image} alt="" style={{ height: "50px", width: "50px" }} />
          <button className="btn btn-primary" onClick={logout}>
            Logout
          </button>
        </>
      ) : (
        <>
          <Link className="btn btn-primary me-2" to="/login">
            Login
          </Link>
          <Link className="btn btn-primary" to="/register">
            Register
          </Link>
        </>
      )}
    </nav>
  );
};

export default NavComponent;
