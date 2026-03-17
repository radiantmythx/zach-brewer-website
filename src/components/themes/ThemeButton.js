import React from 'react';
import themePresets from './themePresets';
import RainbowButton from '../RainbowButton';
import RainbowResetButton from '../RainbowResetButton';
import SpaceButton from '../SpaceButton';

export default function ThemeButton({ theme = 'rainbow', variant = 'filled', children, className = '', style = {}, textRainbow = false, ...rest }) {
    // If there's a specialized component for a theme, delegate to it so behavior stays identical.
    if (theme === 'rainbow') {
        if (variant === 'border') {
            return (
                <RainbowResetButton {...rest} className={className} textRainbow={textRainbow}>
                    {children}
                </RainbowResetButton>
            );
        }
        return (
            <RainbowButton {...rest} className={className}>
                {children}
            </RainbowButton>
        );
    }

    if (theme === 'space') {
        // SpaceButton supports variant='border' and other space-specific props like `novas`
        return (
            <SpaceButton {...rest} className={className} variant={variant}>
                {children}
            </SpaceButton>
        );
    }

    // Fallback: use simple themed styles from presets
    const t = themePresets[theme] || themePresets.rainbow;
    const ringWidth = 1;

    if (variant === 'border') {
        const outerStyle = {
            padding: ringWidth,
            borderRadius: '0.5rem',
            background: `conic-gradient(from 0deg, ${t.baseColors.join(',')})`,
            WebkitTapHighlightColor: 'transparent',
            display: 'inline-block',
            boxSizing: 'border-box'
        };
        const innerStyle = {
            display: 'inline-flex',
            alignItems: 'center',
            padding: '0.5rem 1rem',
            borderRadius: `calc(0.375rem - ${ringWidth}px)`,
            background: 'transparent',
            color: '#fff',
            position: 'relative'
        };

        const textStyle = textRainbow ? { backgroundImage: `conic-gradient(${t.baseColors.join(',')})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' } : {};

        return (
            <button {...rest} className={`inline-block ${className}`} style={{ ...outerStyle, ...style }}>
                <span style={{ ...innerStyle }}>
                    <span style={{ pointerEvents: 'none', ...textStyle }}>{children}</span>
                </span>
            </button>
        );
    }

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
        position: 'relative',
        overflow: 'hidden',
        background: 'transparent',
        color: '#fff'
    };

    const textStyle = textRainbow ? { backgroundImage: `conic-gradient(${t.baseColors.join(',')})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' } : {};

    return (
        <button {...rest} className={`inline-block ${className}`} style={{ ...outerStyle, ...style }}>
            <span style={innerStyle}>
                <span style={{ pointerEvents: 'none', ...textStyle }}>{children}</span>
            </span>
        </button>
    );
}
