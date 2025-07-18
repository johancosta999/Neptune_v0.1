import React from "react";
import { useParams } from "react-router-dom";
//import TankNav from "../Nav/nav"; // New navbar for inside tank modules
import Nav from "../Compoents/Nav/Nav"

function TankDashboard() {
  const { tankId } = useParams();

  // For now, use dummy data or pull from backend later
  const tankDetails = {
    user: "John Doe",
    location: "Colombo",
    capacity: "2000L",
    paymentStatus: "Paid",
    avgUsage: "300L/day",
    avgQuality: "Safe",
    currentBill: "Rs. 1,200.00",
  };

  return (
    <div>
      <Nav />
      <h2>Dashboard - {tankId}</h2>
      <ul>
        <li><b>User:</b> {tankDetails.user}</li>
        <li><b>Location:</b> {tankDetails.location}</li>
        <li><b>Capacity:</b> {tankDetails.capacity}</li>
        <li><b>Payment Status:</b> {tankDetails.paymentStatus}</li>
        <li><b>Average Usage:</b> {tankDetails.avgUsage}</li>
        <li><b>Average Quality:</b> {tankDetails.avgQuality}</li>
        <li><b>Current Bill:</b> {tankDetails.currentBill}</li>
      </ul>
    </div>
  );
}

export default TankDashboard;