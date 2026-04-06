import React from 'react';

export default function ThemeAlert({ type = 'info', children, className = '' }) {
    const colors = { info: '#2563eb', success: '#16a34a', warn: '#f59e0b', danger: '#ef4444' };
    const base = { padding: '0.5rem 0.75rem', borderRadius: 6, background: colors[type] || colors.info, color: '#fff' };
    return <div className={className} style={base}>{children}</div>;
}
