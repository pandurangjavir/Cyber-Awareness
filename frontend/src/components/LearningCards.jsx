import {
    Box,
    Grid,
    Card,
    CardContent,
    CardActions,
    Typography,
    Button,
    Avatar,
    Chip,
    Divider
} from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import SecurityIcon from '@mui/icons-material/Security';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import BuildIcon from '@mui/icons-material/Build';
import '../css/LearningCards.css';

const LearningCards = () => {
    const cards = [
        {
            icon: <SchoolIcon sx={{ fontSize: 24 }} />,
            title: 'Interactive Learning',
            description: 'Engage with interactive modules and real-world scenarios to enhance your cybersecurity knowledge.',
            features: ['Video Tutorials', 'Interactive Quizzes', 'Real-world Scenarios'],
            color: '#1a237e',
            gradient: 'linear-gradient(45deg, #1a237e 30%, #3949ab 90%)'
        },
        {
            icon: <SecurityIcon sx={{ fontSize: 24 }} />,
            title: 'Security Resources',
            description: 'Access comprehensive resources and guides to stay updated with the latest security practices.',
            features: ['Security Guides', 'Best Practices', 'Industry Standards'],
            color: '#1a237e',
            gradient: 'linear-gradient(45deg, #1a237e 30%, #3949ab 90%)'
        },
        {
            icon: <EmojiEventsIcon sx={{ fontSize: 24 }} />,
            title: 'Security Challenges',
            description: 'Test your skills with practical challenges and earn achievements as you progress.',
            features: ['Hands-on Exercises', 'Progress Tracking', 'Achievement Badges'],
            color: '#1a237e',
            gradient: 'linear-gradient(45deg, #1a237e 30%, #3949ab 90%)'
        }
    ];

    return (
        <Box className="learning-cards-container">
            <Typography variant="h4" className="section-title">
                Learning Paths
            </Typography>
            <Grid container spacing={2} className="learning-cards-grid">
                {cards.map((card, index) => (
                    <Grid key={index} item xs={12} md={4}>
                        <Card className="learning-card">
                            <Box
                                className="card-header"
                                style={{ background: card.gradient }}
                            >
                                <Avatar
                                    className="card-avatar"
                                    style={{ color: card.color }}
                                >
                                    {card.icon}
                                </Avatar>
                                <Typography variant="subtitle1" component="h3" className="card-title">
                                    {card.title}
                                </Typography>
                            </Box>
                            <CardContent>
                                <Typography variant="body1" className="card-description">
                                    {card.description}
                                </Typography>
                                <Divider sx={{ my: 2 }} />
                                <Box className="features-list">
                                    {card.features.map((feature, idx) => (
                                        <Chip
                                            key={idx}
                                            label={feature}
                                            className="feature-chip"
                                            size="small"
                                        />
                                    ))}
                                </Box>
                            </CardContent>
                            <CardActions>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    className="learn-more-btn"
                                >
                                    Learn More
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default LearningCards; 