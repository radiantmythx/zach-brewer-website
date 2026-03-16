import React from 'react';

export default function SpaceButton({ children, className = '', ...rest }) {
    return (
        <button
            {...rest}
            className={`relative overflow-hidden rounded-lg px-4 py-2 inline-flex items-center gap-2 bg-gradient-to-br from-indigo-700 via-indigo-900 to-black text-white shadow-lg ${className}`}
        >
            <span className="absolute -inset-1 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.08),transparent),radial-gradient(circle_at_80%_80%,rgba(255,255,255,0.03),transparent)] opacity-90 pointer-events-none" />
            <span className="relative z-10 font-semibold">{children}</span>
        </button>
    );
}
