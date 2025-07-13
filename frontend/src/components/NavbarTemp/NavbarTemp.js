import React from "react";
import { Link } from "react-router-dom";
import './Nav.css';



function Nav() {
  return (
    <ul className="home-ul">
      <li className="home-li">
        <Link to="/mainhome" className="active home-a">
        <h1>home</h1>
        </Link>
      </li>
      <li className="home-li">
        <Link to="/AddUser" className="active home-a">
         <h1>Add user</h1>
        </Link>
       
      </li>
      <li className="home-li">
        <Link to="/UserDetails" className="active home-a">
        <h1>user details</h1>
        </Link>
        
      </li>
    </ul>
  );
}

export default Nav;

