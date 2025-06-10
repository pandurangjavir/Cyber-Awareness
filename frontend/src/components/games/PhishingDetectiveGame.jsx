import React, { useState } from 'react';
import { Box, Typography, Paper, Button, Alert, CircularProgress, Card, CardContent, Fade, Grid } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import InfoIcon from '@mui/icons-material/Info';
import '../../css/Games.css';

const glassStyle = {
  background: 'rgba(255,255,255,0.7)',
  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.18)',
  backdropFilter: 'blur(8px)',
  borderRadius: 16,
  border: '1px solid rgba(255,255,255,0.18)',
};

const ALL_SCENARIOS = [
  {
    content: {
      from: 'security@yourbank.com',
      subject: 'Urgent: Account Verification Needed',
      body: 'Dear Customer,\n\nWe noticed suspicious activity in your account. Please verify your account by clicking the link below:\nhttp://yourbank-verification.com\n\nThank you.',
      clues: [
        'Urgency and fear tactics',
        'Suspicious link (not the real bank domain)',
        'Generic greeting',
      ],
    },
    isPhishing: true,
    explanation: 'The email uses urgency and a fake link to trick you into giving up your credentials. Always check the sender and links.'
  },
  {
    content: {
      from: 'hr@company.com',
      subject: 'Updated Employee Handbook',
      body: 'Hello Team,\n\nPlease find attached the updated employee handbook. Let us know if you have any questions.\n\nBest,\nHR Department',
      clues: [
        'No suspicious links',
        'Professional language',
        'Expected sender and context',
      ],
    },
    isPhishing: false,
    explanation: 'This is a legitimate message from your HR department with no suspicious elements.'
  },
  {
    content: {
      from: 'it-support@company.com',
      subject: 'Password Expiry Notification',
      body: 'Dear User,\n\nYour password will expire in 24 hours. Click here to reset: http://it-support-reset.com\n\nIT Support',
      clues: [
        'Unusual reset link',
        'No personal greeting',
        'Unexpected request',
      ],
    },
    isPhishing: true,
    explanation: 'Phishing emails often use fake password reset links. Always verify the URL and sender.'
  },
  {
    content: {
      from: 'friend@gmail.com',
      subject: 'Check out these photos!',
      body: 'Hey!\n\nHere are the photos from our trip. Let me know what you think!\n\n- Alex',
      clues: [
        'Personal context',
        'No suspicious links',
        'Known sender',
      ],
    },
    isPhishing: false,
    explanation: 'This is a normal email from a friend with no signs of phishing.'
  },
  {
    content: {
      from: 'admin@paypal.com',
      subject: 'Your Account Has Been Limited',
      body: 'Dear User,\n\nWe have limited your account due to suspicious activity. Please login here to restore access: http://paypal-login-alert.com\n\nPayPal Team',
      clues: [
        'Fake login link',
        'Urgency and threat',
        'Generic greeting',
      ],
    },
    isPhishing: true,
    explanation: 'Phishing emails often impersonate trusted companies and use fake links.'
  },
  {
    content: {
      from: 'newsletter@shopping.com',
      subject: 'Your Weekly Deals',
      body: 'Hi there!\n\nCheck out this week\'s deals and save big on your favorite products.\n\nVisit our website for more info.',
      clues: [
        'No urgent requests',
        'No suspicious links',
        'Expected content',
      ],
    },
    isPhishing: false,
    explanation: 'This is a standard marketing email with no phishing indicators.'
  },
  {
    content: {
      from: 'support@apple.com',
      subject: 'Apple ID Locked',
      body: 'Dear Customer,\n\nYour Apple ID has been locked for security reasons. Please unlock your account here: http://appleid-unlock.com\n\nApple Support',
      clues: [
        'Fake Apple link',
        'Urgency and fear',
        'No personal greeting',
      ],
    },
    isPhishing: true,
    explanation: 'Always check the URL and sender. Apple will never ask you to unlock your account via a non-Apple link.'
  },
  {
    content: {
      from: 'colleague@company.com',
      subject: 'Lunch Plans?',
      body: 'Hey,\n\nAre you free for lunch tomorrow? Let me know!\n\nThanks,\nSam',
      clues: [
        'Personal context',
        'No links or attachments',
        'Known sender',
      ],
    },
    isPhishing: false,
    explanation: 'A normal, safe message from a colleague.'
  },
  {
    content: {
      from: 'security@amazon.com',
      subject: 'Order Confirmation',
      body: 'Hello,\n\nThank you for your recent order. If you did not make this purchase, please contact us immediately.\n\nAmazon Security',
      clues: [
        'No suspicious links',
        'Expected after a purchase',
        'Contact info provided',
      ],
    },
    isPhishing: false,
    explanation: 'A legitimate order confirmation from Amazon.'
  },
  {
    content: {
      from: 'admin@onlineservice.com',
      subject: 'Unusual Login Attempt',
      body: 'Dear User,\n\nWe detected an unusual login attempt. Please verify your account: http://onlineservice-verify.com\n\nSupport Team',
      clues: [
        'Fake verification link',
        'Urgency',
        'Generic greeting',
      ],
    },
    isPhishing: true,
    explanation: 'Phishing emails often use fake verification links and urgent language.'
  },
  {
    content: {
      from: 'admin@securebank.com',
      subject: 'Security Alert: Unusual Login Attempt',
      body: 'Dear Customer,\n\nWe detected an unusual login attempt. Please confirm your identity by clicking the link: http://securebank-login.com\n\nThank you.',
      clues: [
        'Urgency and fear tactics',
        'Suspicious link (not the real bank domain)',
        'Generic greeting',
      ],
    },
    isPhishing: true,
    explanation: 'Phishing emails often use urgent language and fake links to trick you.'
  },
  {
    content: {
      from: 'manager@company.com',
      subject: 'Team Meeting Reminder',
      body: 'Hi Team,\n\nJust a reminder about our meeting tomorrow at 10am in the main conference room.\n\nBest,\nManager',
      clues: [
        'No suspicious links',
        'Expected sender and context',
        'Professional language',
      ],
    },
    isPhishing: false,
    explanation: 'This is a legitimate internal company email.'
  },
  {
    content: {
      from: 'it-admin@company-support.com',
      subject: 'Immediate Action Required: Update Your Credentials',
      body: 'Dear Employee,\n\nYour account will be locked unless you update your credentials here: http://company-support-update.com\n\nIT Admin',
      clues: [
        'Fake update link',
        'Urgency',
        'Generic greeting',
      ],
    },
    isPhishing: true,
    explanation: 'Phishing emails often use fake update links and urgent language.'
  },
  {
    content: {
      from: 'events@university.edu',
      subject: 'Invitation: Annual Science Fair',
      body: 'Dear Student,\n\nYou are invited to the Annual Science Fair. Please RSVP by replying to this email.\n\nBest,\nUniversity Events',
      clues: [
        'No suspicious links',
        'Expected sender and context',
        'No urgent request',
      ],
    },
    isPhishing: false,
    explanation: 'This is a normal event invitation from your university.'
  },
  {
    content: {
      from: 'support@onlineshop.com',
      subject: 'Order Issue: Please Confirm Your Payment',
      body: 'Dear Customer,\n\nThere was an issue with your recent order. Please confirm your payment details here: http://onlineshop-payments.com\n\nSupport Team',
      clues: [
        'Fake payment link',
        'Urgency',
        'Generic greeting',
      ],
    },
    isPhishing: true,
    explanation: 'Phishing emails often ask for payment details via fake links.'
  },
  {
    content: {
      from: 'newsletter@library.org',
      subject: 'Monthly Newsletter',
      body: 'Hello!\n\nHere is your monthly library newsletter. Visit our website for more information.\n\nLibrary Team',
      clues: [
        'No urgent requests',
        'No suspicious links',
        'Expected content',
      ],
    },
    isPhishing: false,
    explanation: 'A standard newsletter from your library.'
  }
];

function getRandomScenarios(arr, n) {
  const shuffled = arr.slice().sort(() => 0.5 - Math.random());
  return shuffled.slice(0, n);
}

const PhishingDetectiveGame = () => {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [score, setScore] = useState(0);
  const [showClues, setShowClues] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [gameStatus, setGameStatus] = useState('playing');
  const [scenarios] = useState(() => getRandomScenarios(ALL_SCENARIOS, 10));

  const handleAnswer = (isPhishingGuess) => {
    const currentScenario = scenarios[currentLevel];
    const isCorrect = isPhishingGuess === currentScenario.isPhishing;
      setFeedback({
      type: isCorrect ? 'success' : 'error',
      message: isCorrect
        ? `Correct! This was ${currentScenario.isPhishing ? 'a phishing attempt.' : 'a legitimate message.'}`
        : `Incorrect. This was ${currentScenario.isPhishing ? 'a phishing attempt.' : 'a legitimate message.'}`,
      explanation: currentScenario.explanation || '',
      });
    if (isCorrect) setScore(score + 10);
    if (currentLevel === scenarios.length - 1) {
      setTimeout(() => setGameStatus('won'), 1800);
    } else {
      setTimeout(() => {
        setCurrentLevel(currentLevel + 1);
        setShowClues(false);
        setFeedback(null);
      }, 1800);
    }
  };

  const resetGame = () => {
    setCurrentLevel(0);
    setScore(0);
    setShowClues(false);
    setFeedback(null);
    setGameStatus('playing');
  };

  const renderEmail = (content) => (
    <Card elevation={6} sx={{ mb: 2, borderRadius: 4, background: 'rgba(255,255,255,0.95)', boxShadow: '0 4px 24px 0 rgba(60,72,88,0.12)' }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <EmailIcon color="primary" sx={{ mr: 1 }} />
          <Typography variant="subtitle1" fontWeight="bold">From: {content.from}</Typography>
      </Box>
        <Typography variant="subtitle2" color="secondary" fontWeight="bold" sx={{ mb: 1 }}>
          Subject: {content.subject}
        </Typography>
        <Typography variant="body1" sx={{ whiteSpace: 'pre-line', color: '#222' }}>
          {content.body}
        </Typography>
      </CardContent>
    </Card>
  );

  // Background image overlay
  const background = (
    <Box sx={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      zIndex: -2,
      background: 'linear-gradient(120deg, #f7971e 0%, #ffd200 100%)',
      backgroundImage: 'url(https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=1500&q=80)',
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
            Game Complete!
          </Typography>
          <CheckCircleIcon color="success" sx={{ fontSize: 48, mb: 1 }} />
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

  const currentScenario = scenarios[currentLevel];

  return (
    <Box className="game-container" sx={{ width: '100vw', height: '100vh', minWidth: '100vw', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', m: 0, p: 0 }}>
      {background}
      <Fade in timeout={500} key={currentLevel}>
        <Paper elevation={12} sx={{ ...glassStyle, maxWidth: 600, mx: 'auto', p: 4, borderRadius: 6 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography color="primary" fontWeight="bold">
              Level: {currentLevel + 1}/{scenarios.length}
            </Typography>
            <Typography color="secondary" fontWeight="bold">
              Score: {score}
      </Typography>
        </Box>

          {renderEmail(currentScenario.content)}

          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={12} sm={6}>
          <Button
            variant="contained"
                color="error"
            onClick={() => handleAnswer(true)}
                fullWidth
                sx={{ py: 1.5, fontWeight: 'bold', fontSize: 18, borderRadius: 2, boxShadow: 2, background: 'linear-gradient(90deg,#ff512f,#dd2476)' }}
                startIcon={<ErrorIcon />}
          >
            Mark as Phishing
          </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
          <Button
            variant="contained"
                color="success"
            onClick={() => handleAnswer(false)}
                fullWidth
                sx={{ py: 1.5, fontWeight: 'bold', fontSize: 18, borderRadius: 2, boxShadow: 2, background: 'linear-gradient(90deg,#36d1c4,#5b86e5)' }}
                startIcon={<CheckCircleIcon />}
          >
            Mark as Legitimate
          </Button>
            </Grid>
          </Grid>

          <Button
            variant="outlined"
            onClick={() => setShowClues(!showClues)}
            fullWidth
            sx={{ mb: 2, fontWeight: 'bold', borderRadius: 2 }}
            startIcon={<InfoIcon />}
          >
            {showClues ? 'Hide Clues' : 'Show Clues'}
          </Button>

        {showClues && (
            <Box className="clues-section" sx={{ mb: 2 }}>
              <Typography variant="h6" sx={{ color: '#3949ab', fontWeight: 'bold', mb: 1 }}>Clues to Look For:</Typography>
              <ul style={{ margin: 0, paddingLeft: 20 }}>
              {currentScenario.content.clues.map((clue, index) => (
                  <li key={index} style={{ fontSize: 16, marginBottom: 4 }}>{clue}</li>
              ))}
            </ul>
          </Box>
        )}

        {feedback && (
            <Fade in timeout={400}>
              <Alert severity={feedback.type} sx={{ my: 2, fontWeight: 'bold', fontSize: 18, borderRadius: 2, boxShadow: 1 }}>
            {feedback.message}
                {feedback.explanation && (
                  <Box sx={{ mt: 1, fontWeight: 400, fontSize: 16, color: '#333' }}>
                    <b>Explanation:</b> {feedback.explanation}
                  </Box>
                )}
          </Alert>
            </Fade>
        )}
      </Paper>
      </Fade>
    </Box>
  );
};

export default PhishingDetectiveGame; 