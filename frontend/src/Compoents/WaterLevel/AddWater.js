import React, { useState } from "react";
import axios from "axios";
import Nav from "../Nav/Nav";

function AddWater() {
  const [form, setForm] = useState({
    tankId: "",
    currentLevel: "",
    maxCapacity: "",
    location: "",
    status: "Normal",
    recordedAt: new Date().toISOString(),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/data", form);
      alert("✅ Water level record added!");
      console.log(res.data);
      setForm({
        tankId: "",
        currentLevel: "",
        maxCapacity: "",
        location: "",
        status: "Normal",
        recordedAt: new Date().toISOString(),
      });
    } catch (err) {
      console.error("❌ Error:", err);
      alert("❌ Failed to add water level.");
    }
  };

  return (
    <div
      style={{
        backgroundImage: "url('/water-bg.jpg')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        minHeight: "100vh",
        paddingBottom: "40px",
      }}
    >
      <Nav />
      <h2 style={{ textAlign: "center", marginTop: "20px", color: "#ffffff", textShadow: "2px 2px 5px #000" }}>
        💧 Add Water Level
      </h2>

      <form
        onSubmit={handleSubmit}
        style={{
          maxWidth: "600px",
          margin: "30px auto",
          padding: "30px",
          background: "rgba(255, 255, 255, 0.85)",
          border: "2px solid #90caf9",
          borderRadius: "15px",
          boxShadow: "0 10px 20px rgba(0,0,0,0.3)",
          fontFamily: "Arial, sans-serif",
        }}
      >
        {/* Tank ID */}
        <label style={{ color: "#1e88e5", fontWeight: "bold" }}>Tank ID:</label>
        <input
          type="text"
          name="tankId"
          value={form.tankId}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        {/* Current Level */}
        <label style={{ color: "#1e88e5", fontWeight: "bold" }}>Current Level (L):</label>
        <input
          type="number"
          name="currentLevel"
          value={form.currentLevel}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        {/* Max Capacity */}
        <label style={{ color: "#1e88e5", fontWeight: "bold" }}>Max Capacity (L):</label>
        <input
          type="number"
          name="maxCapacity"
          value={form.maxCapacity}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        {/* Location */}
        <label style={{ color: "#1e88e5", fontWeight: "bold" }}>Location:</label>
        <input
          type="text"
          name="location"
          value={form.location}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        {/* Submit */}
        <button type="submit" style={buttonStyle}>
          ➕ Add Water Level
        </button>
      </form>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "10px",
  margin: "10px 0 20px",
  borderRadius: "8px",
  border: "1px solid #ccc",
};

const buttonStyle = {
  background: "linear-gradient(to right, #42a5f5, #ab47bc)",
  color: "white",
  border: "none",
  padding: "12px 20px",
  borderRadius: "10px",
  fontSize: "16px",
  cursor: "pointer",
  transition: "0.3s ease",
};

export default AddWater;
