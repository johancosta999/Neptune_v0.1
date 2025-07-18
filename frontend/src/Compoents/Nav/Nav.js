import React from "react";
import { Link, useParams } from "react-router-dom";
import "../Nav/Nav.css";  // optional styling

function Nav() {
  const { tankId } = useParams();  // ✅ corrected useParams usage

  return (
    <nav className="admin-nav">
      <ul>
        <li>
          <Link to={`/tank/${tankId}/dashboard`}>Tank Dashboard</Link>
        </li>
        <li>
          <Link to={`/tank/${tankId}/water-quality`}>Water Quality</Link>
        </li>
        <li>
          <Link to={`/tank/${tankId}/tank-level`}>Tank Level</Link>
        </li>
        <li>
          <Link to={`/tank/${tankId}/issues`}>Issue Reports</Link>
        </li>
        <li>
          <Link to={"/"}>HOME</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;