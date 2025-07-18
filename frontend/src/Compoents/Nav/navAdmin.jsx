import React from 'react'
import { Link } from "react-router-dom";

function adminNav() {
  return (
    <div>
      <nav className='admin-nav'>
        <ul>
            <li>
                <Link to="/">Tanks</Link>
            </li>
            <li>
                <Link to="/staff-management">Staff</Link>
            </li>
        </ul>
      </nav>
    </div>
  )
};

export default adminNav;