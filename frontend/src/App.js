import React from "react";
import { Routes, Route } from "react-router-dom";



import Dashboard from "../src/Compoents/Home/TankDisplay";
import AddWater from "../src/Compoents/WaterLevel/AddWater";
import EditWaterlevel from "../src/Compoents/WaterLevel/EditWaterlevel";
import Waterlevellist from "../src/Compoents/WaterLevel/Waterlevellist";



function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/tank-level" element={<AddWater />} />
         <Route path="/water-level/edit/:id" element={<EditWaterlevel />} />
         <Route path="/tank/:tankId/tank-level" element={<Waterlevellist/>} />
      </Routes>

    </div>
  );
}

export default App;
