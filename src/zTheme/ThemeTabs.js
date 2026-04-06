import React from 'react';

export default function ThemeTabs({ tabs = [], active = 0, onChange = () => { }, className = '' }) {
    return (
        <div className={className}>
            <div className="flex gap-2">
                {tabs.map((t, i) => (
                    <button key={t} onClick={() => onChange(i)} className={`px-3 py-1 rounded ${i === active ? 'bg-white/10' : ''}`}>{t}</button>
                ))}
            </div>
        </div>
    );
}
