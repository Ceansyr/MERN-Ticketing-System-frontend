import React from "react";

function DummyPricingSection() {
  return (
    <section className="pricing-section">
      <div className="pricing-header">
        <h2 className="pricing-title">We have plans for everyone!</h2>
        <p className="pricing-subtitle">We started with a strong foundation, then simply built all of the sales and marketing tools ALL businesses need under one platform.</p>
      </div>
      
      <div className="pricing-plans">
        <div className="pricing-plan">
          <h3 className="plan-title">STARTER</h3>
          <p className="plan-description">Best for local businesses needing to improve their online reputation.</p>
          <div className="plan-price">
            <span className="price">$199</span>
            <span className="billing-cycle">/monthly</span>
          </div>
          
          <div className="plan-features">
            <h4>What's included</h4>
            <ul>
              <li>Unlimited Users</li>
              <li>GMB Messaging</li>
              <li>Reputation Management</li>
              <li>GMB Call Tracking</li>
              <li>24/7 Award Winning Support</li>
            </ul>
          </div>
          
          <div className="demo-label">Demo Mode</div>
        </div>
        
        <div className="pricing-plan">
          <h3 className="plan-title">GROW</h3>
          <p className="plan-description">Best for all businesses that want to take full control of their marketing automation and track their leads, click to close.</p>
          <div className="plan-price">
            <span className="price">$399</span>
            <span className="billing-cycle">/monthly</span>
          </div>
          
          <div className="plan-features">
            <h4>What's included</h4>
            <ul>
              <li>Pipeline Management</li>
              <li>Marketing Automation Campaigns</li>
              <li>Live Call Transfer</li>
              <li>GMB Messaging</li>
              <li>Embed-able Form Builder</li>
              <li>Reputation Management</li>
              <li>24/7 Award Winning Support</li>
            </ul>
          </div>
          
          <div className="demo-label">Demo Mode</div>
        </div>
      </div>
    </section>
  );
}

export default DummyPricingSection;