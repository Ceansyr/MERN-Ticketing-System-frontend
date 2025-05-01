import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Dashboard from './pages/Dashboard';
import "./styles/App.css";
import ContactCenter from './pages/ContactCenter';
import ChatbotSettings from './pages/ChatbotSettings';
import Team from './pages/Team';
import Settings from './pages/Settings';
import Analytics from './pages/Analytics';
import DummyPage from "./pages/DummyPage";

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<Signup />}/>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/contact-center" element={<ContactCenter />} />
          <Route path="/chatbot" element={<ChatbotSettings />} />
          <Route path="/teams" element={<Team />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/dummy" element={<DummyPage />} />
        </Routes>
      </Router>
  );
}

export default App;
