import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { 
  Container,
  Box,
  Typography,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Avatar,
  CssBaseline,
  Paper,
  Alert,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider
} from '@mui/material';
import LockOutlined
LibraryBooksIcon,
    CalendarTodayIcon,
    HelpOutlineIcon,
    SchoolIcon,
from '@mui/icons-material/LockOutlined';

export default function Login() {
  const [credentials, setCredentials] = useState({
    identifier: '',
    password: ''
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [showMaintenanceBanner, setShowMaintenanceBanner] = useState(true);
  const navigate = useNavigate();

  // Mock maintenance schedule (you can fetch this from your backend)
  const maintenanceSchedule = {
    active: true,
    message: 'System maintenance scheduled for Saturday, 10:00 PM - 2:00 AM',
    date: '2023-10-28'
  };

  const quickLinks = [
    { icon: <SchoolIcon />, text: 'Academic Calendar', url: '#' },
    { icon: <LibraryBooksIcon />, text: 'Library Resources', url: '#' },
    { icon: <CalendarTodayIcon />, text: 'Event Calendar', url: '#' },
    { icon: <HelpOutlineIcon />, text: 'Student Support', url: '#' }
  ];

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    // ... existing login logic
  };

    <><Container component="main" maxWidth="md">
        <CssBaseline />
        <Box sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: 4,
            mt: 4
        }}>
            {/* Left Column - Login Form */}
            <Paper elevation={3} sx={{ p: 4 }}>
                {maintenanceSchedule.active && showMaintenanceBanner && (
                    <Alert
                        severity="info"
                        onClose={() => setShowMaintenanceBanner(false)}
                        sx={{ mb: 2 }}
                    >
                        {maintenanceSchedule.message}
                    </Alert>
                )}

                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main', width: 80, height: 80 }}>
                        <img src="/school-logo.png" alt="School Logo" style={{ width: '100%' }} />
                    </Avatar>

                    <Typography component="h1" variant="h4" sx={{ mt: 2, fontWeight: 'bold' }}>
                        Welcome to Vivace Music School Kenya Portal
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 2 }}>
                        "Empowering Minds, Shaping Futures"
                    </Typography>

                    <Box component="form" onSubmit={handleLogin} sx={{ mt: 1, width: '100%' }}>
                        {/* ... existing form fields ... */}
                    </Box>
                </Box>
            </Paper>

            {/* Right Column - Quick Links and Information */}
            <Paper elevation={3} sx={{ p: 4 }}>
                <Typography variant="h6" gutterBottom>
                    Quick Access Links
                </Typography>
                <List>
                    {quickLinks.map((link, index) => (
                        <div key={link.text}>
                            <ListItem button component="a" href={link.url}>
                                <ListItemIcon sx={{ color: 'primary.main' }}>
                                    {link.icon}
                                </ListItemIcon>
                                <ListItemText primary={link.text} />
                            </ListItem>
                            {index < quickLinks.length - 1 && <Divider />}
                        </div>
                    ))}
                </List>

                <Box sx={{ mt: 4 }}>
                    <Typography variant="h6" gutterBottom>
                        Important Announcements
                    </Typography>
                    <Box sx={{
                        backgroundColor: '#f5f5f5',
                        p: 2,
                        borderRadius: 1
                    }}>
                        <Typography variant="body2">
                            • The Feb-May 2025 cohort begins on 3rd January 2025
                        </Typography>
                        <Typography variant="body2">
                            • You are kindly reminded to pay your subscription fees on time to streamline our activities.
                        </Typography>
                        <Typography variant="body2">
                            • New library resources available
                        </Typography>
                    </Box>
                </Box>

                <Box sx={{ mt: 4, textAlign: 'center' }}>
                    <Typography variant="body2" color="text.secondary">
                        Need help? Contact vivacemusicke@gmail.com
                    </Typography>
                </Box>
            </Paper>
        </Box>
    </Container><Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                {/* School Logo */}
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main', width: 60, height: 60 }}>
                    <img src="/school-logo.png" alt="School Logo" style={{ width: '100%' }} />
                </Avatar>

                <Typography component="h1" variant="h5" sx={{ mt: 2 }}>
                    Hi, Welcome Back
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Please fill in your details to log in
                </Typography>

                <Box component="form" onSubmit={handleLogin} sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="identifier"
                        label="Username / Student No / Employee No"
                        name="identifier"
                        autoComplete="username"
                        autoFocus
                        value={credentials.identifier}
                        onChange={(e) => setCredentials({ ...credentials, identifier: e.target.value })} />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={credentials.password}
                        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })} />
                    <FormControlLabel
                        control={<Checkbox
                            value="remember"
                            color="primary"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)} />}
                        label="Remember me" />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="#" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container></>
    
}