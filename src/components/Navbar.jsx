import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { username, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <NavLink to="/" className="navbar-brand">
        <span className="dot" />
        CRUD
      </NavLink>
      <div className="navbar-links">
        <NavLink to="/" end className={({ isActive }) => (isActive ? "active" : "")}>
          Home
        </NavLink>
        <NavLink to="/orders/create" className={({ isActive }) => (isActive ? "active" : "")}>
          Create Order
        </NavLink>
        <NavLink to="/orders/view" className={({ isActive }) => (isActive ? "active" : "")}>
          View Orders
        </NavLink>
        {/* {username && <span className="navbar-username">{username}</span>} */}
        <button className="btn btn-secondary btn-small" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}
