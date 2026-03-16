import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import Navbar from './components/Navbar';
import Footer from './components/Footer';
import MainLayout from './layouts/MainLayout';

import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import PlaygroundIndex from './pages/PlaygroundIndex';

function App() {
  const [darkMode, setDarkMode] = useState(true);

  const toggleTheme = () => setDarkMode((prevMode) => !prevMode);

  return (
    <Router>
      <div className={darkMode ? 'dark min-h-screen' : 'min-h-screen'}>
        <Navbar toggleTheme={toggleTheme} />

        <MainLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/playground" element={<PlaygroundIndex />} />
          </Routes>
        </MainLayout>

        <Footer />
      </div>
    </Router>
  );
}

export default App;