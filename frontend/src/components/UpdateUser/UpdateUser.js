import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function UpdateUser() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    name: "",
    gmail: "",
    age: "",
    Address: ""
  });

  useEffect(() => {
    if (!id) {
      console.error("❌ No user ID provided in route");
      return;
    }

    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/users/${id}`);
        console.log("✅ Fetched user:", res.data);
        setInputs(res.data.user || res.data);
      } catch (err) {
        console.error("❌ Error fetching user:", err);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/users/${id}`, inputs);
      navigate("/UserDetails");
    } catch (err) {
      console.error("❌ Error updating user:", err);
    }
  };

  return (
    <div>
      <h2>Update User</h2>
      <form onSubmit={handleSubmit}>

        <label htmlFor="name">Name:</label>
        <input
          id="name"
          type="text"
          name="name"
          value={inputs.name || ""}
          onChange={handleChange}
          required
          placeholder="Enter name"
        />

        <label htmlFor="gmail">Gmail:</label>
        <input
          id="gmail"
          type="email"
          name="gmail"
          value={inputs.gmail || ""}
          onChange={handleChange}
          required
          placeholder="Enter email"
        />

        <label htmlFor="age">Age:</label>
        <input
          id="age"
          type="number"
          name="age"
          value={inputs.age || ""}
          onChange={handleChange}
          required
          placeholder="Enter age"
        />

        <label htmlFor="Address">Address:</label>
        <input
          id="Address"
          type="text"
          name="Address"
          value={inputs.Address || ""}
          onChange={handleChange}
          required
          placeholder="Enter address"
        />

        <br /><br />
        <button type="submit">Update User</button>
      </form>
    </div>
  );
}

export default UpdateUser;
