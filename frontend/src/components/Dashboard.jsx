import React from 'react';
import Header from './Header';
import Hero from './Hero';
import { Card, CardContent, Typography, Button, Box } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import SecurityIcon from '@mui/icons-material/Security';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import BuildIcon from '@mui/icons-material/Build';
import Tutorials from './Tutorials';
import '../css/Dashboard.css';
import { useNavigate } from 'react-router-dom';

const topics = [
    {
        icon: <SchoolIcon className="topic-icon" />,
        title: 'Interactive Learning',
        description: 'Engage with interactive modules and real-world scenarios to enhance your cybersecurity knowledge.',
        buttonText: 'Start Learning',
        link: '/tutorials'
    },
    {
        icon: <BuildIcon className="topic-icon" />,
        title: 'Security Tools',
        description: 'Learn to use essential security tools and technologies to protect your digital assets.',
        buttonText: 'Discover Tools',
        link: '/tools'
    },
    {
        icon: <SecurityIcon className="topic-icon" />,
        title: 'Security Resources',
        description: 'Access comprehensive resources and guides to stay updated with the latest security practices.',
        buttonText: 'Explore Resources',
        link: '/resources'
    },
    {
        icon: <EmojiEventsIcon className="topic-icon" />,
        title: 'Security Challenges',
        description: 'Test your skills with practical challenges and earn achievements as you progress.',
        buttonText: 'Take Challenges',
        link: '/challenges'
    }
];

const Dashboard = () => {
    const navigate = useNavigate();
    return (
        <>
            <Header />
            <Hero />
            <Box className="topics-section">
                <div className="section-subheading pro-section-subheading">
                    Unlock interactive, real-world cybersecurity learning experiences. Choose a path and start your journey today.
                </div>
                <Box className="topics-grid">
                    {topics.map((topic, index) => {
                        const isInteractive = topic.title === 'Interactive Learning';
                        return (
                            <Card
                                key={index}
                                className={`topic-card professional-card card-spaced${isInteractive ? ' interactive-card' : ''}`}
                                onClick={isInteractive ? () => navigate('/tutorials') : undefined}
                                sx={isInteractive ? { cursor: 'pointer', boxShadow: '0 8px 32px rgba(60,72,88,0.16)', transition: 'box-shadow 0.2s', '&:hover': { boxShadow: '0 16px 40px rgba(48,79,254,0.18)' } } : {}}
                            >
                                <div className="card-icon-wrap">{topic.icon}</div>
                                <Typography className="topic-title pro-title">{topic.title}</Typography>
                                <Typography className="topic-description pro-desc">{topic.description}</Typography>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    className="topic-button pro-btn"
                                    href={topic.link}
                                    onClick={e => { e.stopPropagation(); if (isInteractive) navigate('/tutorials'); }}
                                >
                                    {topic.buttonText}
                                </Button>
                            </Card>
                        );
                    })}
                </Box>
            </Box>
            <footer className="dashboard-footer">
                <Box className="footer-content">
                    <Box className="footer-grid">
                        <Box>
                            <Typography variant="h6" className="footer-section-title">
                                Cyber Awareness Training
                            </Typography>
                            <Typography variant="body2">
                                Empowering individuals and organizations with cybersecurity knowledge.
                            </Typography>
                        </Box>
                        <Box>
                            <Typography variant="h6" className="footer-section-title">
                                Quick Links
                            </Typography>
                            <Box className="footer-links">
                                <a href="/dashboard" className="footer-link">Home</a>
                                <a href="/about" className="footer-link">About</a>
                                <a href="/contact" className="footer-link">Contact</a>
                            </Box>
                        </Box>
                        <Box>
                            <Typography variant="h6" className="footer-section-title">
                                Contact Info
                            </Typography>
                            <Typography variant="body2">
                                Email: info@cyberawareness.com<br />
                                Phone: (123) 456-7890<br />
                                Address: 123 Security St, Cyber City
                            </Typography>
                        </Box>
                    </Box>
                    <Box className="footer-divider">
                        <Typography variant="body2" className="copyright">
                            © {new Date().getFullYear()} Cyber Awareness Training. All rights reserved.
                        </Typography>
                    </Box>
                </Box>
            </footer>
        </>
    );
};

export default Dashboard; 