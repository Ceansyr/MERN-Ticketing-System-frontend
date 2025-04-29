import React from "react";

function FeatureSection() {
  return (
    <section className="feature-section">
      <div className="feature-header">
        <h2 className="feature-title">At its core, Hubly is a robust CRM solution.</h2>
        <p className="feature-description">
          Hubly helps businesses streamline customer interactions, track leads, and automate tasks—saving you time and maximizing revenue. Whether you're a startup or an enterprise, Hubly adapts to your needs, giving you the tools to scale efficiently.
        </p>
      </div>

      <div className="feature-body">
        <div className="feature-info">
          <h3 className="info-title">MULTIPLE PLATFORMS TOGETHER!</h3>
          <p className="info-description">
            Email communication is a breeze with our fully integrated, drag & drop email builder.
          </p>
          
          <div className="feature-steps">
            <div className="feature-step">
              <h4 className="step-title">CLOSE</h4>
              <p className="step-description">
                Capture leads using our landing pages, surveys, forms, calendars, inbound phone system & more!
              </p>
            </div>
            
            <div className="feature-step">
              <h4 className="step-title">NURTURE</h4>
              <p className="step-description">
                Capture leads using our landing pages, surveys, forms, calendars, inbound phone system & more!
              </p>
            </div>
          </div>
        </div>
        
        <div className="feature-image">
          <div className="funnel-container">
            <div className="funnel-logos-container">
              <div className="funnel-logos" aria-label="Platform logos"></div>
            </div>
            
            <div className="feature-funnel" aria-label="Sales funnel graphic">
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FeatureSection;