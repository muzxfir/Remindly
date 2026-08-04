import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link className="brand" to="/">🔔 <span>Remindly</span></Link>
      <div className="nav-actions">
        <Link className="secondary" to="/login">Login</Link>
        <Link className="primary" to="/register">Sign Up</Link>
      </div>
    </nav>
  );
}
