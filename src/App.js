import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Contact from './pages/Contact';

function Footer({ toggleTheme }) {
  return (
    <Box
      sx={{
        textAlign: 'center',
        padding: 3,
        backgroundColor: 'background.default',
        color: 'text.primary',
        marginTop: 8,
      }}
    >
      <Typography variant="body2" sx={{ marginBottom: 2 }}>
        © {new Date().getFullYear()} Zachary Brewer. All rights reserved.
      </Typography>
    </Box>
  );
}

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);

  const lightTheme = createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: '#1976d2',
      },
    },
  });

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#90caf9',
      },
    },
  });

  const toggleTheme = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <Router>
        <div className="App">
          <AppBar position="sticky" color="primary" elevation={4}>
            <Toolbar>
              <Button color="inherit" component={Link} to="/">Home</Button>
              <Button color="inherit" component={Link} to="/about">About</Button>
              <Button color="inherit" component={Link} to="/projects">Projects</Button>
              <Button color="inherit" component={Link} to="/contact">Contact</Button>
              {/* Spacer to push the theme toggle button to the right */}
              <Box sx={{ flexGrow: 1 }} />

              {/* Applications Dropdown */}
              <Button
                color="inherit"
                onClick={handleMenuOpen}
              >
                Applications
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem
                  component={Link}
                  to="/applications/diceroller"
                  onClick={handleMenuClose}
                >
                  Dice Rolling Simulator (Desktop)
                </MenuItem>
              </Menu>

              <Button variant="inherit" onClick={toggleTheme}>
                Toggle Theme
              </Button>
            </Toolbar>
          </AppBar>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
            <Route
              path="/applications/diceroller"
              element={
                <Box sx={{ height: '100vh', width: '100%' }}>
                  <iframe
                    src="/dice-roller-app/DiceRoller.html"
                    title="Dice Roller Simulator"
                    style={{ border: 'none', width: '100%', height: '100%' }}
                  />
                </Box>
              }
            />
          </Routes>

          <Footer toggleTheme={toggleTheme} />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;