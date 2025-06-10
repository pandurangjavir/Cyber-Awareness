import React, { useState } from 'react';
import { Box, Typography, Paper, Button, Radio, Card, CardContent, CardActionArea, Grid, Fade, LinearProgress, Alert } from '@mui/material';
import '../../css/Games.css';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

const QUESTIONS = {
  easy: [
    {
      question: "Which password is the strongest?",
      options: ["password123", "Winter2023!", "P@ssw0rd#2024", "12345678"],
      correct: 2,
      learning: "Strong passwords mix uppercase, lowercase, numbers, and symbols (like P@ssw0rd#2024)."
    },
    {
      question: "What does a firewall do?",
      options: ["Blocks unauthorized access", "Speeds up Wi-Fi", "Stores passwords", "Manages emails"],
      correct: 0,
      learning: "A firewall blocks unauthorized access to or from a private network."
    },
    {
      question: "What does HTTPS stand for?",
      options: ["HyperText Transfer Protocol Secure", "High Transmission Text Protocol", "Hyperlink Text Process Secure", "Hyper Terminal Secure"],
      correct: 0,
      learning: "HTTPS stands for HyperText Transfer Protocol Secure, ensuring secure communication over the web."
    },
    {
      question: "Which of the following is an example of personal information?",
      options: ["Favorite color", "Phone number", "Pet's age", "Hobby"],
      correct: 1,
      learning: "Phone number is considered personal information that must be protected."
    },
    {
      question: "What should you do if you receive a suspicious email?",
      options: ["Open it immediately", "Ignore it", "Click all links", "Report it"],
      correct: 3,
      learning: "Suspicious emails should be reported to protect yourself and others."
    },
    {
      question: "Which of these is a strong password?",
      options: ["password123", "123456", "Qwerty", "T!g3r$2025"],
      correct: 3,
      learning: "Strong passwords combine letters, numbers, and special characters."
    },
    {
      question: "What is malware?",
      options: ["A type of hardware", "Bad software intended to harm devices", "An operating system", "A safe file"],
      correct: 1,
      learning: "Malware refers to malicious software like viruses and trojans."
    },
    {
      question: "What does antivirus software do?",
      options: ["Infect computers", "Fix printers", "Detect and remove malware", "Create websites"],
      correct: 2,
      learning: "Antivirus software protects against and removes malware threats."
    },
    {
      question: "Which is safer: Public Wi-Fi or private Wi-Fi?",
      options: ["Public Wi-Fi", "Private Wi-Fi", "Both equally safe", "No Wi-Fi is safe"],
      correct: 1,
      learning: "Private Wi-Fi with a strong password is much safer than public Wi-Fi."
    },
    {
      question: "What should you never share online?",
      options: ["Favorite food", "Home address", "Pet's name", "Favorite movie"],
      correct: 1,
      learning: "Never share sensitive information like your home address online."
    },
    {
      question: "What is two-factor authentication (2FA)?",
      options: ["A type of malware", "A way to double your password", "A security process requiring two forms of verification", "A backup method for files"],
      correct: 2,
      learning: "2FA adds an extra layer of security by requiring two forms of verification."
    },
    {
      question: "Which of these is a safe way to connect to public Wi-Fi?",
      options: ["Without a password", "Using a VPN", "Sharing your credentials", "Clicking on pop-ups"],
      correct: 1,
      learning: "Using a VPN is the safest way to use public Wi-Fi."
    },
    {
      question: "What is the best way to keep your software secure?",
      options: ["Ignore updates", "Update regularly", "Uninstall it", "Share it with friends"],
      correct: 1,
      learning: "Regular updates patch security vulnerabilities."
    }
  ],
  medium: [
    {
      question: "What is a phishing attack?",
      options: ["A fake website pretending to be legitimate", "A type of strong password", "A hardware device", "A VPN service"],
      correct: 0,
      learning: "Phishing tricks you into entering passwords on fake sites (e.g., fake bank login pages)."
    },
    {
      question: "How does a VPN protect you?",
      options: ["By hiding your IP address", "By speeding up downloads", "By blocking all malware", "By storing passwords"],
      correct: 0,
      learning: "VPNs encrypt your internet traffic and hide your location on public Wi-Fi."
    },
    {
      question: "What is social engineering in cybersecurity?",
      options: ["Building websites", "Manipulating people to reveal confidential information", "Engineering physical devices", "Developing security software"],
      correct: 1,
      learning: "Social engineering tricks people into giving away private information."
    },
    {
      question: "What does SQL injection target?",
      options: ["Mobile apps", "Database queries", "Image files", "Audio systems"],
      correct: 1,
      learning: "SQL injection attacks manipulate database queries to gain unauthorized access."
    },
    {
      question: "What is a botnet?",
      options: ["A secure internet browser", "A collection of infected computers controlled remotely", "A group of AI bots", "An online gaming team"],
      correct: 1,
      learning: "A botnet is a network of compromised computers controlled by a hacker."
    },
    {
      question: "Which protocol is used to securely transfer files?",
      options: ["FTP", "HTTP", "SFTP", "SMTP"],
      correct: 2,
      learning: "SFTP (Secure File Transfer Protocol) encrypts file transfer over a network."
    },
    {
      question: "What is the primary goal of a Denial-of-Service (DoS) attack?",
      options: ["Steal data", "Destroy hardware", "Make a system unavailable", "Send marketing emails"],
      correct: 2,
      learning: "A DoS attack overwhelms systems to make them unavailable."
    },
    {
      question: "What is the purpose of a digital certificate?",
      options: ["Encrypt emails", "Verify identity online", "Save passwords", "Backup data"],
      correct: 1,
      learning: "Digital certificates verify the authenticity of a website or user."
    },
    {
      question: "What is a Zero-Day vulnerability?",
      options: ["An antivirus update", "A weakness discovered after a fix", "A weakness exploited before a patch is available", "A firewall error"],
      correct: 2,
      learning: "Zero-Day vulnerabilities are exploited before the vendor releases a fix."
    },
    {
      question: "What is an SSL certificate used for?",
      options: ["Faster websites", "Secure web communication", "Online ads", "Hardware optimization"],
      correct: 1,
      learning: "SSL certificates encrypt data between a browser and a web server."
    },
    {
      question: "What is a brute-force attack?",
      options: ["Guessing passwords repeatedly until correct", "Sending spam emails", "Encrypting files for ransom", "Scanning for viruses"],
      correct: 0,
      learning: "Brute-force attacks try many passwords until one works."
    },
    {
      question: "What is the main function of a VPN?",
      options: ["Speed up your internet", "Encrypt your internet traffic", "Store your passwords", "Block ads"],
      correct: 1,
      learning: "VPNs encrypt your internet traffic for privacy and security."
    },
    {
      question: "What is a security patch?",
      options: ["A physical sticker", "A software update fixing vulnerabilities", "A type of firewall", "A password manager"],
      correct: 1,
      learning: "Security patches fix vulnerabilities in software."
    }
  ],
  hard: [
    {
      question: "What is an Advanced Persistent Threat (APT)?",
      options: ["A quick, random cyberattack", "A long-term targeted attack (often state-sponsored)", "A type of phishing email", "A hardware failure"],
      correct: 1,
      learning: "APTs are stealthy, prolonged attacks (often by governments) to steal sensitive data."
    },
    {
      question: "What is a zero-day vulnerability?",
      options: ["A flaw the vendor knows about and patched", "A flaw unknown to the vendor (no patch exists)", "A type of ransomware", "A weak password"],
      correct: 1,
      learning: "Zero-days are unpatched flaws hackers exploit before developers can fix them."
    },
    {
      question: "How does ransomware work?",
      options: ["It slows down your computer", "It encrypts files until you pay a ransom", "It steals your Wi-Fi password", "It deletes all your emails"],
      correct: 1,
      learning: "Ransomware locks your files. Regular backups are the best defense!"
    },
    {
      question: "What is the purpose of a password manager?",
      options: ["To block phishing emails", "To store/generate strong, unique passwords", "To encrypt your entire hard drive", "To hide your IP address"],
      correct: 1,
      learning: "Password managers create and remember complex passwords—no more reuse or weak choices!"
    },
    {
      question: "What is a man-in-the-middle (MITM) attack?",
      options: ["Intercepting communication between two parties", "Breaking encryption standards", "Flooding a network with traffic", "Stealing a device physically"],
      correct: 0,
      learning: "A MITM attack occurs when attackers secretly intercept and relay messages between two parties."
    },
    {
      question: "Which tool is commonly used for network penetration testing?",
      options: ["Wireshark", "Nmap", "Photoshop", "Slack"],
      correct: 1,
      learning: "Nmap is widely used for discovering hosts and services on a computer network."
    },
    {
      question: "What is the main purpose of public key infrastructure (PKI)?",
      options: ["Manage digital certificates and encryption keys", "Develop websites", "Design firewalls", "Scan networks for malware"],
      correct: 0,
      learning: "PKI manages public-key encryption and digital certificates."
    },
    {
      question: "What is SQL Injection?",
      options: ["Intercepting network traffic", "Injecting malicious SQL statements", "Spoofing IP addresses", "Breaking Wi-Fi passwords"],
      correct: 1,
      learning: "SQL Injection exploits vulnerabilities in a database query by injecting malicious code."
    },
    {
      question: "Which protocol is more secure: FTP or SFTP?",
      options: ["FTP", "SFTP", "Both are equally secure", "None"],
      correct: 1,
      learning: "SFTP encrypts data during transfer, unlike FTP."
    },
    {
      question: "What does a penetration test simulate?",
      options: ["Real-world cyberattacks", "Routine software updates", "Email marketing campaigns", "Hardware installation"],
      correct: 0,
      learning: "Penetration testing simulates cyberattacks to find security weaknesses."
    },
    {
      question: "What is a logic bomb?",
      options: ["A type of malware triggered by a specific event", "A strong password", "A firewall rule", "A backup method"],
      correct: 0,
      learning: "Logic bombs are malicious code that activate under certain conditions."
    },
    {
      question: "What is the principle of least privilege?",
      options: ["Giving everyone admin access", "Limiting user access to only what is necessary", "Allowing all network traffic", "Sharing passwords"],
      correct: 1,
      learning: "Users should have only the access they need to do their job."
    },
    {
      question: "What is a honeypot in cybersecurity?",
      options: ["A decoy system to attract attackers", "A type of virus", "A password manager", "A backup server"],
      correct: 0,
      learning: "A honeypot is a decoy system used to detect or study attackers."
    }
  ]
};

const glassStyle = {
  background: 'rgba(255,255,255,0.7)',
  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.18)',
  backdropFilter: 'blur(8px)',
  borderRadius: 16,
  border: '1px solid rgba(255,255,255,0.18)',
};

const QuizGame = () => {
  const [difficulty, setDifficulty] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);
  const [questions, setQuestions] = useState([]);

  const handleDifficultySelect = (level) => {
    setDifficulty(level);
    setQuestions(QUESTIONS[level]);
    setCurrentQuestion(0);
    setScore(0);
    setGameComplete(false);
  };

  const handleAnswerSelect = (index) => {
    setSelectedAnswer(index);
  };

  const handleSubmit = () => {
    if (selectedAnswer === null) return;
    const correct = selectedAnswer === questions[currentQuestion].correct;
    setIsCorrect(correct);
    setShowFeedback(true);
    if (correct) {
      setScore(score + (difficulty === 'easy' ? 10 : difficulty === 'medium' ? 20 : 30));
    }
    setTimeout(() => {
      setShowFeedback(false);
      setSelectedAnswer(null);
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setGameComplete(true);
      }
    }, 1200);
  };

  const resetGame = () => {
    setDifficulty(null);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowFeedback(false);
    setGameComplete(false);
    setQuestions([]);
  };

  // Background image overlay
  const background = (
    <Box sx={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      zIndex: -2,
      background: 'linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)',
      backgroundImage: 'url(https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=1500&q=80)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      filter: 'blur(2px) brightness(0.85)',
    }} />
  );

  if (!difficulty) {
    return (
      <Box className="game-container" sx={{ width: '100vw', height: '100vh', minHeight: '100vh', minWidth: '100vw', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
        {background}
        <Paper elevation={12} className="game-board" sx={{ ...glassStyle, maxWidth: 500, mx: 'auto', p: 4, borderRadius: 6, textAlign: 'center' }}>
          <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 2, color: '#1a237e', letterSpacing: 2 }}>
            Security Quiz
        </Typography>
          <Typography variant="h6" sx={{ mb: 4, color: '#3949ab' }}>
            Select Difficulty Level
          </Typography>
          <Button variant="contained" color="primary" onClick={() => handleDifficultySelect('easy')} fullWidth sx={{ mb: 2, py: 1.5, fontWeight: 'bold', fontSize: 18, borderRadius: 2, boxShadow: 2 }}>
              Easy (10 points per question)
            </Button>
          <Button variant="contained" color="secondary" onClick={() => handleDifficultySelect('medium')} fullWidth sx={{ mb: 2, py: 1.5, fontWeight: 'bold', fontSize: 18, borderRadius: 2, boxShadow: 2 }}>
              Medium (20 points per question)
            </Button>
          <Button variant="contained" sx={{ background: 'linear-gradient(90deg,#ff512f,#dd2476)', color: '#fff', mb: 2, py: 1.5, fontWeight: 'bold', fontSize: 18, borderRadius: 2, boxShadow: 2 }} onClick={() => handleDifficultySelect('hard')} fullWidth>
              Hard (30 points per question)
          </Button>
        </Paper>
      </Box>
    );
  }

  if (gameComplete) {
    const maxScore = questions.length * (difficulty === 'easy' ? 10 : difficulty === 'medium' ? 20 : 30);
    return (
      <Box className="game-container" sx={{ width: '100vw', height: '100vh', minHeight: '100vh', minWidth: '100vw', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
        {background}
        <Paper elevation={12} className="game-board" sx={{ ...glassStyle, maxWidth: 500, mx: 'auto', p: 4, borderRadius: 6, textAlign: 'center' }}>
          <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 2, color: '#1a237e', letterSpacing: 2 }}>
          Quiz Complete!
        </Typography>
          <Typography variant="h5" align="center" gutterBottom>
            Final Score: {score}/{maxScore}
          </Typography>
          <Typography variant="body1" align="center" gutterBottom>
            Difficulty: {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
          </Typography>
          <Button variant="contained" color="primary" onClick={resetGame} fullWidth sx={{ mt: 3, py: 1.5, fontWeight: 'bold', fontSize: 18, borderRadius: 2, boxShadow: 2 }}>
            Play Again
          </Button>
        </Paper>
      </Box>
    );
  }

  const currentQuiz = questions[currentQuestion];

  return (
    <Box className="game-container" sx={{ width: '100vw', height: '100vh', minHeight: '100vh', minWidth: '100vw', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
      {background}
      <Fade in timeout={500} key={currentQuestion}>
        <Paper elevation={12} className="game-board" sx={{ ...glassStyle, maxWidth: 600, mx: 'auto', p: 4, borderRadius: 6 }}>
          <Box className="game-stats" sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography color="primary" fontWeight="bold">
            Difficulty: {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
          </Typography>
            <Typography color="secondary" fontWeight="bold">
            Question: {currentQuestion + 1}/{questions.length}
          </Typography>
            <Typography fontWeight="bold">Score: {score}</Typography>
        </Box>

        <LinearProgress
          variant="determinate"
            value={((currentQuestion) / questions.length) * 100}
            sx={{ height: 12, borderRadius: 6, mb: 3, backgroundColor: '#e3e3e3', '& .MuiLinearProgress-bar': { background: 'linear-gradient(90deg,#36d1c4,#5b86e5,#ff512f,#dd2476)' } }}
        />

          <Card elevation={3} sx={{ mb: 3, background: 'rgba(245,250,255,0.85)', borderRadius: 3, boxShadow: '0 4px 24px 0 rgba(60,72,88,0.12)' }}>
            <CardContent>
              <Typography variant="h6" className="question-text" sx={{ fontWeight: 'bold', color: '#3949ab', fontSize: 22, letterSpacing: 1 }}>
          {currentQuiz.question}
        </Typography>
            </CardContent>
          </Card>

          <Grid container spacing={2}>
            {currentQuiz.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrectOption = showFeedback && index === currentQuiz.correct;
              const isWrongSelected = showFeedback && isSelected && !isCorrectOption;
              return (
                <Grid item xs={12} key={index}>
                  <Fade in timeout={400} key={index}>
                    <Card
                      elevation={isSelected ? 10 : 2}
                      sx={{
                        border: isSelected ? '2.5px solid #3949ab' : '1.5px solid #e0e0e0',
                        background: isCorrectOption ? 'linear-gradient(90deg,#e8f5e9,#b2f7ef)' : isWrongSelected ? 'linear-gradient(90deg,#ffebee,#ffe0e0)' : 'rgba(255,255,255,0.95)',
                        transition: '0.25s',
                        cursor: showFeedback ? 'not-allowed' : 'pointer',
                        '&:hover': {
                          boxShadow: !showFeedback && !isSelected ? 8 : undefined,
                          borderColor: !showFeedback && !isSelected ? '#36d1c4' : undefined,
                          background: !showFeedback && !isSelected ? 'rgba(245,250,255,0.98)' : undefined,
                        },
                        display: 'flex',
                        alignItems: 'center',
                        minHeight: 56,
                      }}
                      onClick={() => !showFeedback && handleAnswerSelect(index)}
                    >
                      <CardActionArea disabled={showFeedback}>
                        <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
                          <Radio
                            checked={isSelected}
              value={index}
              disabled={showFeedback}
                            sx={{ mr: 1 }}
                          />
                          <Typography variant="body1" sx={{ flex: 1, fontWeight: isSelected ? 'bold' : 400, color: isSelected ? '#1a237e' : '#333' }}>{option}</Typography>
                          {showFeedback && isCorrectOption && <CheckCircleIcon color="success" sx={{ ml: 1, fontSize: 28 }} />}
                          {showFeedback && isWrongSelected && <CancelIcon color="error" sx={{ ml: 1, fontSize: 28 }} />}
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Fade>
                </Grid>
              );
            })}
          </Grid>

          <Fade in={showFeedback} timeout={400}>
            <Box>
        {showFeedback && (
                <Alert severity={isCorrect ? "success" : "error"} sx={{ my: 3, fontWeight: 'bold', fontSize: 18, borderRadius: 2, boxShadow: 1 }}>
            {isCorrect ? "Correct answer!" : "Incorrect answer. Try the next question!"}
          </Alert>
        )}
            </Box>
          </Fade>

        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={selectedAnswer === null || showFeedback}
          fullWidth
            sx={{ mt: 3, py: 1.5, fontWeight: 'bold', fontSize: 20, borderRadius: 2, boxShadow: 3, background: 'linear-gradient(90deg,#36d1c4,#5b86e5)' }}
        >
          Submit Answer
        </Button>
      </Paper>
      </Fade>
    </Box>
  );
};

export default QuizGame; 