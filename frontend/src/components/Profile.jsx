import {
    Box,
    Container,
    Typography,
    Paper,
    Grid,
    Avatar,
    Button,
    IconButton,
    Divider,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Chip,
    useTheme,
    useMediaQuery,
    AppBar,
    Toolbar
} from '@mui/material';
import { styled } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import SecurityIcon from '@mui/icons-material/Security';
import SchoolIcon from '@mui/icons-material/School';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsIcon from '@mui/icons-material/Notifications';
import HelpIcon from '@mui/icons-material/Help';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useAuth } from '../context/AuthContext';
import '../css/Profile.css';
import { useNavigate } from 'react-router-dom';

const ProfileCard = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(4),
    borderRadius: '20px',
    background: 'rgba(255, 255, 255, 0.95)',
    boxShadow: '0 8px 32px rgba(60,72,88,0.18)',
    transition: 'transform 0.3s ease-in-out',
    width: '100%',
    boxSizing: 'border-box',
    '&:hover': {
        transform: 'translateY(-8px)',
        boxShadow: '0 12px 24px rgba(60,72,88,0.25)',
    },
}));

const StatCard = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    textAlign: 'center',
    borderRadius: '16px',
    background: 'rgba(255, 255, 255, 0.95)',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 24px rgba(60,72,88,0.10)',
    width: '100%',
    boxSizing: 'border-box',
    '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: '0 8px 32px rgba(60,72,88,0.16)',
    },
}));

const StyledAppBar = styled(AppBar)(({ theme }) => ({
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    boxShadow: 'none',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
}));

const Profile = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const stats = [
        {
            icon: <SecurityIcon sx={{ fontSize: 40, color: '#304ffe' }} />,
            value: '85%',
            label: 'Security Score'
        },
        {
            icon: <SchoolIcon sx={{ fontSize: 40, color: '#304ffe' }} />,
            value: '24',
            label: 'Courses Completed'
        },
        {
            icon: <EmojiEventsIcon sx={{ fontSize: 40, color: '#304ffe' }} />,
            value: '12',
            label: 'Achievements'
        }
    ];

    const menuItems = [
        {
            icon: <SettingsIcon />,
            text: 'Account Settings',
            action: '/settings'
        },
        {
            icon: <NotificationsIcon />,
            text: 'Notification Preferences',
            action: '/notifications'
        },
        {
            icon: <HelpIcon />,
            text: 'Help & Support',
            action: '/help'
        },
        {
            icon: <LogoutIcon />,
            text: 'Logout',
            action: () => {
                logout();
                navigate('/login');
            }
        }
    ];

    return (
        <Box 
            className="profile-container" 
            sx={{ 
                width: '100vw',
                margin: 0,
                padding: 0,
                boxSizing: 'border-box',
                overflowX: 'hidden'
            }}
        >
            <Container 
                maxWidth={false} 
                sx={{ 
                    width: '100%',
                    maxWidth: '100%',
                    padding: { xs: 2, sm: 3, md: 4 },
                    margin: 0
                }}
            >
                <Grid container spacing={4}>
                    {/* Profile Info Card */}
                    <Grid item xs={12} md={4}>
                        <ProfileCard>
                            <Box className="profile-header">
                                <Avatar
                                    sx={{
                                        width: 120,
                                        height: 120,
                                        border: '4px solid #304ffe',
                                        marginBottom: 2,
                                        bgcolor: '#304ffe'
                                    }}
                                >
                                    {user?.name?.[0]?.toUpperCase() || <AccountCircleIcon />}
                                </Avatar>
                                <Typography variant="h5" gutterBottom sx={{ color: '#1a237e', fontWeight: 'bold' }}>
                                    {user?.name || 'User Name'}
                                </Typography>
                                <Typography variant="body1" color="text.secondary" gutterBottom>
                                    {user?.email || 'user@example.com'}
                                </Typography>
                                <Box className="profile-badges">
                                    <Chip
                                        label="Pro Member"
                                        color="primary"
                                        size="small"
                                        sx={{ 
                                            mr: 1,
                                            background: 'linear-gradient(90deg, #304ffe 60%, #1a237e 100%)',
                                            color: 'white'
                                        }}
                                    />
                                    <Chip
                                        label="Verified"
                                        color="success"
                                        size="small"
                                        sx={{ 
                                            background: 'linear-gradient(90deg, #00c853 60%, #2e7d32 100%)',
                                            color: 'white'
                                        }}
                                    />
                                </Box>
                                <Button
                                    variant="contained"
                                    startIcon={<EditIcon />}
                                    sx={{ 
                                        mt: 2,
                                        background: 'linear-gradient(90deg, #304ffe 60%, #1a237e 100%)',
                                        '&:hover': {
                                            background: 'linear-gradient(90deg, #1a237e 60%, #304ffe 100%)',
                                        },
                                    }}
                                >
                                    Edit Profile
                                </Button>
                            </Box>
                        </ProfileCard>
                    </Grid>

                    {/* Stats Section */}
                    <Grid item xs={12} md={8}>
                        <Grid container spacing={3}>
                            {stats.map((stat, index) => (
                                <Grid item xs={12} sm={4} key={index}>
                                    <StatCard>
                                        {stat.icon}
                                        <Typography variant="h4" className="stat-value">
                                            {stat.value}
                                        </Typography>
                                        <Typography variant="body1" color="text.secondary">
                                            {stat.label}
                                        </Typography>
                                    </StatCard>
                                </Grid>
                            ))}
                        </Grid>

                        {/* Menu Section */}
                        <ProfileCard sx={{ mt: 3 }}>
                            <Typography variant="h6" gutterBottom sx={{ color: '#1a237e', fontWeight: 'bold' }}>
                                Account Menu
                            </Typography>
                            <Divider sx={{ mb: 2, borderColor: 'rgba(0,0,0,0.1)' }} />
                            <List>
                                {menuItems.map((item, index) => (
                                    <ListItem
                                        key={index}
                                        button
                                        onClick={typeof item.action === 'function' ? item.action : () => navigate(item.action)}
                                        className="menu-item"
                                    >
                                        <ListItemIcon>
                                            {item.icon}
                                        </ListItemIcon>
                                        <ListItemText 
                                            primary={item.text}
                                            primaryTypographyProps={{
                                                color: '#1a237e',
                                                fontWeight: 'medium'
                                            }}
                                        />
                                    </ListItem>
                                ))}
                            </List>
                        </ProfileCard>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default Profile; 