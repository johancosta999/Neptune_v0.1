import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../Components/tanks.css"; // 👈 CSS file for the liquid glass effect

function Tanks() {
  const [records, setRecords] = useState([]);

  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/sellers");
      setRecords(res.data.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container">
      <Link to={"/"}>
        <button className="select-btn">Add Tank</button>
      </Link>

      <h1 className="title">Available Tanks</h1>
      <div className="card-grid">
        {records.length > 0 ? (
          records.map((tank, i) => (
            <div className="glass-card" key={i}>
              <h2>{tank.tankId}</h2>
              <p>
                <b>Customer Name:</b> {tank.customerName}
              </p>
              <p>
                <b>Address:</b> {tank.address}
              </p>
              <p>
                <b>Email:</b> {tank.customerEmail}
              </p>
              <p>
                <b>Sell Date:</b> {tank.sellDate}
              </p>
              <p>
                <b>NIC:</b> {tank.nicNumber}
              </p>
              <p>
                <b>Contact:</b> {tank.contactNumber}
              </p>
              <p>
                <b>Price:</b> Rs. {tank.price}
              </p>
              <p>
                <b>Warranty:</b> {tank.warranty} years
              </p>
              <p>
                <b>Description:</b> {tank.description}
              </p>
              <p>
                <b>Invoice:</b> {tank.invoiceNumber}
              </p>

              <Link to={`/tank/${tank.tankId}/dashboard`}>
                <button className="select-btn">View Details</button>
              </Link>
            </div>
          ))
        ) : (
          <p>No tanks found.</p>
        )}
      </div>
    </div>
  );
}

export default Tanks;
