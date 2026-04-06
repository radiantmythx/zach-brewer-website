import React from 'react';

export default function ThemeTooltip({ children, text, className = '', style = {} }) {
    const wrap = { position: 'relative', display: 'inline-block' };
    const tip = { position: 'absolute', bottom: 'calc(100% + 6px)', left: '50%', transform: 'translateX(-50%)', padding: '6px 8px', background: 'rgba(0,0,0,0.8)', color: '#fff', borderRadius: 6, fontSize: '0.75rem', whiteSpace: 'nowrap' };
    return (
        <span className={className} style={{ ...wrap, ...style }}>
            {children}
            {text ? <span aria-hidden style={tip}>{text}</span> : null}
        </span>
    );
}
