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
              <Link className="nav-link" to="/userdashboard">
                Booked Courses
              </Link>
            </li>
          )}
          {user?.role === "admin" && (
            <li className="nav-item">
              <Link className="nav-link" to="/admindashboard">
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
        user.role === "user" ? (
          <>
            <Link to="/profile">{user.name}</Link>
            <img src={user.profile_image} alt="" style={{ height: "35px", width: "35px", borderRadius: "50%" }} />
            <button onClick={logout}>Logout</button>
          </>
        ) : user.role === "admin" ? (
          <>
            <p>{user.name}</p>
            <img src={user.profile_image} alt="" style={{ height: "50px", width: "50px" }} />
            <button onClick={logout}>Logout</button>
          </>
        ) : null
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
};

export default NavComponent;
