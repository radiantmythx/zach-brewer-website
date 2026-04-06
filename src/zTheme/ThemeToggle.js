import React from 'react';

export default function ThemeToggle({ checked = false, onChange = () => { }, className = '', style = {} }) {
    const base = { width: 48, height: 28, borderRadius: 999, padding: 4, display: 'inline-flex', alignItems: 'center', background: checked ? '#06b6d4' : 'rgba(255,255,255,0.08)', cursor: 'pointer' };
    const knob = { width: 20, height: 20, borderRadius: 999, background: '#fff', transform: `translateX(${checked ? 20 : 0}px)`, transition: 'transform 150ms' };
    return (
        <div role="switch" aria-checked={checked} onClick={() => onChange(!checked)} className={className} style={{ ...base, ...style }}>
            <div style={knob} />
        </div>
    );
}
