import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Dashboard from './pages/Dashboard';
import "./styles/App.css";
import ContactCenter from './pages/ContactCenter';


function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<Signup />}/>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/contact-center" element={<ContactCenter />} />
        </Routes>
      </Router>
  );
}

export default App;
