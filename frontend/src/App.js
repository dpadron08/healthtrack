//import logo from './logo.svg';
//import './App.css';
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router";
import { Link } from "react-router-dom";
import SymptomsList from "./pages/symptoms-list";
import Login from "./pages/login";

function App() {
  return (
    <div className="App">
      <div className="container">
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/symptoms" className="navbar-brand">
          HealthTrack
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to="/symptoms" className="nav-link">
              Symptoms
            </Link>
          </li>
          <li className="nav-item" >
            <Link to="/login" className="nav-link">
              Login/Logout
            </Link>
          </li>
        </div>
      </nav>
        <Routes>
          <Route path="/symptoms" element={<SymptomsList />}/> 
          <Route path="/login" element={<Login/>}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
