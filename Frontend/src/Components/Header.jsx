import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <nav style={{ padding: "1rem", background: "#222", color: "white" }}>
      <Link to="/" style={{ margin: "1rem", color: "white" }}>Home</Link>
      <Link to="/users" style={{ margin: "1rem", color: "white" }}>Users</Link>
      <Link to="/staff" style={{ margin: "1rem", color: "white" }}>Staff</Link>
      <Link to="/billing" style={{ margin: "1rem", color: "white" }}>Billing</Link>
    </nav>
  );
}

export default Header;
