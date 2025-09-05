import React, { useState } from 'react';
import { Box, Typography, Paper, Button, Fade, LinearProgress, Alert, Card, CardContent, Grid } from '@mui/material';
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

// Branching story structure
const STORY = [
  {
    id: 0,
    text: 'You receive an urgent email from someone claiming to be your company\'s IT admin. They say your account will be locked unless you reset your password using the link provided.',
    choices: [
      { text: 'Click the link and reset your password.', next: 1, feedback: 'The link was malicious! Your credentials are now compromised.', type: 'bad' },
      { text: 'Call IT to verify the email.', next: 2, feedback: 'Smart move! IT confirms they did not send the email.', type: 'good' },
      { text: 'Ignore the email.', next: 3, feedback: 'You ignored the email. It might have been a scam, but you missed a chance to report it.', type: 'neutral' },
    ],
  },
  {
    id: 1,
    text: 'Shortly after, you notice suspicious activity on your account. IT contacts you about a possible breach.',
    choices: [
      { text: 'Admit you clicked the link and ask for help.', next: 4, feedback: 'Honesty helps IT respond quickly and limit damage.', type: 'good' },
      { text: 'Deny any wrongdoing.', next: 5, feedback: 'Covering up delays the response and increases risk.', type: 'bad' },
    ],
  },
  {
    id: 2,
    text: 'Later, you get a phone call from someone claiming to be your manager, urgently asking for sensitive files.',
    choices: [
      { text: 'Send the files immediately.', next: 6, feedback: 'You fell for a pretexting attack. Always verify requests for sensitive info.', type: 'bad' },
      { text: 'Politely refuse and verify with your manager in person.', next: 7, feedback: 'Excellent! You avoided a social engineering trap.', type: 'good' },
    ],
  },
  {
    id: 3,
    text: 'The next day, IT sends a real password reset email. You almost miss it, but you check with IT and confirm it\'s legitimate.',
    choices: [
      { text: 'Reset your password after confirming.', next: 7, feedback: 'You handled it well by verifying first.', type: 'good' },
    ],
  },
  {
    id: 4,
    text: 'IT helps you reset your password and secures your account. You attend a security awareness session.',
    choices: [
      { text: 'Thank IT and pay attention in training.', next: 7, feedback: 'You learned from your mistake and improved your awareness.', type: 'good' },
    ],
  },
  {
    id: 5,
    text: 'The breach investigation takes longer, and more accounts are affected. Eventually, the truth comes out.',
    choices: [
      { text: 'Admit your mistake and cooperate.', next: 4, feedback: 'It\'s always better to be honest with IT.', type: 'neutral' },
    ],
  },
  {
    id: 6,
    text: 'Sensitive files are leaked. IT investigates and discovers the breach.',
    choices: [
      { text: 'Admit you sent the files and help IT respond.', next: 4, feedback: 'Cooperation helps limit the damage.', type: 'neutral' },
    ],
  },
  {
    id: 7,
    text: 'You successfully avoided social engineering traps and helped keep your company safe! IT commends your vigilance.',
    choices: [],
  },
];

const ENDINGS = {
  good: {
    icon: 'success', title: 'You Escaped!', color: '#185a9d',
    message: 'You made safe choices and avoided social engineering traps. Great job!'
  },
  bad: {
    icon: 'error', title: 'Compromised!', color: '#d32f2f',
    message: 'You fell for a social engineering attack. Learn from your mistakes and stay vigilant!'
  },
  neutral: {
    icon: 'info', title: 'Almost Escaped!', color: '#3949ab',
    message: 'You avoided some traps, but there\'s room for improvement.'
  },
};

function getEnding(choices) {
  // Prioritize bad > neutral > good
  if (choices.some(c => c.type === 'bad')) return 'bad';
  if (choices.some(c => c.type === 'neutral')) return 'neutral';
  return 'good';
}

function getEndingIcon(type) {
  if (type === 'success') return <CheckCircleIcon color="success" sx={{ fontSize: 48, mb: 1 }} />;
  if (type === 'error') return <ErrorIcon color="error" sx={{ fontSize: 48, mb: 1 }} />;
  return <InfoIcon color="info" sx={{ fontSize: 48, mb: 1 }} />;
}

const SocialEngineeringEscapeGame = () => {
  const [step, setStep] = useState(0);
  const [choices, setChoices] = useState([]);
  const [feedback, setFeedback] = useState(null);
  const [showSummary, setShowSummary] = useState(false);

  const current = STORY[step];
  const progress = Math.round((step / (STORY.length - 1)) * 100);

  const handleChoice = (choice) => {
    setFeedback({ message: choice.feedback, type: choice.type });
    setChoices([...choices, choice]);
    setTimeout(() => {
      setFeedback(null);
      setStep(choice.next);
      if (STORY[choice.next].choices.length === 0) {
        setShowSummary(true);
      }
    }, 1600);
  };

  const resetGame = () => {
    setStep(0);
    setChoices([]);
    setFeedback(null);
    setShowSummary(false);
  };

  const background = (
    <Box sx={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      zIndex: -2,
      background: 'linear-gradient(120deg, #43cea2 0%, #185a9d 100%)',
      backgroundImage: 'url(https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=1500&q=80)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      filter: 'blur(2px) brightness(0.85)',
    }} />
  );

  if (showSummary) {
    const endingType = getEnding(choices);
    const ending = ENDINGS[endingType];
    return (
      <Box className="game-container" sx={{ width: '100vw', height: '100vh', minWidth: '100vw', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', m: 0, p: 0 }}>
        {background}
        <Paper elevation={12} sx={{ ...glassStyle, maxWidth: 500, mx: 'auto', p: 4, borderRadius: 6, textAlign: 'center' }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2, color: ending.color }}>
            {getEndingIcon(ending.icon)}
            {ending.title}
          </Typography>
          <Typography variant="h5" sx={{ mb: 2 }}>
            {ending.message}
          </Typography>
          <Typography variant="body1" sx={{ mb: 2, color: '#555' }}>
            <b>Your Choices:</b>
          </Typography>
          <ul style={{ textAlign: 'left', margin: '0 auto', maxWidth: 350 }}>
            {choices.map((c, idx) => (
              <li key={idx} style={{ marginBottom: 8 }}>
                <b>Step {idx + 1}:</b> {c.text} <br />
                <span style={{ color: c.type === 'good' ? '#388e3c' : c.type === 'bad' ? '#d32f2f' : '#3949ab' }}>{c.feedback}</span>
              </li>
            ))}
          </ul>
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
      <Fade in timeout={500} key={step}>
        <Paper elevation={12} sx={{ ...glassStyle, maxWidth: 700, mx: 'auto', p: 4, borderRadius: 6 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography color="primary" fontWeight="bold">
              Progress: {progress}%
            </Typography>
            <LinearProgress variant="determinate" value={progress} sx={{ width: 200, height: 10, borderRadius: 5, backgroundColor: '#e3e3e3', '& .MuiLinearProgress-bar': { background: 'linear-gradient(90deg,#43cea2,#185a9d)' } }} />
          </Box>
          <Card elevation={6} sx={{ mb: 3, borderRadius: 4, background: 'rgba(255,255,255,0.95)', boxShadow: '0 4px 24px 0 rgba(60,72,88,0.12)' }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, color: '#185a9d', fontWeight: 'bold' }}>{current.text}</Typography>
            </CardContent>
          </Card>
          <Grid container spacing={2} sx={{ mb: 2 }}>
            {current.choices.map((choice, idx) => (
              <Grid item xs={12} sm={6} key={idx}>
                <Button
                  variant="contained"
                  color={choice.type === 'good' ? 'success' : choice.type === 'bad' ? 'error' : 'info'}
                  onClick={() => handleChoice(choice)}
                  fullWidth
                  sx={{ py: 1.5, fontWeight: 'bold', fontSize: 16, borderRadius: 2, boxShadow: 2, background: choice.type === 'good' ? 'linear-gradient(90deg,#43cea2,#185a9d)' : choice.type === 'bad' ? 'linear-gradient(90deg,#ff512f,#dd2476)' : 'linear-gradient(90deg,#b2bec3,#636e72)' }}
                  disabled={!!feedback}
                >
                  {choice.text}
                </Button>
              </Grid>
            ))}
          </Grid>
          {feedback && (
            <Fade in timeout={400}>
              <Alert severity={feedback.type === 'good' ? 'success' : feedback.type === 'bad' ? 'error' : 'info'} sx={{ my: 2, fontWeight: 'bold', fontSize: 18, borderRadius: 2, boxShadow: 1 }}>
                {feedback.message}
              </Alert>
            </Fade>
          )}
        </Paper>
      </Fade>
    </Box>
  );
};

export default SocialEngineeringEscapeGame; 