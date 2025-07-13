import React from "react";
import { Routes, Route  } from "react-router-dom";
import Home from "./components/Home/home";
import "./App.css";
import UserDetails from "./components/UserDetails/Users";
import AddUser from "./components/AddUser/AddUser";
import UpdateUser from "./components/UpdateUser/UpdateUser";
import Nav from "./components/NavbarTemp/NavbarTemp";


function App() {
  return (
    <>
      <Nav />
      
        <React.Fragment>
          <Routes>
        <Route path="/" element ={<Home/>}/>
        <Route path="/mainhome" element={<Home />} />
        <Route path="/UserDetails" element={<UserDetails/>} />
         <Route path="/AddUser" element={<AddUser />} />
         <Route path="/UserDetails/:_id" element={<UpdateUser/>} />
          </Routes>
        </React.Fragment>
        
 
     
    </>
  );
}

export default App;
