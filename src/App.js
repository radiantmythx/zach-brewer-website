import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { ThemeProvider, useTheme } from './theme/ThemeContext';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import MainLayout from './layouts/MainLayout';

import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import PlaygroundIndex from './pages/PlaygroundIndex';
import Components from './pages/Components';
import TicTacToe from './pages/playground/TicTacToe';
import Checkers from './pages/playground/Checkers';

import SpaceBackground from './components/backgrounds/SpaceBackground';
import RainbowBackground from './components/backgrounds/RainbowBackground';

function AppInner() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Router>
      <div className={`min-h-screen transition-colors duration-300 ${theme === 'space' ? 'dark text-white bg-gray-900' : 'text-gray-900 bg-white'}`}>
        {theme === 'space' ? <SpaceBackground /> : <RainbowBackground />}

        <Navbar toggleTheme={toggleTheme} />

        <MainLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/playground" element={<PlaygroundIndex />} />
            <Route path="/components" element={<Components />} />
            <Route path="/playground/tictactoe" element={<TicTacToe />} />
            <Route path="/playground/checkers" element={<Checkers />} />
          </Routes>
        </MainLayout>

        <Footer />
      </div>
    </Router>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppInner />
    </ThemeProvider>
  );
}