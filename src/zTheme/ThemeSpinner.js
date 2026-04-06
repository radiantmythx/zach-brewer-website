import React from 'react';

export default function ThemeSpinner({ size = 24, className = '' }) {
    const style = { width: size, height: size, borderRadius: '50%', border: '3px solid rgba(255,255,255,0.08)', borderTopColor: '#fff', animation: 'spin 1s linear infinite' };
    return <div className={className} style={style} />;
}
