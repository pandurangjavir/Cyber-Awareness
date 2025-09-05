import { useState } from 'react';
import {
    Box,
    Container,
    Typography,
    Paper,
    TextField,
    Button,
    Grid,
    CircularProgress,
    Alert
} from '@mui/material';
import Header from './Header';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess(false);

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            setSuccess(true);
            setFormData({ name: '', email: '', subject: '', message: '' });
        } catch (err) {
            setError('Failed to send message. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const contactInfo = [
        {
            icon: <EmailIcon sx={{ fontSize: 40 }} />,
            title: 'Email',
            content: 'info@cyberawareness.com'
        },
        {
            icon: <PhoneIcon sx={{ fontSize: 40 }} />,
            title: 'Phone',
            content: '(123) 456-7890'
        },
        {
            icon: <LocationOnIcon sx={{ fontSize: 40 }} />,
            title: 'Address',
            content: '123 Security St, Cyber City'
        }
    ];

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header />
            <Box component="main" sx={{ flexGrow: 1, bgcolor: '#f5f5f5' }}>
                {/* Hero Section */}
                <Box
                    sx={{
                        backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        height: '400px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        textAlign: 'center',
                        position: 'relative'
                    }}
                >
                    <Container maxWidth="md">
                        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
                            Contact Us
                        </Typography>
                        <Typography variant="h6">
                            Have questions? We're here to help.
                        </Typography>
                    </Container>
                </Box>

                {/* Main Content */}
                <Container maxWidth="xl" sx={{ py: 8 }}>
                    <Grid container spacing={6}>
                        {/* Contact Form */}
                        <Grid item xs={12} md={8}>
                            <Paper
                                elevation={3}
                                sx={{
                                    p: 6,
                                    borderRadius: 2,
                                    background: 'linear-gradient(135deg, #ffffff 0%, #f5f5f5 100%)'
                                }}
                            >
                                <Typography variant="h4" component="h2" gutterBottom sx={{ mb: 4, color: '#1a237e' }}>
                                    Send Us a Message
                                </Typography>
                                {success && (
                                    <Alert severity="success" sx={{ mb: 3 }}>
                                        Your message has been sent successfully!
                                    </Alert>
                                )}
                                {error && (
                                    <Alert severity="error" sx={{ mb: 3 }}>
                                        {error}
                                    </Alert>
                                )}
                                <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                fullWidth
                                                label="Name"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
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
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                fullWidth
                                                label="Email"
                                                name="email"
                                                type="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
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
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                label="Subject"
                                                name="subject"
                                                value={formData.subject}
                                                onChange={handleChange}
                                                required
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
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                label="Message"
                                                name="message"
                                                multiline
                                                rows={4}
                                                value={formData.message}
                                                onChange={handleChange}
                                                required
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
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Button
                                                type="submit"
                                                variant="contained"
                                                disabled={loading}
                                                sx={{
                                                    py: 1.5,
                                                    px: 4,
                                                    background: 'linear-gradient(45deg, #1a237e 30%, #3949ab 90%)',
                                                    '&:hover': {
                                                        background: 'linear-gradient(45deg, #3949ab 30%, #1a237e 90%)',
                                                    },
                                                }}
                                            >
                                                {loading ? <CircularProgress size={24} color="inherit" /> : 'Send Message'}
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Paper>
                        </Grid>

                        {/* Contact Information */}
                        <Grid item xs={12} md={4}>
                            <Paper
                                elevation={3}
                                sx={{
                                    p: 4,
                                    height: '100%',
                                    borderRadius: 2,
                                    background: 'linear-gradient(135deg, #1a237e 0%, #3949ab 100%)',
                                    color: 'white'
                                }}
                            >
                                <Typography variant="h4" component="h2" gutterBottom sx={{ mb: 4 }}>
                                    Contact Information
                                </Typography>
                                <Grid container spacing={3}>
                                    {contactInfo.map((info, index) => (
                                        <Grid item xs={12} key={index}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                <Box sx={{ color: 'white' }}>
                                                    {info.icon}
                                                </Box>
                                                <Box>
                                                    <Typography variant="h6" gutterBottom>
                                                        {info.title}
                                                    </Typography>
                                                    <Typography variant="body1">
                                                        {info.content}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </Grid>
                                    ))}
                                </Grid>
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* Footer */}
            <Box
                component="footer"
                sx={{
                    py: 6,
                    px: 2,
                    mt: 'auto',
                    backgroundColor: '#1a237e',
                    color: 'white'
                }}
            >
                <Container maxWidth="xl">
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={4}>
                            <Typography variant="h6" gutterBottom>
                                Cyber Awareness Training
                            </Typography>
                            <Typography variant="body2">
                                Empowering individuals and organizations with cybersecurity knowledge.
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Typography variant="h6" gutterBottom>
                                Quick Links
                            </Typography>
                            <Typography variant="body2" component="div">
                                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                    <Button color="inherit" href="/dashboard">Home</Button>
                                    <Button color="inherit" href="/about">About</Button>
                                    <Button color="inherit" href="/contact">Contact</Button>
                                </Box>
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Typography variant="h6" gutterBottom>
                                Contact Info
                            </Typography>
                            <Typography variant="body2">
                                Email: info@cyberawareness.com<br />
                                Phone: (123) 456-7890<br />
                                Address: 123 Security St, Cyber City
                            </Typography>
                        </Grid>
                    </Grid>
                    <Box sx={{ mt: 4, pt: 2, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                        <Typography variant="body2" align="center">
                            © {new Date().getFullYear()} Cyber Awareness Training. All rights reserved.
                        </Typography>
                    </Box>
                </Container>
            </Box>
        </Box>
    );
};

export default Contact; 