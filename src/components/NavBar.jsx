import { Link, Outlet } from "react-router-dom";
import {useAuth} from "../hooks/use-auth.js";
import "../styles/components/NavBar.css";

function NavBar() {
  const {auth, setAuth} = useAuth();

  const handleLogout = () => {
      window.localStorage.removeItem("token");
      setAuth({ token: null });
  };
  return (
    <>
      {/* Navigation Section */}
      <div id="nav-bar">
        <nav>
          <Link to="/">Home</Link>
          {auth.token ? (
            <Link to="/" onClick={handleLogout}>
              Log Out
            </Link>
          ) : (
            <Link to="/login">Login</Link>
          )}           
          <Link to="/CreateFundraiser">Create Fundraiser</Link>
          <Link to="/about">About</Link>
        </nav>
      </div>
      
      {/* Page Content Section */}
      <div id="page-content">
        <Outlet />
      </div>
    </>
  );
}





export default NavBar;