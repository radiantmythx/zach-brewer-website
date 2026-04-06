import React from 'react';
import themePresets from './themePresets';
import RainbowButton from '../components/RainbowButton';
import RainbowResetButton from '../components/RainbowResetButton';
import SpaceButton from '../components/SpaceButton';

export default function ThemeButton({ theme = 'rainbow', variant = 'filled', children, className = '', style = {}, textRainbow = false, ...rest }) {
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
        return (
            <SpaceButton {...rest} className={className} variant={variant}>
                {children}
            </SpaceButton>
        );
    }

    const t = themePresets[theme] || themePresets.rainbow;
    const ringWidth = 1;

    // For border variant add a subtle dark outline so text remains readable on light backgrounds
    const outlineWhenBorder = { WebkitTextStroke: '0.6px rgba(0,0,0,0.72)', textShadow: '-1px -1px 0 rgba(0,0,0,0.45), 1px -1px 0 rgba(0,0,0,0.45), -1px 1px 0 rgba(0,0,0,0.45), 1px 1px 0 rgba(0,0,0,0.45)' };

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

        const textStyle = textRainbow ? { backgroundImage: `conic-gradient(${t.baseColors.join(',')})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', ...outlineWhenBorder } : { ...outlineWhenBorder };

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

    const textStyle = textRainbow ? { backgroundImage: `conic-gradient(${t.baseColors.join(',')})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', ...outlineWhenBorder } : { ...outlineWhenBorder };

    return (
        <button {...rest} className={`inline-block ${className}`} style={{ ...outerStyle, ...style }}>
            <span style={innerStyle}>
                <span style={{ pointerEvents: 'none', ...textStyle }}>{children}</span>
            </span>
        </button>
    );
}
