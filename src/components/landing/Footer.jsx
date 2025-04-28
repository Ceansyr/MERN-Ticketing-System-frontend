import React from "react";

function Footer() {
  return (
    <footer className="page-footer">
      <div className="footer-container">
        <div className="footer-logo-section">
        <div className="landing-logo"></div>
        </div>
        
        <div className="footer-links-grid">
          <div className="footer-column">
            <h3>Product</h3>
            <ul>
              <li><a href="#">Universal checkout</a></li>
              <li><a href="#">Payment workflows</a></li>
              <li><a href="#">Observability</a></li>
              <li><a href="#">UpliftAI</a></li>
              <li><a href="#">Apps & integrations</a></li>
            </ul>
          </div>
          
          <div className="footer-column">
            <h3>Why Primer</h3>
            <ul>
              <li><a href="#">Expand to new markets</a></li>
              <li><a href="#">Boost payment success</a></li>
              <li><a href="#">Improve conversion rates</a></li>
              <li><a href="#">Reduce payments fraud</a></li>
              <li><a href="#">Recover revenue</a></li>
            </ul>
          </div>
          
          <div className="footer-column">
            <h3>Developers</h3>
            <ul>
              <li><a href="#">Primer Docs</a></li>
              <li><a href="#">API Reference</a></li>
              <li><a href="#">Payment methods guide</a></li>
              <li><a href="#">Service status</a></li>
              <li><a href="#">Community</a></li>
            </ul>
          </div>
          
          <div className="footer-column">
            <h3>Resources</h3>
            <ul>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Success stories</a></li>
              <li><a href="#">News room</a></li>
              <li><a href="#">Terms</a></li>
              <li><a href="#">Privacy</a></li>
            </ul>
          </div>
          
          <div className="footer-column">
            <h3>Company</h3>
            <ul>
              <li><a href="#">Careers</a></li>
            </ul>
          </div>
        </div>
        
        <div className="footer-social-icons">
        </div>
      </div>
    </footer>
  );
}

export default Footer;