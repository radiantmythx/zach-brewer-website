import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar({ toggleTheme }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-gradient-to-r from-blue-600 to-teal-400 text-white shadow-lg backdrop-blur-sm/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-6">
            <Link to="/" className="text-2xl font-extrabold tracking-tight hover:opacity-95 transition">Zach Brewer</Link>
            <nav className="hidden md:flex space-x-4">
              <Link to="/" className="px-3 py-2 rounded-md hover:bg-white/10 transition">Home</Link>
              <Link to="/playground" className="px-3 py-2 rounded-md hover:bg-white/10 transition">Playground</Link>
              <Link to="/about" className="px-3 py-2 rounded-md hover:bg-white/10 transition">About</Link>
              <Link to="/projects" className="px-3 py-2 rounded-md hover:bg-white/10 transition">Projects</Link>
              <Link to="/contact" className="px-3 py-2 rounded-md hover:bg-white/10 transition">Contact</Link>
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={toggleTheme} className="hidden sm:inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 transition ring-1 ring-white/10">Toggle</button>
            <button onClick={() => setOpen(!open)} className="md:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-white/30">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={open ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
              </svg>
            </button>
          </div>
        </div>
      </div>
      {open && (
        <div className="md:hidden bg-gradient-to-r from-blue-600 to-teal-400 px-4 pb-4">
          <nav className="flex flex-col space-y-2">
            <Link to="/" onClick={() => setOpen(false)} className="block py-2 px-2 rounded-md hover:bg-white/10">Home</Link>
            <Link to="/playground" onClick={() => setOpen(false)} className="block py-2 px-2 rounded-md hover:bg-white/10">Playground</Link>
            <Link to="/about" onClick={() => setOpen(false)} className="block py-2 px-2 rounded-md hover:bg-white/10">About</Link>
            <Link to="/projects" onClick={() => setOpen(false)} className="block py-2 px-2 rounded-md hover:bg-white/10">Projects</Link>
            <Link to="/contact" onClick={() => setOpen(false)} className="block py-2 px-2 rounded-md hover:bg-white/10">Contact</Link>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Navbar;
