import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
    Box,
    Container,
    TextField,
    Button,
    Typography,
    Paper,
    Link,
    Alert,
    CircularProgress,
    Grid
} from '@mui/material';
import Header from './Header';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            setLoading(false);
            return;
        }

        try {
            await register(name, email, password);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to register');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ width: '100vw', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #1a237e 0%, #3949ab 100%)' }}>
            <Paper elevation={6} sx={{ width: 400, height: 600, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', p: 4, borderRadius: 4, background: 'rgba(255,255,255,0.95)', boxShadow: '0 8px 32px rgba(60,72,88,0.18)' }}>
                <Typography
                    variant="h4"
                    component="h1"
                    gutterBottom
                    sx={{
                        color: '#1a237e',
                        fontWeight: 'bold',
                        mb: 4
                    }}
                >
                    Create Account
                </Typography>
                <Typography variant="body1" paragraph sx={{ mb: 4, color: '#666' }}>
                    Join our community and start your cybersecurity journey.
                </Typography>
                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
                    </Alert>
                )}
                <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
                    <TextField
                        fullWidth
                        label="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        margin="normal"
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: '#1a237e',
                                },
                                '&:hover fieldset': {
                                    borderColor: '#3949ab',
                                },
                            },
                        }}
                    />
                    <TextField
                        fullWidth
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        margin="normal"
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: '#1a237e',
                                },
                                '&:hover fieldset': {
                                    borderColor: '#3949ab',
                                },
                            },
                        }}
                    />
                    <TextField
                        fullWidth
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        margin="normal"
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: '#1a237e',
                                },
                                '&:hover fieldset': {
                                    borderColor: '#3949ab',
                                },
                            },
                        }}
                    />
                    <TextField
                        fullWidth
                        label="Confirm Password"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        margin="normal"
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: '#1a237e',
                                },
                                '&:hover fieldset': {
                                    borderColor: '#3949ab',
                                },
                            },
                        }}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        disabled={loading}
                        sx={{
                            mt: 3,
                            mb: 2,
                            py: 1.5,
                            background: 'linear-gradient(45deg, #1a237e 30%, #3949ab 90%)',
                            '&:hover': {
                                background: 'linear-gradient(45deg, #3949ab 30%, #1a237e 90%)',
                            },
                        }}
                    >
                        {loading ? <CircularProgress size={24} color="inherit" /> : 'Register'}
                    </Button>
                    <Typography variant="body2" align="center">
                        Already have an account?{' '}
                        <Link
                            href="/login"
                            sx={{
                                color: '#1a237e',
                                fontWeight: 'bold',
                                textDecoration: 'none',
                                '&:hover': {
                                    color: '#3949ab',
                                },
                            }}
                        >
                            Login here
                        </Link>
                    </Typography>
                </Box>
            </Paper>
        </Box>
    );
};

export default Register; 