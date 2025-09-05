import React from 'react';
import { Box, Typography, Paper, Grid, Link, Chip, Tooltip } from '@mui/material';
import Header from './Header';
import '../css/SecurityResources.css';

const resources = {
  learning: [
    {
      title: 'NIST Cybersecurity Framework',
      url: 'https://www.nist.gov/cyberframework',
      description: 'Official framework for improving critical infrastructure cybersecurity.',
      tags: ['Framework', 'Best Practices', 'Official']
    },
    {
      title: 'OWASP Top 10',
      url: 'https://owasp.org/www-project-top-ten/',
      description: 'Top 10 most critical web application security risks.',
      tags: ['Web Security', 'Vulnerabilities', 'Standards']
    },
    {
      title: 'Cybrary',
      url: 'https://www.cybrary.it/',
      description: 'Free online cybersecurity training and certification preparation.',
      tags: ['Training', 'Certification', 'Free']
    },
    {
      title: 'HackerOne',
      url: 'https://www.hackerone.com/hacktivity',
      description: 'Learn from real-world vulnerability reports and bug bounties.',
      tags: ['Bug Bounty', 'Real Cases', 'Learning']
    }
  ],
  tools: [
    {
      title: 'Wireshark',
      url: 'https://www.wireshark.org/',
      description: 'Network protocol analyzer for network troubleshooting and analysis.',
      tags: ['Network Analysis', 'Free', 'Essential']
    },
    {
      title: 'Nmap',
      url: 'https://nmap.org/',
      description: 'Network discovery and security auditing tool.',
      tags: ['Network Scanner', 'Security Audit', 'Free']
    },
    {
      title: 'Metasploit',
      url: 'https://www.metasploit.com/',
      description: 'Penetration testing framework for security testing.',
      tags: ['Penetration Testing', 'Framework', 'Advanced']
    },
    {
      title: 'Snort',
      url: 'https://www.snort.org/',
      description: 'Open-source intrusion detection system.',
      tags: ['IDS', 'Network Security', 'Free']
    }
  ],
  news: [
    {
      title: 'Krebs on Security',
      url: 'https://krebsonsecurity.com/',
      description: 'In-depth security news and investigation.',
      tags: ['News', 'Analysis', 'Investigations']
    },
    {
      title: 'The Hacker News',
      url: 'https://thehackernews.com/',
      description: 'Latest cybersecurity news and analysis.',
      tags: ['News', 'Updates', 'Daily']
    },
    {
      title: 'Threatpost',
      url: 'https://threatpost.com/',
      description: 'Independent news site focused on IT and business security.',
      tags: ['News', 'Enterprise', 'Analysis']
    }
  ],
  communities: [
    {
      title: 'r/netsec',
      url: 'https://www.reddit.com/r/netsec/',
      description: 'Technical information security content and discussion.',
      tags: ['Community', 'Discussion', 'Technical']
    },
    {
      title: 'Security StackExchange',
      url: 'https://security.stackexchange.com/',
      description: 'Q&A for information security professionals.',
      tags: ['Q&A', 'Community', 'Professional']
    },
    {
      title: 'SANS Internet Storm Center',
      url: 'https://isc.sans.edu/',
      description: 'Cooperative cyber threat monitoring and alert system.',
      tags: ['Threat Intel', 'Community', 'Analysis']
    }
  ]
};

const ResourceCard = ({ resource }) => (
  <Paper elevation={2} className="resource-card">
    <Typography variant="h6" className="resource-title">
      <Link href={resource.url} target="_blank" rel="noopener noreferrer">
        {resource.title}
      </Link>
    </Typography>
    <Typography variant="body2" className="resource-description">
      {resource.description}
    </Typography>
    <Box className="resource-tags">
      {resource.tags.map((tag, index) => (
        <Tooltip key={index} title={`Filter by ${tag}`}>
          <Chip
            label={tag}
            size="small"
            className="resource-tag"
            onClick={() => {/* TODO: Implement filtering */}}
          />
        </Tooltip>
      ))}
    </Box>
  </Paper>
);

const SecurityResources = () => {
  return (
    <>
      <Header />
      <Box className="resources-container">
        <Typography variant="h4" className="resources-title">
          Security Resources
        </Typography>
        
        <Box className="resources-section">
          <Typography variant="h5" className="section-title">
            Learning Resources
          </Typography>
          <Grid container spacing={2}>
            {resources.learning.map((resource, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <ResourceCard resource={resource} />
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box className="resources-section">
          <Typography variant="h5" className="section-title">
            Security Tools
          </Typography>
          <Grid container spacing={2}>
            {resources.tools.map((resource, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <ResourceCard resource={resource} />
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box className="resources-section">
          <Typography variant="h5" className="section-title">
            Security News
          </Typography>
          <Grid container spacing={2}>
            {resources.news.map((resource, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <ResourceCard resource={resource} />
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box className="resources-section">
          <Typography variant="h5" className="section-title">
            Security Communities
          </Typography>
          <Grid container spacing={2}>
            {resources.communities.map((resource, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <ResourceCard resource={resource} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default SecurityResources; 