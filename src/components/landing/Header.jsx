import React from "react";
import navigate from "../../utils/navigation";

function Header() {
  return (
    <header className="landing-header">
      <div className="landing-logo">
      </div>
      <div className="landing-nav-container">
        <a href="/login" className="login-link">Login</a>
        <button 
          className="landing-btn-primary" 
          onClick={() => navigate("/signup")}
        >
          Sign Up
        </button>
      </div>
    </header>
  );
}

export default Header;