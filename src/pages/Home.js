import React from 'react';

function Home() {
  return (
    <div className="px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <section className="relative text-center mt-8 p-8 rounded-2xl panel">
          <img src="/sitephoto.png" alt="Zachary Brewer" className="w-28 h-28 rounded-full mx-auto mb-4 ring-4 ring-white/60 dark:ring-black/60" />
          <h1 className="text-4xl font-extrabold tracking-tight">Zachary Brewer</h1>
          <div className="mt-3 text-xl text-gray-700 dark:text-gray-300 min-w-[220px] mx-auto">
            <span className="font-medium">Automation Engineer 💻 · Software Developer 🚀 · Tech Enthusiast 🌐</span>
          </div>
          <p className="mt-4 text-gray-700 dark:text-gray-300">Welcome to my portfolio — concise, fast, and mobile-first.</p>

          <div className="flex flex-col sm:flex-row justify-center gap-3 mt-6">
            <a href="/projects" className="inline-block px-6 py-3 rounded-full text-white bg-gradient-to-r from-indigo-600 to-teal-400 shadow-lg transform transition hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-300">View Projects</a>
            <a href="/contact" className="inline-block px-6 py-3 rounded-full text-indigo-700 bg-white/80 dark:bg-white/5 dark:text-white border border-white/20 backdrop-blur-sm hover:brightness-95 transition">Contact Me</a>
          </div>

          <div className="flex justify-center gap-6 mt-6 text-gray-700 dark:text-gray-200">
            <a href="https://github.com/radiantmythx" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:scale-110 transition transform">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 .5C5.7.5.7 5.5.7 11.8c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.3.8-.6v-2.1c-3.2.7-3.9-1.4-3.9-1.4-.5-1.2-1.2-1.6-1.2-1.6-1-.7.1-.7.1-.7 1.1.1 1.7 1.1 1.7 1.1 1 .1 1.6.8 1.6.8.9 1.6 2.4 1.1 3 .8.1-.7.4-1.1.7-1.3-2.6-.3-5.3-1.3-5.3-5.8 0-1.3.5-2.4 1.2-3.3-.1-.3-.5-1.7.1-3.5 0 0 1-.3 3.4 1.2 1-.3 2-.4 3-.4s2 .1 3 .4c2.4-1.5 3.4-1.2 3.4-1.2.6 1.8.2 3.2.1 3.5.8.9 1.2 2 1.2 3.3 0 4.5-2.7 5.5-5.3 5.8.4.4.8 1 .8 2v3c0 .4.2.7.8.6 4.6-1.5 7.9-5.8 7.9-10.9C23.3 5.5 18.3.5 12 .5z" /></svg>
            </a>
            <a href="https://www.linkedin.com/in/zachary-brewer-88653269" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:scale-110 transition transform">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M4.98 3.5C4.98 4.88 3.86 6 2.48 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM0 8h5v16H0V8zm7.5 0h4.8v2.2h.1c.7-1.3 2.4-2.6 4.9-2.6 5.2 0 6.1 3.4 6.1 7.8V24h-5V15.5c0-2.1 0-4.8-2.9-4.8-2.9 0-3.3 2.3-3.3 4.6V24h-5V8z" /></svg>
            </a>
            <a href="mailto:zachary.brewer.spammyass@gmail.com" aria-label="Email" className="hover:scale-110 transition transform">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 13.5L0 6V18c0 1.1.9 2 2 2h20c1.1 0 2-.9 2-2V6l-12 7.5zM12 11L24 3H0l12 8z" /></svg>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Home;