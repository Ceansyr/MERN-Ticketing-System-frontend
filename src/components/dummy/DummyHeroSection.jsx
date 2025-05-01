import React from "react";

function DummyHeroSection() {
  return (
    <section className="landing-hero-section">
      <div className="landing-hero-content">
        <div className="landing-hero-text">
          <h1 className="landing-hero-title">Grow Your Business Faster with Hubly CRM</h1>
          <p className="landing-hero-tagline">Manage leads, automate workflows, and close deals effortlessly—all in one powerful platform.</p>
          <div className="landing-hero-buttons">
            <button className="landing-btn-secondary">
              <span className="video-icon">▶</span> Watch Video
            </button>
          </div>
        </div>
        
        <div className="landing-hero-image">
          <div className="dashboard-preview">
            <div className="notification-bubble profile-notification" aria-label="Jerry Cabroni joined Brainstorming"></div>
            <div className="dashboard-main-image main-dashboard-img" aria-label="Dashboard Preview"></div>
            <div className="stats-chart-container stats-graph-img" aria-label="Sales Statistics"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DummyHeroSection;