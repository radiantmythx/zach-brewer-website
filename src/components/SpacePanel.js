import React from 'react';

export default function SpacePanel({ children, className = '' }) {
    return (
        <div className={`rounded-lg p-6 bg-gradient-to-br from-gray-900/70 to-black/60 border border-white/5 shadow-xl ${className}`}>
            {children}
        </div>
    );
}
