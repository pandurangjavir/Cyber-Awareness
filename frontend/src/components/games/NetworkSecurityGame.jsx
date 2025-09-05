import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Button, Fade, Grid, Alert, Card, CardContent, LinearProgress, IconButton, Tooltip } from '@mui/material';
import { Security, Lock, Wifi, Router, Shield, Warning, CheckCircle, Error } from '@mui/icons-material';
import '../../css/Games.css';

const glassStyle = {
  background: 'rgba(255,255,255,0.7)',
  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.18)',
  backdropFilter: 'blur(8px)',
  borderRadius: 16,
  border: '1px solid rgba(255,255,255,0.18)',
};

const NETWORK_NODES = [
  { id: 'firewall', name: 'Firewall', icon: <Shield />, status: 'active', securityLevel: 3 },
  { id: 'router', name: 'Router', icon: <Router />, status: 'active', securityLevel: 2 },
  { id: 'server', name: 'Server', icon: <Security />, status: 'active', securityLevel: 3 },
  { id: 'workstation', name: 'Workstation', icon: <Wifi />, status: 'active', securityLevel: 1 },
];

const THREATS = [
  {
    id: 'ddos',
    name: 'DDoS Attack',
    description: 'Multiple systems flooding the network with traffic',
    target: 'router',
    solution: 'Enable DDoS protection and rate limiting',
    difficulty: 3,
  },
  {
    id: 'malware',
    name: 'Malware Infection',
    description: 'Suspicious file detected on workstation',
    target: 'workstation',
    solution: 'Isolate device and run antivirus scan',
    difficulty: 2,
  },
  {
    id: 'bruteforce',
    name: 'Brute Force Attack',
    description: 'Multiple failed login attempts detected',
    target: 'server',
    solution: 'Implement account lockout and 2FA',
    difficulty: 2,
  },
  {
    id: 'portscan',
    name: 'Port Scanning',
    description: 'Unauthorized port scanning detected',
    target: 'firewall',
    solution: 'Update firewall rules and block suspicious IP',
    difficulty: 1,
  },
  {
    id: 'mitm',
    name: 'Man-in-the-Middle Attack',
    description: 'Intercepted traffic between devices detected',
    target: 'router',
    solution: 'Enable encrypted protocols and monitor ARP tables',
    difficulty: 3,
  },
  {
    id: 'sqlinjection',
    name: 'SQL Injection Attempt',
    description: 'Suspicious database queries detected on server',
    target: 'server',
    solution: 'Sanitize inputs and use parameterized queries',
    difficulty: 2,
  },
  {
    id: 'phishing',
    name: 'Phishing Email',
    description: 'User received a suspicious email with a malicious link',
    target: 'workstation',
    solution: 'Educate users and enable email filtering',
    difficulty: 1,
  },
  {
    id: 'zeroday',
    name: 'Zero-Day Exploit',
    description: 'Unknown vulnerability exploited on server',
    target: 'server',
    solution: 'Apply virtual patching and monitor for unusual activity',
    difficulty: 3,
  },
  {
    id: 'rogue',
    name: 'Rogue Device Detected',
    description: 'Unknown device connected to the network',
    target: 'firewall',
    solution: 'Segment network and block unauthorized devices',
    difficulty: 2,
  },
  {
    id: 'dnsspoof',
    name: 'DNS Spoofing',
    description: 'DNS responses are being tampered with',
    target: 'router',
    solution: 'Use DNSSEC and monitor DNS traffic',
    difficulty: 2,
  },
  {
    id: 'usb',
    name: 'Unauthorized USB Device',
    description: 'USB device plugged into workstation',
    target: 'workstation',
    solution: 'Restrict USB ports and scan for malware',
    difficulty: 1,
  },
  {
    id: 'firmware',
    name: 'Outdated Firmware',
    description: 'Router firmware is outdated and vulnerable',
    target: 'router',
    solution: 'Update firmware to the latest version',
    difficulty: 2,
  },
  {
    id: 'insider',
    name: 'Insider Threat',
    description: 'Suspicious activity from an internal user on server',
    target: 'server',
    solution: 'Monitor user activity and enforce least privilege',
    difficulty: 3,
  },
  {
    id: 'arp',
    name: 'ARP Spoofing',
    description: 'Conflicting ARP entries detected on firewall',
    target: 'firewall',
    solution: 'Enable dynamic ARP inspection',
    difficulty: 2,
  },
  {
    id: 'exfil',
    name: 'Data Exfiltration',
    description: 'Large amounts of data leaving the server',
    target: 'server',
    solution: 'Monitor outbound traffic and use DLP tools',
    difficulty: 3,
  },
  {
    id: 'wifispy',
    name: 'Wireless Eavesdropping',
    description: 'Unencrypted wireless traffic detected',
    target: 'router',
    solution: 'Enforce WPA3 encryption',
    difficulty: 2,
  },
  {
    id: 'spray',
    name: 'Password Spraying',
    description: 'Multiple accounts targeted with common passwords',
    target: 'server',
    solution: 'Enforce strong password policies and lockouts',
    difficulty: 2,
  },
  {
    id: 'rdp',
    name: 'Remote Desktop Attack',
    description: 'Unauthorized RDP connection attempt on workstation',
    target: 'workstation',
    solution: 'Restrict RDP access and use VPN',
    difficulty: 2,
  },
  {
    id: 'vpn',
    name: 'Suspicious VPN Connection',
    description: 'Unusual VPN connection detected on firewall',
    target: 'firewall',
    solution: 'Review VPN logs and enforce MFA',
    difficulty: 2,
  },
  {
    id: 'patch',
    name: 'Missing Security Patch',
    description: 'Critical patch missing on server',
    target: 'server',
    solution: 'Apply security patches promptly',
    difficulty: 1,
  },
  {
    id: 'botnet',
    name: 'Botnet Activity',
    description: 'Outbound traffic to known botnet C&C server',
    target: 'workstation',
    solution: 'Isolate device and scan for malware',
    difficulty: 3,
  },
  {
    id: 'emailleak',
    name: 'Email Data Leak',
    description: 'Sensitive company emails found on public forums',
    target: 'server',
    solution: 'Enforce email encryption and monitor data leaks',
    difficulty: 2,
  },
  {
    id: 'bruteforcewifi',
    name: 'WiFi Brute Force',
    description: 'Repeated failed attempts to access WiFi network',
    target: 'router',
    solution: 'Change WiFi password and enable WPA3',
    difficulty: 2,
  },
  {
    id: 'maliciousmacro',
    name: 'Malicious Macro',
    description: 'User opened a document with a suspicious macro',
    target: 'workstation',
    solution: 'Disable macros and scan for malware',
    difficulty: 1,
  },
  {
    id: 'openport',
    name: 'Open Port Detected',
    description: 'Unnecessary open port found on firewall',
    target: 'firewall',
    solution: 'Close unused ports and audit firewall rules',
    difficulty: 1,
  },
  {
    id: 'credentialreuse',
    name: 'Credential Reuse',
    description: 'Same password used across multiple accounts',
    target: 'server',
    solution: 'Enforce unique passwords and use password manager',
    difficulty: 2,
  },
  {
    id: 'guestwifi',
    name: 'Unsecured Guest WiFi',
    description: 'Guest WiFi network is not isolated from main network',
    target: 'router',
    solution: 'Segment guest network and restrict access',
    difficulty: 2,
  },
  {
    id: 'shadowit',
    name: 'Shadow IT',
    description: 'Unauthorized cloud service used by employees',
    target: 'workstation',
    solution: 'Educate users and monitor for unsanctioned apps',
    difficulty: 2,
  },
  {
    id: 'weakpassword',
    name: 'Weak Password Detected',
    description: 'User account with weak password found',
    target: 'server',
    solution: 'Enforce strong password policies',
    difficulty: 1,
  },
  {
    id: 'printerattack',
    name: 'Network Printer Attack',
    description: 'Unauthorized print jobs sent to network printer',
    target: 'workstation',
    solution: 'Restrict printer access and update firmware',
    difficulty: 1,
  },
  {
    id: 'vpnleak',
    name: 'VPN Data Leak',
    description: 'Sensitive data exposed due to VPN misconfiguration',
    target: 'firewall',
    solution: 'Audit VPN settings and enforce encryption',
    difficulty: 2,
  },
  {
    id: 'remotewipe',
    name: 'Remote Wipe Triggered',
    description: 'Remote wipe command sent to workstation',
    target: 'workstation',
    solution: 'Verify legitimacy and secure remote management',
    difficulty: 2,
  },
  {
    id: 'cloudmisconfig',
    name: 'Cloud Misconfiguration',
    description: 'Publicly accessible cloud storage detected',
    target: 'server',
    solution: 'Restrict access and audit cloud permissions',
    difficulty: 3,
  },
  {
    id: 'iotattack',
    name: 'IoT Device Attack',
    description: 'Unusual traffic from IoT device on network',
    target: 'router',
    solution: 'Segment IoT devices and update firmware',
    difficulty: 2,
  },
  {
    id: 'log4shell',
    name: 'Log4Shell Exploit',
    description: 'Critical vulnerability exploited on server',
    target: 'server',
    solution: 'Patch vulnerable libraries and monitor logs',
    difficulty: 3,
  },
  {
    id: 'socialengineering',
    name: 'Social Engineering',
    description: 'User tricked into revealing confidential info',
    target: 'workstation',
    solution: 'Conduct security awareness training',
    difficulty: 2,
  },
  {
    id: 'dnsamplification',
    name: 'DNS Amplification Attack',
    description: 'Large DNS responses used to flood network',
    target: 'router',
    solution: 'Rate limit DNS traffic and use secure resolvers',
    difficulty: 3,
  },
  {
    id: 'sslstrip',
    name: 'SSL Stripping',
    description: 'HTTPS connections downgraded to HTTP',
    target: 'firewall',
    solution: 'Enforce HSTS and monitor for SSL stripping',
    difficulty: 2,
  },
  {
    id: 'supplychain',
    name: 'Supply Chain Attack',
    description: 'Compromised software update detected',
    target: 'server',
    solution: 'Verify update sources and use code signing',
    difficulty: 3,
  },
  {
    id: 'bluetooth',
    name: 'Bluetooth Attack',
    description: 'Unauthorized Bluetooth connection attempt',
    target: 'workstation',
    solution: 'Disable Bluetooth when not needed',
    difficulty: 1,
  },
  {
    id: 'proxy',
    name: 'Proxy Bypass',
    description: 'Traffic detected bypassing network proxy',
    target: 'firewall',
    solution: 'Enforce proxy usage and monitor traffic',
    difficulty: 2,
  },
];

function getRandomThreats(arr, n) {
  const shuffled = arr.slice().sort(() => 0.5 - Math.random());
  return shuffled.slice(0, n);
}

const NetworkSecurityGame = () => {
  const [nodes, setNodes] = useState(NETWORK_NODES);
  const [currentThreat, setCurrentThreat] = useState(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameStatus, setGameStatus] = useState('playing');
  const [feedback, setFeedback] = useState(null);
  const [threats, setThreats] = useState(() => getRandomThreats(THREATS, 5));
  const [currentThreatIndex, setCurrentThreatIndex] = useState(0);

  useEffect(() => {
    if (gameStatus === 'playing' && currentThreatIndex < threats.length) {
      setCurrentThreat(threats[currentThreatIndex]);
    }
  }, [currentThreatIndex, threats, gameStatus]);

  useEffect(() => {
    if (gameStatus === 'playing' && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      handleTimeUp();
    }
  }, [timeLeft, gameStatus]);

  const handleNodeClick = (nodeId) => {
    if (!currentThreat || gameStatus !== 'playing') return;

    const targetNode = nodes.find(n => n.id === nodeId);
    const isCorrect = nodeId === currentThreat.target;

    if (isCorrect) {
      setScore(score + (10 * currentThreat.difficulty));
      setFeedback({
        type: 'success',
        message: `Correct! You protected the ${targetNode.name} from ${currentThreat.name}.`,
        explanation: `Solution: ${currentThreat.solution}`,
      });
    } else {
      setFeedback({
        type: 'error',
        message: `Incorrect! The ${currentThreat.name} is targeting the ${nodes.find(n => n.id === currentThreat.target).name}.`,
        explanation: `Solution: ${currentThreat.solution}`,
      });
    }

    setTimeout(() => {
      if (currentThreatIndex === threats.length - 1) {
        setGameStatus('won');
      } else {
        setCurrentThreatIndex(currentThreatIndex + 1);
        setTimeLeft(30);
        setFeedback(null);
      }
    }, 2000);
  };

  const handleTimeUp = () => {
    setFeedback({
      type: 'error',
      message: 'Time\'s up!',
      explanation: `The ${currentThreat.name} succeeded. Better luck next time!`,
    });
    setTimeout(() => {
      if (currentThreatIndex === threats.length - 1) {
        setGameStatus('won');
      } else {
        setCurrentThreatIndex(currentThreatIndex + 1);
        setTimeLeft(30);
        setFeedback(null);
      }
    }, 2000);
  };

  const resetGame = () => {
    setNodes(NETWORK_NODES);
    setCurrentThreat(null);
    setScore(0);
    setTimeLeft(30);
    setGameStatus('playing');
    setFeedback(null);
    setCurrentThreatIndex(0);
    setThreats(getRandomThreats(THREATS, 5));
  };

  const background = (
    <Box sx={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      zIndex: -2,
      background: 'linear-gradient(120deg, #36d1c4 0%, #5b86e5 100%)',
      backgroundImage: 'url(https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=1500&q=80)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      filter: 'blur(2px) brightness(0.85)',
    }} />
  );

  if (gameStatus === 'won') {
    return (
      <Box className="game-container" sx={{ width: '100vw', height: '100vh', minWidth: '100vw', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', m: 0, p: 0 }}>
        {background}
        <Paper elevation={12} sx={{ ...glassStyle, maxWidth: 400, mx: 'auto', p: 4, borderRadius: 6, textAlign: 'center' }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2, color: '#1a237e' }}>
            Network Secured!
          </Typography>
          <CheckCircle color="success" sx={{ fontSize: 48, mb: 1 }} />
          <Typography variant="h5" sx={{ mb: 2 }}>
            Final Score: {score}
          </Typography>
          <Button variant="contained" color="primary" onClick={resetGame} sx={{ mt: 2 }}>
            Play Again
          </Button>
        </Paper>
      </Box>
    );
  }

  return (
    <Box className="game-container" sx={{ width: '100vw', height: '100vh', minWidth: '100vw', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', m: 0, p: 0 }}>
      {background}
      <Fade in timeout={500}>
        <Paper elevation={12} sx={{ ...glassStyle, maxWidth: 800, mx: 'auto', p: 4, borderRadius: 6 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography color="primary" fontWeight="bold">
              Threat: {currentThreatIndex + 1}/{threats.length}
            </Typography>
            <Typography color="secondary" fontWeight="bold">
              Score: {score}
            </Typography>
            <Typography color="error" fontWeight="bold">
              Time: {timeLeft}s
      </Typography>
        </Box>

          <LinearProgress
            variant="determinate"
            value={(timeLeft / 30) * 100}
            sx={{ height: 10, borderRadius: 5, mb: 3, backgroundColor: '#e3e3e3', '& .MuiLinearProgress-bar': { background: 'linear-gradient(90deg,#36d1c4,#5b86e5)' } }}
          />

          {currentThreat && (
            <Card elevation={6} sx={{ mb: 3, borderRadius: 4, background: 'rgba(255,255,255,0.95)', boxShadow: '0 4px 24px 0 rgba(60,72,88,0.12)' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Warning color="error" sx={{ mr: 1 }} />
                  <Typography variant="h6" sx={{ color: '#d32f2f', fontWeight: 'bold' }}>
                    {currentThreat.name}
          </Typography>
                </Box>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  {currentThreat.description}
          </Typography>
                <Typography variant="body2" sx={{ color: '#666' }}>
                  Difficulty: {'⭐'.repeat(currentThreat.difficulty)}
              </Typography>
              </CardContent>
            </Card>
          )}

          <Grid container spacing={3} sx={{ mb: 3 }}>
            {nodes.map((node) => (
              <Grid item xs={12} sm={6} key={node.id}>
                <Card
                  elevation={6}
                  sx={{
                    p: 2,
                    borderRadius: 4,
                    background: 'rgba(255,255,255,0.95)',
                    boxShadow: '0 4px 24px 0 rgba(60,72,88,0.12)',
                    cursor: 'pointer',
                    transition: '0.3s',
                    '&:hover': {
                      transform: 'scale(1.02)',
                      boxShadow: '0 8px 32px 0 rgba(60,72,88,0.2)',
                    },
                  }}
                  onClick={() => handleNodeClick(node.id)}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    {node.icon}
                    <Typography variant="h6" sx={{ ml: 1, fontWeight: 'bold' }}>
                      {node.name}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="body2" sx={{ color: '#666' }}>
                      Security Level: {'🔒'.repeat(node.securityLevel)}
                    </Typography>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>

        {feedback && (
            <Fade in timeout={400}>
              <Alert severity={feedback.type} sx={{ my: 2, fontWeight: 'bold', fontSize: 18, borderRadius: 2, boxShadow: 1 }}>
                {feedback.message} {feedback.explanation}
          </Alert>
            </Fade>
        )}
      </Paper>
      </Fade>
    </Box>
  );
};

export default NetworkSecurityGame; 