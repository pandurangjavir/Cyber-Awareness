import React from 'react';
import '../css/Tutorials.css';

const tutorials = [
  {
    title: 'Complete Cyber Security Course',
    description: 'A comprehensive guide to cybersecurity fundamentals, covering essential concepts and best practices for digital safety.',
    youtube: 'https://www.youtube.com/embed/aRbKFCY4tjE',
    links: [
      { label: 'CERT-In Awareness', url: 'https://www.cert-in.org.in/' }
    ]
  },
  {
    title: 'Cyber Security for Beginners',
    description: 'Perfect for beginners, this tutorial covers the basics of cybersecurity, common threats, and how to protect yourself online.',
    youtube: 'https://www.youtube.com/embed/lt3dUTByggs',
    links: [
      { label: 'Cyber Swachhta Kendra', url: 'https://www.cyberswachhtakendra.gov.in/' }
    ]
  },
  {
    title: 'Network Security Essentials',
    description: 'Learn about network security, including firewalls, VPNs, and how to secure your network connections.',
    youtube: 'https://www.youtube.com/embed/aPKJvJIGpQM',
    links: [
      { label: 'Data Security Council of India', url: 'https://www.dsci.in/' }
    ]
  },
  {
    title: 'Understanding Phishing Attacks',
    description: 'Deep dive into phishing attacks, how to identify them, and practical steps to avoid falling victim to these scams.',
    youtube: 'https://www.youtube.com/embed/v9_chkR-7AI',
    links: [
      { label: 'MeitY Cyber Safety', url: 'https://www.cert-in.org.in/' }
    ]
  },
  {
    title: 'Social Engineering Defense',
    description: 'Learn about social engineering tactics and how to protect yourself from manipulation and social engineering attacks.',
    youtube: 'https://www.youtube.com/embed/Ieegg45Pojw',
    links: [
      { label: 'NPTEL Cybersecurity', url: 'https://nptel.ac.in/courses/106105196' }
    ]
  },
  {
    title: 'Cyber Crime Prevention Guide',
    description: 'Essential guide to understanding cyber crimes, their impact, and effective prevention strategies for individuals and organizations.',
    youtube: 'https://www.youtube.com/embed/CT5gmh9cxpk',
    links: [
      { label: 'Cyber Crime Portal', url: 'https://cybercrime.gov.in/' }
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