import React from 'react';
import themePresets from './themePresets';

export default function ThemeButton({ theme = 'rainbow', children, className = '', style = {}, ...rest }) {
    const t = themePresets[theme] || themePresets.rainbow;
    const outerStyle = {
        padding: 1,
        borderRadius: '0.5rem',
        background: `conic-gradient(from 0deg, ${t.baseColors.join(',')})`,
        WebkitTapHighlightColor: 'transparent',
        display: 'inline-block'
    };
    const innerStyle = {
        display: 'inline-flex',
        alignItems: 'center',
        padding: '0.5rem 1rem',
        borderRadius: '0.375rem',
        background: 'transparent',
        color: '#fff'
    };

    return (
        <button {...rest} className={`inline-block ${className}`} style={{ ...outerStyle, ...style }}>
            <span style={innerStyle}>{children}</span>
        </button>
    );
}
