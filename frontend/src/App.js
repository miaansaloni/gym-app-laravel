import "./App.css";
import axios from "axios";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { LOGIN } from "./redux/actions";
import NavComponent from "./components/NavComponent";
import FooterComponent from "./components/FooterComponent";
import NotFound from "./pages/NotFound";
import GuestRoutes from "./pages/GuestRoutes";
import Login from "./pages/Login";
import Register from "./pages/Register";
import LandingPage from "./pages/LandingPage";
import ProfileComponent from "./pages/ProfileComponent";
import ProtectedRoutes from "./pages/ProtectedRoutes";
import PlansPricing from "./pages/PlansPricing";
import ContactsComponent from "./pages/ContactsComponent";
import CoursesComponent from "./pages/CoursesComponent";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  axios.defaults.withCredentials = true;
  axios.defaults.withXSRFToken = true;

  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    axios("/api/user")
      .then((res) =>
        dispatch({
          type: LOGIN,
          payload: res.data,
        })
      )
      .catch((err) => console.log(err))
      .finally(() => setLoaded(true));
  }, [dispatch]);

  return (
    loaded && (
      <BrowserRouter>
        <NavComponent />
        <div>
          <Routes>
            {/* rotte accessibili da tutti */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/plans&pricing" element={<PlansPricing />} />
            <Route path="/contacts" element={<ContactsComponent />} />
            <Route path="/courses" element={<CoursesComponent />} />

            {/* rotte accessibili solo se NON si è loggati */}
            <Route element={<GuestRoutes />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Route>

            {/* rotte accessibili solo se sei loggato */}
            <Route element={<ProtectedRoutes />}>
              <Route path="/profile" element={<ProfileComponent />} />
              <Route path="/userdashboard" element={<UserDashboard />} />
              <Route path="/admindashboard" element={<AdminDashboard />} />
            </Route>

            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/404" />} />
          </Routes>
        </div>
        <FooterComponent />
      </BrowserRouter>
    )
  );

  // return (
  //   loaded && (
  //     <BrowserRouter>
  //       <NavComponent />
  //       <div className="container">
  //         <Routes>
  //           {/* rotte accessibili da tutti */}
  //           <Route path="" element={""} />

  //           {/* rotte accessibili solo se sei loggato */}
  //           <Route path="" element={""} />

  //           {/* rotte accessibili solo se NON sei loggato */}
  //           <Route path="" element={""} />

  //           <Route path="/404" element={<NotFound />} />
  //           <Route path="*" element={<Navigate to="/404" />} />
  //         </Routes>
  //       </div>

  //       <FooterComponent />
  //     </BrowserRouter>
  //   )
  // );
}

export default App;
