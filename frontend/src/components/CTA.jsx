import React from 'react';
import { Link } from 'react-router-dom';
import '../css/CTA.css';

const CTA = () => {
  return (
    <section className="cta">
      <div className="container">
        <div className="cta-content">
          <h2>Ready to strengthen your digital security?</h2>
          <p>Start your journey today with our interactive learning tools designed for all skill levels</p>
          <div className="cta-buttons">
            <Link to="/get-started" className="btn btn-primary">Get Started</Link>
            <Link to="/learn-more" className="btn btn-secondary">Learn More</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA; 