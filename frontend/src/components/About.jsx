import {
    Box,
    Container,
    Typography,
    Paper,
    Grid,
    Card,
    CardContent,
    Avatar,
    useTheme,
    useMediaQuery,
    Fade,
    Zoom,
    Slide,
    Button
} from '@mui/material';
import { styled } from '@mui/material/styles';
import SecurityIcon from '@mui/icons-material/Security';
import SchoolIcon from '@mui/icons-material/School';
import CodeIcon from '@mui/icons-material/Code';
import PeopleIcon from '@mui/icons-material/People';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import '../css/About.css';

const StyledCard = styled(Card)(({ theme }) => ({
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
    '&:hover': {
        transform: 'translateY(-8px)',
        boxShadow: theme.shadows[8],
    },
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
    width: 80,
    height: 80,
    margin: '0 auto 16px',
    backgroundColor: theme.palette.primary.main,
}));

const About = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const features = [
        {
            icon: <SecurityIcon />,
            title: 'Interactive Learning',
            description: 'Engage with hands-on security challenges and real-world scenarios.'
        },
        {
            icon: <SchoolIcon />,
            title: 'Comprehensive Curriculum',
            description: 'Learn from beginner to advanced security concepts with structured lessons.'
        },
        {
            icon: <CodeIcon />,
            title: 'Practical Tools',
            description: 'Access a suite of security tools and resources for practical application.'
        },
        {
            icon: <PeopleIcon />,
            title: 'Community Support',
            description: 'Join a community of security enthusiasts and professionals.'
        }
    ];

    const stats = [
        {
            icon: <EmojiEventsIcon />,
            value: '1000+',
            label: 'Challenges Completed'
        },
        {
            icon: <SchoolIcon />,
            value: '500+',
            label: 'Active Learners'
        },
        {
            icon: <TrendingUpIcon />,
            value: '95%',
            label: 'Success Rate'
        }
    ];

    return (
        <Box className="about-container">
            {/* Hero Section */}
            <Box className="hero-section">
                <Container maxWidth="lg">
                    <Box className="hero-content">
                        <Fade in timeout={1000}>
                            <Typography variant="h2" className="hero-title" gutterBottom>
                                Empowering Security Awareness
                            </Typography>
                        </Fade>
                        <Fade in timeout={1500}>
                            <Typography variant="h5" className="hero-subtitle">
                                Learn, Practice, and Master Cybersecurity Skills
                            </Typography>
                        </Fade>
                        <Fade in timeout={2000}>
                            <Box className="hero-buttons">
                                <Button 
                                    variant="contained" 
                                    className="hero-button hero-button-primary"
                                    href="/dashboard"
                                >
                                    Get Started
                                </Button>
                                <Button 
                                    variant="outlined" 
                                    className="hero-button hero-button-secondary"
                                    href="/about"
                                >
                                    Learn More
                                </Button>
                            </Box>
                        </Fade>
                    </Box>
                </Container>
            </Box>

            {/* Features Section */}
            <Container maxWidth="lg" className="features-section">
                <Typography variant="h3" className="section-title" gutterBottom>
                    Why Choose Our Platform?
                </Typography>
                <Grid container spacing={4}>
                    {features.map((feature, index) => (
                        <Grid item xs={12} md={6} key={index}>
                            <Zoom in timeout={1000 + index * 200}>
                                <StyledCard>
                                    <CardContent>
                                        <StyledAvatar>
                                            {feature.icon}
                                        </StyledAvatar>
                                        <Typography variant="h5" gutterBottom>
                                            {feature.title}
                                        </Typography>
                                        <Typography variant="body1" color="text.secondary">
                                            {feature.description}
                                        </Typography>
                                    </CardContent>
                                </StyledCard>
                            </Zoom>
                        </Grid>
                    ))}
                </Grid>
            </Container>

            {/* Stats Section */}
            <Box className="stats-section">
                <Container maxWidth="lg">
                    <Grid container spacing={4}>
                        {stats.map((stat, index) => (
                            <Grid item xs={12} sm={4} key={index}>
                                <Slide direction="up" in timeout={1000 + index * 200}>
                                    <Paper className="stat-card">
                                        <Box className="stat-icon">
                                            {stat.icon}
                                        </Box>
                                        <Typography variant="h3" className="stat-value">
                                            {stat.value}
                                        </Typography>
                                        <Typography variant="h6" className="stat-label">
                                            {stat.label}
                                        </Typography>
                                    </Paper>
                                </Slide>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>

            {/* About Us Section */}
            <Container maxWidth="lg" className="about-section">
                <Paper className="about-paper">
                    <Typography variant="h3" className="section-title" gutterBottom>
                        Our Mission
                    </Typography>
                    <Typography variant="body1" className="mission-text">
                        We are dedicated to making cybersecurity education accessible and engaging for everyone. 
                        Our platform combines interactive learning with practical challenges to help you develop 
                        real-world security skills. Whether you're a beginner or an experienced professional, 
                        we provide the tools and resources you need to stay ahead in the ever-evolving world 
                        of cybersecurity.
                    </Typography>
                </Paper>
            </Container>
        </Box>
    );
};

export default About; 