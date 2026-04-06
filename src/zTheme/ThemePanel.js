import React from 'react';
import themePresets from './themePresets';

export default function ThemePanel({ theme = 'rainbow', children, className = '', style = {}, ...rest }) {
    const t = themePresets[theme] || themePresets.rainbow;
    const panelStyle = {
        borderRadius: '0.5rem',
        padding: '1rem',
        background: 'transparent',
        boxShadow: `0 0 0 1px rgba(255,255,255,0.02), 0 8px 20px rgba(2,6,23,0.3)`,
        position: 'relative',
        overflow: 'hidden'
    };

    const glow = {
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        backgroundImage: t.bg,
        opacity: 0.12,
        filter: 'blur(12px) saturate(140%)',
        pointerEvents: 'none'
    };

    return (
        <div {...rest} className={`relative ${className}`} style={{ ...panelStyle, ...style }}>
            <div aria-hidden style={glow} />
            <div style={{ position: 'relative', zIndex: 2 }}>{children}</div>
        </div>
    );
}
