import React from 'react';

export default function Footer() {
  return (
    <footer className="mt-12 bg-gradient-to-r from-white/30 to-sky-50/20 dark:from-black/20 dark:to-gray-900/40 text-center text-gray-600 py-6">
      <div className="max-w-7xl mx-auto px-4">
        <p className="text-sm">© {new Date().getFullYear()} Zachary Brewer. All rights reserved.</p>
      </div>
    </footer>
  );
}
