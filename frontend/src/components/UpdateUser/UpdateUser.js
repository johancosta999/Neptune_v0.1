import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function UpdateUser() {
  const { _id } = useParams(); // you use "_id" in route
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    name: "",
    gmail: "",
    age: "",
    Address: ""  // 🔴 match exactly with backend field
  });

  useEffect(() => {
    axios.get(`http://localhost:5000/api/users/${_id}`)
      .then(res => setInputs(res.data))
      .catch(err => console.error("Error fetching user:", err));
  }, [_id]);

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:5000/api/users/${_id}`, inputs)
      .then(() => {
        console.log("User updated successfully");
        navigate("/UserDetails");
      })
      .catch(err => console.error("Error updating user:", err));
  };

  return (
    <div className="form-container">
      <h2>Update User</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={inputs.name}
          onChange={handleChange}
          required
        />

        <label>Gmail:</label>
        <input
          type="email"
          name="gmail"
          value={inputs.gmail}
          onChange={handleChange}
          required
        />

        <label>Age:</label>
        <input
          type="number"
          name="age"
          value={inputs.age}
          onChange={handleChange}
          required
        />

        <label>Address:</label>
        <input
          type="text"
          name="Address"  // 🔴 Must match state key and backend field
          value={inputs.Address}
          onChange={handleChange}
          required
        />

        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default UpdateUser;
