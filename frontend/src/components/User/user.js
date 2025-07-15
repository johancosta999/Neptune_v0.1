import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function User(props) {
  const { _id, name, gmail, age, Address } = props.user;
  const navigate = useNavigate();

  const deleteHandler = async () => {
    try {
      const res = await axios.delete(`http://localhost:5000/users/${_id}`);
      console.log("User deleted:", res.data);
      navigate("/UserDetails");
    } catch (err) {
      console.error("Error deleting user:", err.response?.data || err.message);
      alert("Failed to delete user.");
    }
  };

  return (
    <div>
      <h1>ID: {_id}</h1>
      <h1>Name: {name}</h1>
      <h1>Gmail: {gmail}</h1>
      <h1>Age: {age}</h1>
      <h1>Address: {Address}</h1>

      {/* ✅ Corrected route for update */}
      <Link to={`/UpdateUser/${_id}`}>Update</Link>

      {/* ✅ Fix: bind the onClick to a function */}
      <button onClick={deleteHandler}>Delete</button>
      <br />
    </div>
  );
}

export default User;
