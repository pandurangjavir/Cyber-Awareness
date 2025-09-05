import React from 'react';
import '../css/Tutorials.css';

const tutorials = [
  {
    title: 'Cybersecurity Basics for Beginners',
    description: 'A comprehensive introduction to cybersecurity concepts and best practices for beginners.',
    youtube: 'https://www.youtube.com/embed/1i_X7bSg6Jw',
    links: [
      { label: 'StaySafeOnline', url: 'https://staysafeonline.org/' },
      { label: 'Cybrary', url: 'https://www.cybrary.it/' }
    ]
  },
  {
    title: 'How to Create Strong Passwords',
    description: 'Learn how to create and manage strong passwords to protect your online accounts.',
    youtube: 'https://www.youtube.com/embed/3NjQ9b3pgIg',
    links: [
      { label: 'Have I Been Pwned', url: 'https://haveibeenpwned.com/' },
      { label: 'Password Guidance (NIST)', url: 'https://pages.nist.gov/800-63-3/sp800-63b.html' }
    ]
  },
  {
    title: 'Phishing Attacks Explained',
    description: 'Understand what phishing is, how to spot phishing emails, and how to stay safe.',
    youtube: 'https://www.youtube.com/embed/UzvPP6_LRHc',
    links: [
      { label: 'Google Phishing Quiz', url: 'https://phishingquiz.withgoogle.com/' },
      { label: 'Anti-Phishing Working Group', url: 'https://apwg.org/' }
    ]
  },
  {
    title: 'Safe Browsing Tips',
    description: 'Tips and tricks for browsing the internet safely and protecting your privacy.',
    youtube: 'https://www.youtube.com/embed/2tQGfP2p40g',
    links: [
      { label: 'Electronic Frontier Foundation', url: 'https://www.eff.org/' },
      { label: 'StaySafeOnline', url: 'https://staysafeonline.org/' }
    ]
  }
];

const Tutorials = () => {
  return (
    <section className="tutorials-section">
      <h2 className="tutorials-heading">Interactive Cybersecurity Tutorials</h2>
      <div className="tutorials-grid">
        {tutorials.map((tut, idx) => (
          <div className="tutorial-card" key={idx}>
            <div className="tutorial-video-wrap">
              <iframe
                src={tut.youtube}
                title={tut.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <h3 className="tutorial-title">{tut.title}</h3>
            <p className="tutorial-desc">{tut.description}</p>
            <div className="tutorial-links">
              <span className="tutorial-links-label">Recommended Links:</span>
              <ul>
                {tut.links.map((link, i) => (
                  <li key={i}>
                    <a href={link.url} target="_blank" rel="noopener noreferrer">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Tutorials; 