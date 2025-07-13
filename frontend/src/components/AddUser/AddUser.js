import { useNavigate } from "react-router-dom";
import { useState } from "react";

import axios from 'axios';


function AddUser(){
  const navigate = useNavigate();
const [inputs, setInputs] = useState({
  name: "",
  gmail: "",
  age: "",
  address: "",
});

   const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/users', inputs);
      alert("User Added Successfully!");
      navigate('/userdetails'); // redirect to user details page
    } catch (err) {
      console.error("Error creating user:", err);
      alert("Failed to add user.");
    }
  };
  return (
    <div>
        <h1>Add user</h1>
         <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label><br />
          <input type="text" name="name" value={inputs.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Gmail:</label><br />
          <input type="email" name="gmail" value={inputs.gmail} onChange={handleChange} required />
        </div>
        <div>
          <label>Age:</label><br />
          <input type="number" name="age" value={inputs.age} onChange={handleChange} required />
        </div>
        <div>
          <label>Address:</label><br />
          <input type="text" name="Address" value={inputs.Address} onChange={handleChange} required />
        </div>
        <br />
        <button type="submit">Add User</button>
      </form>
    </div>
  );
  
  
}

export default AddUser