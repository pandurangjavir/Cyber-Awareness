import { BrowserRouter as Router, Routes, Route, Navigate, createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider, createTheme } from '@mui/material';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import About from './components/About';
import Contact from './components/Contact';
import Profile from './components/Profile';
import CssBaseline from '@mui/material/CssBaseline';
import Tutorials from './components/Tutorials';
import Tools from './components/Tools';
import SecurityChallenges from './components/SecurityChallenges';
import SecurityResources from './components/SecurityResources';
import QuizGame from './components/games/QuizGame';
import PasswordStrengthGame from './components/games/PasswordStrengthGame';
import PhishingDetectiveGame from './components/games/PhishingDetectiveGame';
import NetworkSecurityGame from './components/games/NetworkSecurityGame';
import SocialEngineeringEscapeGame from './components/games/SocialEngineeringEscapeGame';
import MalwareAnalysisLabGame from './components/games/MalwareAnalysisLabGame';
import UrlScanner from './components/UrlScanner';

// Create theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#1a237e',
    },
    secondary: {
      main: '#f50057',
    },
  },
});

// Create a protected route component
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  return children;
};

// Create a public route component that redirects to dashboard if user is logged in
const PublicRoute = ({ children }) => {
  const { user } = useAuth();
  if (user) return <Navigate to="/dashboard" />;
  return children;
};

// Create router with future flags
const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/dashboard" />,
  },
  {
    path: '/login',
    element: (
      <PublicRoute>
        <Login />
      </PublicRoute>
    ),
  },
  {
    path: '/register',
    element: (
      <PublicRoute>
        <Register />
      </PublicRoute>
    ),
  },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: '/about',
    element: (
      <ProtectedRoute>
        <About />
      </ProtectedRoute>
    ),
  },
  {
    path: '/contact',
    element: (
      <ProtectedRoute>
        <Contact />
      </ProtectedRoute>
    ),
  },
  {
    path: '/profile',
    element: (
      <ProtectedRoute>
        <Profile />
      </ProtectedRoute>
    ),
  },
  {
    path: '/tutorials',
    element: <Tutorials />,
  },
  {
    path: '/tools',
    element: (
      <ProtectedRoute>
        <Tools />
      </ProtectedRoute>
    ),
  },
  {
    path: '/challenges',
    element: (
      <ProtectedRoute>
        <SecurityChallenges />
      </ProtectedRoute>
    ),
  },
  {
    path: '/resources',
    element: (
      <ProtectedRoute>
        <SecurityResources />
      </ProtectedRoute>
    ),
  },
  {
    path: '/quiz',
    element: (
      <ProtectedRoute>
        <QuizGame />
      </ProtectedRoute>
    ),
  },
  {
    path: '/games/password-strength',
    element: (
      <ProtectedRoute>
        <PasswordStrengthGame />
      </ProtectedRoute>
    ),
  },
  {
    path: '/games/phishing-detective',
    element: (
      <ProtectedRoute>
        <PhishingDetectiveGame />
      </ProtectedRoute>
    ),
  },
  {
    path: '/games/network-security',
    element: (
      <ProtectedRoute>
        <NetworkSecurityGame />
      </ProtectedRoute>
    ),
  },
  {
    path: '/games/social-engineering-escape',
    element: (
      <ProtectedRoute>
        <SocialEngineeringEscapeGame />
      </ProtectedRoute>
    ),
  },
  {
    path: '/games/malware-analysis-lab',
    element: (
      <ProtectedRoute>
        <MalwareAnalysisLabGame />
      </ProtectedRoute>
    ),
  },
  {
    path: '/url-scanner',
    element: (
      <ProtectedRoute>
        <UrlScanner />
      </ProtectedRoute>
    ),
  },
], {
  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true,
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
