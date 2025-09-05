import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/SecurityChallenges.css';

const challenges = [
  {
    title: "URL Security Scanner",
    description: "Scan and analyze URLs for potential security threats and vulnerabilities.",
    difficulty: "Tool",
    duration: "Instant",
    points: 0,
    skills: ["URL Analysis", "Threat Detection", "Security Assessment"],
    scenario: "Quickly check if a URL is safe before you visit it. Detect phishing, malware, and other risks.",
    imageUrl: "https://images.unsplash.com/photo-1510511459019-5dda7724fd87?auto=format&fit=crop&w=600&q=80",
    route: "/url-scanner",
    isUrlScanner: true
  },
  {
    title: "Security Quiz Challenge",
    description: "Test your cybersecurity knowledge with questions ranging from basic to advanced topics.",
    difficulty: "All Levels",
    duration: "15-30 mins",
    points: 300,
    skills: ["Security Knowledge", "Theory", "Best Practices"],
    scenario: "Challenge yourself with security questions across three difficulty levels: Easy, Medium, and Hard.",
    imageUrl: "https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=600&q=80",
    route: "/quiz"
  },
  {
    title: "Password Strength Challenge",
    description: "Learn how to create and recognize strong passwords by testing your skills in building secure passwords and understanding what makes them strong.",
    difficulty: "Beginner",
    duration: "15 mins",
    points: 100,
    skills: ["Password Security", "Authentication"],
    scenario: "You're challenged to create the strongest passwords possible and learn tips to improve password security.",
    imageUrl: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=600&q=80",
    route: "/games/password-strength"
  },
  {
    title: "Phishing Detective",
    description: "Train your eye to spot phishing attempts in emails, websites, and messages.",
    difficulty: "Intermediate",
    duration: "20 mins",
    points: 150,
    skills: ["Email Security", "Social Engineering"],
    scenario: "As a security analyst, identify and report sophisticated phishing attempts.",
    imageUrl: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80",
    route: "/games/phishing-detective"
  },
  {
    title: "Network Guardian",
    description: "Protect a virtual network from various cyber attacks using security tools and best practices.",
    difficulty: "Advanced",
    duration: "30 mins",
    points: 200,
    skills: ["Network Security", "Firewall Configuration"],
    scenario: "Secure your organization's network infrastructure against multiple attack vectors.",
    imageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80",
    route: "/games/network-security"
  },
  {
    title: "Social Engineering Escape",
    description: "Navigate through common social engineering scenarios and learn to protect sensitive information.",
    difficulty: "Beginner",
    duration: "25 mins",
    points: 125,
    skills: ["Social Engineering", "Information Security"],
    scenario: "Avoid social engineering traps while maintaining business operations.",
    imageUrl: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
    route: "/games/social-engineering-escape"
  },
  {
    title: "Malware Analysis Lab",
    description: "Learn to identify and analyze different types of malware in a safe environment.",
    difficulty: "Advanced",
    duration: "45 mins",
    points: 250,
    skills: ["Malware Analysis", "Threat Detection"],
    scenario: "Analyze suspicious files and determine their threat level and behavior.",
    imageUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80",
    route: "/games/malware-analysis-lab"
  }
];

const badgeColors = {
  "All Levels": "#888",
  "Beginner": "#43d167",
  "Intermediate": "#ff9800",
  "Advanced": "#d32f2f",
  "Tool": "#1976d2"
};

const SecurityChallenges = () => {
  const navigate = useNavigate();

  const handleStartChallenge = (route) => {
    if (route) {
      navigate(route);
    }
  };

  return (
    <div className="challenges-section">
      <div className="challenges-header">
        <h1>Security Challenges</h1>
        <p className="challenges-subtitle">
          Test your cybersecurity skills with interactive challenges. Complete missions, earn points, 
          and learn essential security concepts through hands-on experience.
        </p>
      </div>
      <div className="challenges-grid">
        {challenges.map((challenge, index) => (
          <div
            key={index}
            className="challenge-card"
            onClick={() => handleStartChallenge(challenge.route)}
            style={{ cursor: "pointer" }}
          >
            <div className="challenge-image" style={{ backgroundImage: `url(${challenge.imageUrl})` }}></div>
            <div className="difficulty-badge" style={{background: badgeColors[challenge.difficulty] || '#888', color: challenge.difficulty === 'Advanced' ? '#fff' : '#fff'}}>
              {challenge.difficulty}
            </div>
            <div className="challenge-content">
              <h3 className="challenge-title">{challenge.title}</h3>
              <p className="challenge-description">{challenge.description}</p>
              <div style={{fontSize: '0.95em', color: '#444', marginBottom: 4}}>
                Duration: {challenge.duration} &nbsp; Points: {challenge.points}
              </div>
              <div style={{fontSize: '0.93em', color: '#555', marginBottom: 4}}>
                {challenge.skills && challenge.skills.map((skill, i) => (
                  <span key={i} style={{marginRight: 8}}>{skill}</span>
                ))}
              </div>
              <div style={{background: '#f5f6fa', borderRadius: 6, padding: '8px 10px', fontSize: '0.97em', color: '#222', marginBottom: 8}}>
                <b>Scenario:</b><br/>{challenge.scenario}
              </div>
              <button 
                className="start-challenge-btn"
                style={{background: challenge.isUrlScanner ? '#1976d2' : '#111', color: '#fff'}}
                tabIndex={-1}
              >
                {challenge.isUrlScanner ? 'Go to URL Scanner' : 'Start Challenge'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SecurityChallenges; 