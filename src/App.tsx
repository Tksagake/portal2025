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
import {
  LockOutlinedIcon,
  SchoolIcon,
  AnnouncementIcon,
  LibraryBooksIcon,
  CalendarTodayIcon,
  HelpOutlineIcon
} from '@mui/icons-material';

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

  return (
    <Container component="main" maxWidth="md">
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
              Welcome to Our School Portal
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
                • Mid-term exams begin next week
              </Typography>
              <Typography variant="body2">
                • Scholarship applications now open
              </Typography>
              <Typography variant="body2">
                • New library resources available
              </Typography>
            </Box>
          </Box>

          <Box sx={{ mt: 4, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              Need help? Contact support@school.edu
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}