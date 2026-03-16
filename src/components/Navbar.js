import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar({ toggleTheme }) {
  const [open, setOpen] = useState(false);

  const links = [
    { to: '/', label: 'Home' },
    { to: '/playground', label: 'Playground' },
    { to: '/components', label: 'Components' },
    { to: '/about', label: 'About' },
    { to: '/projects', label: 'Projects' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/30 dark:bg-gray-900/60 border-b border-white/10 dark:border-black/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 via-sky-400 to-teal-400 shadow-lg transform transition hover:scale-105 bloom" />
              <span className="text-xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-teal-300">Zach Brewer</span>
            </Link>

            <nav className="hidden md:flex items-center gap-2">
              {links.map((l, i) => (
                <Link
                  key={l.to}
                  to={l.to}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition transform hover:-translate-y-0.5 hover:scale-105 duration-200 bg-transparent/0 hover:bg-white/6`}
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <button onClick={toggleTheme} aria-label="Toggle theme" className="hidden sm:inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 transition ring-1 ring-white/10">Theme</button>

            <button onClick={() => setOpen(!open)} aria-label="Open menu" className="md:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400/30">
              <svg className="h-6 w-6 text-gray-800 dark:text-gray-100" viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={open ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="md:hidden px-4 pb-4">
          <nav className="flex flex-col space-y-2 mt-2">
            {links.map((l) => (
              <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="block py-2 px-3 rounded-md bg-white/5 hover:bg-white/10 transition">{l.label}</Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

export default Navbar;
