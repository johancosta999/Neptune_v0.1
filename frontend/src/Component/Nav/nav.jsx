import React from "react";
import { Link } from "react-router-dom";
import "../Nav/nav.css";  // optional styling

function Nav() {
  return (
    <div>
    <nav className="admin-nav">
      <ul>
        <li>
          <Link to="/">Dashboard</Link>
        </li>
        <li>
          <Link to="/water-quality/list">Water Quality</Link>
        </li>
        <li>
          <Link to="/tank-level">Tank Level</Link>
        </li>
        <li>
          <Link to="/issue-reports">Issue Reports</Link>
        </li>
        <li>
          <Link to="/user-management">User Management</Link>
        </li>
        <li>
          <Link to="/delivery">Water Delivery</Link>
        </li>
      </ul>
    </nav>
    </div>
  );
}

export default Nav;
