import React from 'react';
import themePresets from './themePresets';

export default function ThemeInput({ theme = 'rainbow', className = '', style = {}, ...rest }) {
    const t = themePresets[theme] || themePresets.rainbow;
    const base = { padding: '0.5rem 0.75rem', borderRadius: '0.375rem', border: '1px solid rgba(255,255,255,0.06)', background: 'transparent', color: '#fff' };
    return <input {...rest} className={className} style={{ ...base, ...style }} />;
}
