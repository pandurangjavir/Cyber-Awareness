import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Features.css';

const features = [
  {
    icon: (
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="learning-icon">
        <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z" fill="currentColor"/>
      </svg>
    ),
    title: 'Interactive Tutorials',
    description: 'Learn cybersecurity concepts with step-by-step guided tutorials designed for all skill levels.',
    link: '/tutorials'
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="learning-icon">
        <path d="M21 6H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 10H3V8h18v8zM6 15h2v-2h2v-2H8V9H6v2H4v2h2z" fill="currentColor"/>
        <circle cx="14.5" cy="13.5" r="1.5" fill="currentColor"/>
        <circle cx="18.5" cy="10.5" r="1.5" fill="currentColor"/>
      </svg>
    ),
    title: 'Educational Games',
    description: 'Reinforce your knowledge through engaging games that simulate real-world security scenarios.',
    link: '/games'
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="learning-icon">
        <path d="M16 4H4c-1.1 0-2 .9-2 2v12.01c0 1.1.9 1.99 2 1.99h16c1.1 0 2-.9 2-2v-8l-6-6zm-1 9h-4v4h-2v-4H5v-2h4V7h2v4h4v2zm1-5.5V9h3.5L16 7.5z" fill="currentColor"/>
      </svg>
    ),
    title: 'Knowledge Quizzes',
    description: 'Test your understanding with comprehensive quizzes covering various cybersecurity topics.',
    link: '/quizzes'
  }
];

const Features = () => {
  return (
    <section className="learning-section">
      <h2 className="section-heading">Our Learning Features</h2>
      <p className="section-subheading">Discover the tools that make learning cybersecurity engaging and effective</p>
      <div className="learning-options">
        {features.map((feature, idx) => (
          <div className="learning-card" key={idx}>
            <div>{feature.icon}</div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
            <Link to={feature.link} className="card-button">Learn More</Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features; 