import React from 'react';
import themePresets from './themePresets';

export default function ThemeSelect({ theme = 'rainbow', className = '', style = {}, children, ...rest }) {
    const t = themePresets[theme] || themePresets.rainbow;
    const base = { padding: '0.5rem', borderRadius: '0.375rem', border: '1px solid rgba(255,255,255,0.06)', background: 'transparent', color: '#fff' };
    return <select {...rest} className={className} style={{ ...base, ...style }}>{children}</select>;
}
