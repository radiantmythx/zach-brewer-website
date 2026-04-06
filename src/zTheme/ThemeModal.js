import React from 'react';

export default function ThemeModal({ open = false, children, onClose = () => { }, className = '', style = {} }) {
    if (!open) return null;
    const backdrop = { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' };
    const panel = { background: '#0b1220', padding: '1rem', borderRadius: '0.5rem', minWidth: 320 };
    return (
        <div style={backdrop} onClick={onClose}>
            <div style={panel} className={className} onClick={(e) => e.stopPropagation()}>{children}</div>
        </div>
    );
}
