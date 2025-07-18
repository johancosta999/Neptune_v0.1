import React from "react";
import { Routes, Route } from "react-router-dom";

import TankDisplay from "../src/Compoents/Home/TankDisplay";
import AddWaterLevel from "../src/Compoents/WaterLevel/AddWater";
import EditWaterlevel from "../src/Compoents/WaterLevel/EditWaterlevel";
import Waterlevellist from "../src/Compoents/WaterLevel/Waterlevellist";
import TankDashboard from "./Pages/Dashboard";


function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<TankDisplay />} />
         <Route path="/water-level/:id" element={<AddWaterLevel />} />
         <Route path="/water-level/edit/:id" element={<EditWaterlevel />} />
         <Route path="/tank/:tankId/tank-level" element={<Waterlevellist/>} />
         <Route path="/tank/:tankId/dashboard" element={<TankDashboard />} />
      </Routes>

    </div>
  );
}

export default App;
