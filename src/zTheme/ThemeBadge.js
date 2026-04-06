import React from 'react';
import themePresets from './themePresets';

export default function ThemeBadge({ theme = 'rainbow', children, className = '', style = {} }) {
    const t = themePresets[theme] || themePresets.rainbow;
    const base = {
        display: 'inline-block',
        padding: '0.25rem 0.5rem',
        borderRadius: '999px',
        background: t.baseColors[0],
        color: '#fff',
        fontSize: '0.75rem'
    };
    return <span className={`${className}`} style={{ ...base, ...style }}>{children}</span>;
}
