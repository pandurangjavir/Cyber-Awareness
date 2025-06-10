import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Hero.css';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <h1 className="hero-title">
            Master Cybersecurity with CyberGuardian
          </h1>
          <p className="hero-subtitle">
            Develop essential security skills with our comprehensive training platform. 
            Learn, practice, and excel in cybersecurity.
          </p>
          <div className="hero-buttons">
            <Link to="/tutorials" className="btn btn-primary">Start Learning</Link>
            <Link to="/resources" className="btn btn-outline">Explore Resources</Link>
          </div>
        </div>
        <div className="hero-image">
          <img src="/hero-cyber.jpg" alt="Global cybersecurity network" />
        </div>
      </div>
    </section>
  );
};

export default Hero; 