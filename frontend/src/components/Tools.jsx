import React from 'react';
import '../css/Tools.css';

const tools = [
  {
    name: 'Wireshark',
    description: 'A powerful network protocol analyzer for monitoring and analyzing network traffic.',
    whatIsIt: 'Wireshark is the world\'s foremost network protocol analyzer, allowing you to see what\'s happening on your network at a microscopic level.',
    whyUseIt: [
      'Monitor network traffic in real-time',
      'Detect suspicious network activities',
      'Troubleshoot network problems',
      'Analyze security issues'
    ],
    howToUse: [
      'Download and install from the official website',
      'Select a network interface to capture',
      'Use display filters to focus on specific traffic',
      'Analyze packet data for security threats'
    ],
    url: 'https://www.wireshark.org/'
  },
  {
    name: 'VirusTotal',
    description: 'Analyze suspicious files and URLs to detect malware and automatically share them with the security community.',
    whatIsIt: 'A free service that analyzes files and URLs for viruses, worms, trojans, and other kinds of malicious content.',
    whyUseIt: [
      'Check suspicious files before downloading',
      'Verify website safety',
      'Access multiple antivirus scan results',
      'Share threat intelligence with the community'
    ],
    howToUse: [
      'Visit the VirusTotal website',
      'Upload files or paste URLs',
      'Review analysis results from multiple engines',
      'Check detailed reports for potential threats'
    ],
    url: 'https://www.virustotal.com/'
  },
  {
    name: 'Shodan',
    description: 'A search engine for Internet-connected devices, useful for discovering exposed systems and vulnerabilities.',
    whatIsIt: 'Shodan is a search engine that lets you find specific types of internet-connected devices and systems.',
    whyUseIt: [
      'Discover exposed devices on your network',
      'Identify potential security vulnerabilities',
      'Monitor your organization\'s attack surface',
      'Research cyber threats and trends'
    ],
    howToUse: [
      'Create a Shodan account',
      'Use specific search filters (e.g., port, country, service)',
      'Monitor your network for exposed devices',
      'Set up alerts for new vulnerabilities'
    ],
    url: 'https://www.shodan.io/'
  },
  {
    name: 'Hybrid Analysis',
    description: 'A free malware analysis service for the community that detects and analyzes unknown threats.',
    whatIsIt: 'A free automated malware analysis service that helps detect and analyze potential security threats.',
    whyUseIt: [
      'Analyze suspicious files safely',
      'Get detailed behavioral reports',
      'Access threat intelligence data',
      'Collaborate with security researchers'
    ],
    howToUse: [
      'Register for a free account',
      'Submit files for analysis',
      'Review comprehensive reports',
      'Share findings with the community'
    ],
    url: 'https://www.hybrid-analysis.com/'
  },
  {
    name: 'AbuseIPDB',
    description: 'A project dedicated to helping combat the spread of hackers, spammers, and abusive activity on the internet.',
    whatIsIt: 'A database of reported malicious IP addresses and a platform for reporting abusive behavior.',
    whyUseIt: [
      'Check IP addresses for reported abuse',
      'Report malicious activity',
      'Protect your network from known threats',
      'Contribute to internet safety'
    ],
    howToUse: [
      'Create an account',
      'Search IP addresses',
      'Report abusive IPs',
      'Use the API for automated checking'
    ],
    url: 'https://www.abuseipdb.com/'
  },
  {
    name: 'Cuckoo Sandbox',
    description: 'An open-source automated malware analysis system.',
    whatIsIt: 'A sandbox environment that safely analyzes files by running them in an isolated environment and monitoring their behavior.',
    whyUseIt: [
      'Safely analyze suspicious files',
      'Get detailed behavioral analysis',
      'Automate malware analysis',
      'Support incident response'
    ],
    howToUse: [
      'Set up a dedicated analysis environment',
      'Submit samples for analysis',
      'Review behavioral reports',
      'Integrate with existing security tools'
    ],
    url: 'https://cuckoosandbox.org/'
  },
  {
    name: 'Have I Been Pwned',
    description: 'Check if your email or phone number has been part of a data breach.',
    whatIsIt: 'A free service that allows you to check if your personal data has been compromised in known data breaches.',
    whyUseIt: [
      'Monitor your digital footprint',
      'Check for compromised accounts',
      'Get notified of new breaches',
      'Verify password security'
    ],
    howToUse: [
      'Visit the website',
      'Enter email or phone number',
      'Review breach history',
      'Set up breach notifications'
    ],
    url: 'https://haveibeenpwned.com/'
  },
  {
    name: 'MalwareBazaar',
    description: 'A project from abuse.ch to share malware samples with the security community.',
    whatIsIt: 'A repository of malware samples that researchers can use to study and analyze threats.',
    whyUseIt: [
      'Access malware samples for research',
      'Stay updated on new threats',
      'Contribute to threat intelligence',
      'Improve malware detection'
    ],
    howToUse: [
      'Register for researcher access',
      'Search for specific malware',
      'Download samples (researchers only)',
      'Share new malware samples'
    ],
    url: 'https://bazaar.abuse.ch/'
  }
];

const Tools = () => {
  return (
    <section className="tools-section">
      <h2 className="tools-heading">Cyber Crime Detection Tools</h2>
      <div className="tools-grid">
        {tools.map((tool, idx) => (
          <div className="tool-card" key={idx}>
            <h3 className="tool-title">{tool.name}</h3>
            <div className="tool-content">
              <h4 className="tool-subtitle">What is it?</h4>
              <p className="tool-desc">{tool.whatIsIt}</p>
              
              <h4 className="tool-subtitle">Why use it?</h4>
              <ul className="tool-list">
                {tool.whyUseIt.map((reason, index) => (
                  <li key={index}>{reason}</li>
                ))}
              </ul>

              <h4 className="tool-subtitle">How to use?</h4>
              <ul className="tool-list">
                {tool.howToUse.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ul>
            </div>
            <a href={tool.url} target="_blank" rel="noopener noreferrer" className="tool-link">
              Visit Tool
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Tools; 