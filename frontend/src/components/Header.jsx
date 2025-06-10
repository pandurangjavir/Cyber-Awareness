import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
    AppBar,
    Box,
    Toolbar,
    Typography,
    Button,
    IconButton,
    Menu,
    MenuItem,
    Container,
    Avatar,
    Stack
} from '@mui/material';
import SecurityIcon from '@mui/icons-material/Security';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Header = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
        handleClose();
    };

    const handleProfile = () => {
        navigate('/profile');
        handleClose();
    };

    return (
        <AppBar position="static" sx={{ backgroundColor: '#1a237e' }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <SecurityIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        CYBER AWARENESS
                    </Typography>

                    <Box sx={{ flexGrow: 1 }} />

                    <Stack direction="row" spacing={2} alignItems="center">
                        <Button
                            onClick={() => navigate('/dashboard')}
                            sx={{ color: 'white' }}
                        >
                            Home
                        </Button>
                        <Button
                            onClick={() => navigate('/about')}
                            sx={{ color: 'white' }}
                        >
                            About
                        </Button>
                        <Button
                            onClick={() => navigate('/contact')}
                            sx={{ color: 'white' }}
                        >
                            Contact
                        </Button>
                        <IconButton
                            onClick={handleMenu}
                            sx={{ p: 0 }}
                        >
                            <Avatar sx={{ bgcolor: 'secondary.main' }}>
                                <AccountCircleIcon />
                            </Avatar>
                        </IconButton>
                    </Stack>

                    <Menu
                        sx={{ mt: '45px' }}
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleProfile}>
                            <Typography textAlign="center">Profile</Typography>
                        </MenuItem>
                        <MenuItem onClick={handleLogout}>
                            <Typography textAlign="center">Logout</Typography>
                        </MenuItem>
                    </Menu>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Header; 