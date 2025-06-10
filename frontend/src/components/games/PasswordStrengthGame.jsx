import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, Paper, Grid, LinearProgress, IconButton, Tooltip } from '@mui/material';
import { Lock, Security, CheckCircle, Error } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  margin: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  borderRadius: '12px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
}));

const PASSWORD_TIPS = [
  {
    tip: 'Use at least 12 characters',
    explanation: 'Longer passwords are harder to crack. Aim for 12 or more characters.'
  },
  {
    tip: 'Include uppercase and lowercase letters',
    explanation: 'Mixing letter cases increases complexity and makes your password stronger.'
  },
  {
    tip: 'Add numbers and special characters',
    explanation: 'Adding numbers and symbols makes your password less predictable.'
  },
  {
    tip: 'Avoid common words and patterns',
    explanation: 'Attackers try common words and patterns first. Avoid using them.'
  },
  {
    tip: "Don't use personal information",
    explanation: 'Information like your name or birthdate can be easily guessed or found online.'
  },
  {
    tip: 'Use a different password for each account',
    explanation: 'Reusing passwords puts multiple accounts at risk if one is compromised.'
  },
];

const PasswordStrengthGame = () => {
  const [password, setPassword] = useState('');
  const [strength, setStrength] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [score, setScore] = useState(0);
  const [gameActive, setGameActive] = useState(false);

  useEffect(() => {
    let timer;
    if (gameActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setGameActive(false);
    }
    return () => clearInterval(timer);
  }, [gameActive, timeLeft]);

  const calculateStrength = (pass) => {
    let score = 0;
    let feedback = [];

    // Length check
    if (pass.length >= 8) score += 1;
    if (pass.length >= 12) score += 1;
    if (pass.length >= 16) score += 1;

    // Complexity checks
    if (/[A-Z]/.test(pass)) score += 1;
    if (/[a-z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;

    // Common patterns
    if (!/(.)\1{2,}/.test(pass)) score += 1;
    if (!/password|123456|qwerty/i.test(pass)) score += 1;

    // Generate feedback
    if (pass.length < 8) feedback.push('Password is too short');
    if (!/[A-Z]/.test(pass)) feedback.push('Add uppercase letters');
    if (!/[a-z]/.test(pass)) feedback.push('Add lowercase letters');
    if (!/[0-9]/.test(pass)) feedback.push('Add numbers');
    if (!/[^A-Za-z0-9]/.test(pass)) feedback.push('Add special characters');

    return { score: Math.min(score, 10), feedback: feedback.join(', ') };
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    const { score, feedback } = calculateStrength(newPassword);
    setStrength(score);
    setFeedback(feedback);
    if (gameActive) {
      setScore((prev) => prev + score);
    }
  };

  const startGame = () => {
    setGameActive(true);
    setTimeLeft(30);
    setScore(0);
    setPassword('');
    setStrength(0);
    setFeedback('');
  };

  const getStrengthColor = () => {
    if (strength <= 3) return 'error';
    if (strength <= 6) return 'warning';
    return 'success';
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom align="center">
        Password Strength Game
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <StyledPaper>
            <Typography variant="h6" gutterBottom>
              Create Strong Passwords
            </Typography>
            <Box sx={{ mb: 2 }}>
              <TextField
                fullWidth
                type={showPassword ? 'text' : 'password'}
                label="Enter Password"
                value={password}
                onChange={handlePasswordChange}
                InputProps={{
                  endAdornment: (
                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <Lock /> : <Security />}
                    </IconButton>
                  ),
                }}
              />
            </Box>
            
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                Password Strength
              </Typography>
              <LinearProgress
                variant="determinate"
                value={strength * 10}
                color={getStrengthColor()}
                sx={{ height: 8, borderRadius: 4 }}
              />
              <Box sx={{ mt: 1, display: 'flex', alignItems: 'center' }}>
                {strength > 0 && (
                  <>
                    {strength >= 7 ? (
                      <CheckCircle color="success" sx={{ mr: 1 }} />
                    ) : (
                      <Error color="error" sx={{ mr: 1 }} />
                    )}
                    <Typography variant="body2" color="textSecondary">
                      {feedback}
                    </Typography>
                  </>
                )}
              </Box>
            </Box>
          </StyledPaper>
        </Grid>

        <Grid item xs={12} md={6}>
          <StyledPaper>
            <Typography variant="h6" gutterBottom>
              Game Status
            </Typography>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body1">
                Time Left: {timeLeft} seconds
              </Typography>
              <Typography variant="body1">
                Score: {score}
              </Typography>
              {!gameActive && timeLeft === 0 && (
                <Typography variant="body2" color="primary">
                  Time's up! Your final score is {score}.
                </Typography>
              )}
            </Box>
            <Button
              variant="contained"
              color="primary"
              onClick={startGame}
              disabled={gameActive}
              fullWidth
            >
              {gameActive ? 'Game in Progress' : 'Start Game'}
            </Button>
          </StyledPaper>
        </Grid>
      </Grid>

      <Box sx={{ mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Tips for Strong Passwords
        </Typography>
        <Grid container spacing={2}>
          {PASSWORD_TIPS.map((tipObj, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Tooltip title={tipObj.explanation} placement="top" arrow>
                <Paper
                  sx={{
                    p: 2,
                    cursor: 'pointer',
                    '&:hover': {
                      backgroundColor: 'action.hover',
                    },
                  }}
                >
                  <Typography variant="body2" fontWeight="bold">{tipObj.tip}</Typography>
                  <Typography variant="caption" color="textSecondary">{tipObj.explanation}</Typography>
                </Paper>
              </Tooltip>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default PasswordStrengthGame; 