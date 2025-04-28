import React from "react";

function HeroSection() {
  return (
    <section className="landing-hero-section">
      <div className="landing-hero-content">
        <div className="landing-hero-text">
          <h1 className="landing-hero-title">Grow Your Business Faster with Hubly CRM</h1>
          <p className="landing-hero-tagline">Manage leads, automate workflows, and close deals effortlessly—all in one powerful platform.</p>
          <div className="landing-hero-buttons">
            <button 
              className="landing-btn-primary" 
              onClick={() => window.location.href = "/signup"}
            >
              Get started
            </button>
            <button className="landing-btn-secondary">
              <span className="video-icon">▶</span> Watch Video
            </button>
          </div>
        </div>
        
        <div className="landing-hero-image">
          <div className="dashboard-preview">
            {/* Notification bubble - Profile tag with name and time */}
            <div className="notification-bubble profile-notification" aria-label="Jerry Cabroni joined Brainstorming"></div>
            
            {/* Main dashboard image with calendar */}
            <div className="dashboard-main-image main-dashboard-img" aria-label="Dashboard Preview"></div>
            
            {/* Stats chart/graph */}
            <div className="stats-chart-container stats-graph-img" aria-label="Sales Statistics"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;