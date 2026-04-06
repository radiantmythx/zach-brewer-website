import React from 'react';
import ThemeButton from './ThemeButton';
import themePresets from './themePresets';

export default function ThemeCard({ theme = 'rainbow', title = 'Card', children, className = '', style = {}, ...rest }) {
    const t = themePresets[theme] || themePresets.rainbow;
    return (
        <div {...rest} className={`p-4 rounded-md ${className}`} style={{ background: 'rgba(255,255,255,0.02)', borderRadius: '0.5rem', ...style }}>
            <div className="flex items-center justify-between">
                <div>
                    <div className="text-sm font-semibold">{title}</div>
                    <div className="text-xs text-gray-400">{t.name} example</div>
                </div>
                <ThemeButton theme={theme}>Action</ThemeButton>
            </div>
            <div className="mt-3 text-sm">{children}</div>
        </div>
    );
}
