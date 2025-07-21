import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Users from "./pages/Users";
import Staff from "./pages/Staff";
import BillingDashboard from "./pages/BillingDashboard";
import Header from "./Components/Header";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/staff" element={<Staff />} />
        <Route path="/billing" element={<BillingDashboard />} />
      </Routes>
    </>
  );
}

export default App;
