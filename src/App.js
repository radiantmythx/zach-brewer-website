import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { lightTheme, darkTheme } from './theme';

import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Contact from './pages/Contact';

function App() {
  const [darkMode, setDarkMode] = useState(true);

  const toggleTheme = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <Router>
        <div className="App">
          <Navbar toggleTheme={toggleTheme} />

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