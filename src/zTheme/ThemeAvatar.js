import React from 'react';
import themePresets from './themePresets';

export default function ThemeAvatar({ theme = 'rainbow', src, alt = '', size = 40, className = '', style = {} }) {
    const t = themePresets[theme] || themePresets.rainbow;
    const base = { width: size, height: size, borderRadius: '999px', background: t.baseColors[0], display: 'inline-block', overflow: 'hidden' };
    return (
        <div className={className} style={{ ...base, ...style }}>
            {src ? <img src={src} alt={alt} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : null}
        </div>
    );
}
