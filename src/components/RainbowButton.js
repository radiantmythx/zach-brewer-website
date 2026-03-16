import React, { useRef, useState, useEffect } from 'react';

function hexToRgb(hex) {
    const h = hex.replace('#', '');
    const bigint = parseInt(h.length === 3 ? h.split('').map(c => c + c).join('') : h, 16);
    return { r: (bigint >> 16) & 255, g: (bigint >> 8) & 255, b: bigint & 255 };
}

function rgbToHsl(r, g, b) {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;
    if (max === min) {
        h = s = 0;
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }
    return { h: h * 360, s: s * 100, l: l * 100 };
}

function hslString(h, s, l, a = 1) {
    return `hsla(${Math.round(h)} ${Math.round(s)}% ${Math.round(l)}% / ${a})`;
}

export default function RainbowButton({ children, className = '', pulses = 1, pulseSize = 1, fadeTime = 0.5, ...rest }) {
    const ref = useRef();
    const bgRef = useRef();
    const timers = useRef([]);
    const tRef = useRef(0);
    const targetPos = useRef({ x: 0.5, y: 0.5 });
    const displayPos = useRef({ x: 0.5, y: 0.5 });
    const [hover, setHover] = useState(false);
    const [clicked, setClicked] = useState(false);

    // brighter, more vivid base gradient colors
    const baseColors = ['#ff007f', '#ff8a00', '#00fff6', '#7a2cff', '#ff007f'];

    // compute complementary colors for border-image
    const compColors = baseColors.map((hex) => {
        const { r, g, b } = hexToRgb(hex);
        const { h, s, l } = rgbToHsl(r, g, b);
        const compH = (h + 180) % 360;
        return hslString(compH, Math.max(60, s), Math.min(65, l + 5));
    });

    useEffect(() => {
        let raf = null;
        function step() {
            tRef.current += 0.008; // slow, smooth rotation

            // smooth position lerp
            displayPos.current.x += (targetPos.current.x - displayPos.current.x) * 0.18;
            displayPos.current.y += (targetPos.current.y - displayPos.current.y) * 0.18;

            // update DOM directly for smoothness
            if (bgRef.current) {
                const px = (displayPos.current.x - 0.5) * 12;
                const py = (displayPos.current.y - 0.5) * 12;
                bgRef.current.style.transform = `translate3d(${px}px, ${py}px,0)`;
                const hueShift = Math.floor((tRef.current * 60) % 360);
                bgRef.current.style.backgroundImage = `conic-gradient(from ${hueShift}deg, ${baseColors.join(',')})`;
            }

            raf = requestAnimationFrame(step);
        }
        raf = requestAnimationFrame(step);
        return () => cancelAnimationFrame(raf);
    }, []);

    useEffect(() => {
        return () => timers.current.forEach((id) => clearTimeout(id));
    }, []);

    function handleMove(e) {
        const r = ref.current.getBoundingClientRect();
        targetPos.current = { x: (e.clientX - r.left) / r.width, y: (e.clientY - r.top) / r.height };
    }

    function handleClick(e) {
        // clear previous to ensure consistent pulse
        timers.current.forEach((id) => clearTimeout(id));
        timers.current.length = 0;

        setClicked(true);
        // smaller/faster pulse: clear after 360ms
        const t1 = setTimeout(() => setClicked(false), 360);
        timers.current.push(t1);

        // create global outward pulse
        createBodyPulse();

        if (rest.onClick) rest.onClick(e);
    }

    const hueShift = Math.floor((tRef.current * 60) % 360);

    // choose complementary color nearest to current mouse x position (use displayPos for smoothness)
    const idx = Math.min(baseColors.length - 1, Math.max(0, Math.floor(displayPos.current.x * baseColors.length)));
    const prePulseColor = compColors[idx];

    // Use outer button as a 1px gradient ring by applying the gradient as background and 1px padding.
    // Inner container is clipped and rounded to create a true rounded border effect.
    const outerStyle = {
        padding: 1,
        borderRadius: '0.5rem',
        background: `conic-gradient(from ${hueShift}deg, ${compColors.join(',')})`,
        WebkitTapHighlightColor: 'transparent',
    };

    const innerStyle = {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        paddingLeft: '1rem',
        paddingRight: '1rem',
        paddingTop: '0.5rem',
        paddingBottom: '0.5rem',
        borderRadius: '0.375rem',
        position: 'relative',
        overflow: 'hidden',
        background: 'transparent',
    };

    function createBodyPulse() {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const svgNS = 'http://www.w3.org/2000/svg';
        const fadeMs = Math.max(80, Math.round(fadeTime * 1000));
        const stagger = Math.round(Math.max(8, fadeMs * 0.12));

        for (let p = 0; p < Math.max(1, Math.floor(pulses)); p++) {
            const svg = document.createElementNS(svgNS, 'svg');
            const id = `rbg-${Date.now()}-${p}`;
            const w = rect.width;
            const h = rect.height;
            const strokeW = Math.max(1, Math.round(pulseSize));

            svg.setAttribute('width', String(w));
            svg.setAttribute('height', String(h));
            svg.setAttribute('viewBox', `0 0 ${w} ${h}`);
            svg.style.position = 'fixed';
            svg.style.left = `${cx}px`;
            svg.style.top = `${cy}px`;
            svg.style.transform = 'translate(-50%,-50%) scale(0.99)';
            svg.style.transformOrigin = '50% 50%';
            svg.style.pointerEvents = 'none';
            svg.style.zIndex = '2';
            svg.style.overflow = 'visible';
            svg.style.opacity = '0';

            const defs = document.createElementNS(svgNS, 'defs');
            const grad = document.createElementNS(svgNS, 'linearGradient');
            grad.setAttribute('id', id);
            grad.setAttribute('x1', '0%');
            grad.setAttribute('y1', '0%');
            grad.setAttribute('x2', '100%');
            grad.setAttribute('y2', '0%');

            compColors.forEach((c, i) => {
                const stop = document.createElementNS(svgNS, 'stop');
                stop.setAttribute('offset', `${(i / (compColors.length - 1)) * 100}%`);
                stop.setAttribute('stop-color', c.replace(/\)/, ' / 1)'));
                grad.appendChild(stop);
            });

            defs.appendChild(grad);
            svg.appendChild(defs);

            const rx = Math.min(12, parseFloat(window.getComputedStyle(ref.current).borderRadius) || 8);
            const rectEl = document.createElementNS(svgNS, 'rect');
            const inset = strokeW / 2;
            rectEl.setAttribute('x', String(inset));
            rectEl.setAttribute('y', String(inset));
            rectEl.setAttribute('width', String(Math.max(0, w - strokeW)));
            rectEl.setAttribute('height', String(Math.max(0, h - strokeW)));
            rectEl.setAttribute('rx', String(rx));
            rectEl.setAttribute('ry', String(rx));
            rectEl.setAttribute('fill', 'none');
            rectEl.setAttribute('stroke', `url(#${id})`);
            rectEl.setAttribute('stroke-width', String(strokeW));
            rectEl.setAttribute('stroke-linecap', 'round');
            rectEl.setAttribute('stroke-linejoin', 'round');
            rectEl.setAttribute('opacity', '1');
            rectEl.style.transition = `stroke-opacity ${fadeMs}ms ease, filter ${fadeMs}ms ease, transform ${fadeMs}ms ease`;

            svg.appendChild(rectEl);
            document.body.appendChild(svg);

            // stagger the reveal slightly per pulse for subtle multi-ring effect
            const delay = p * stagger;
            const revealId = setTimeout(() => {
                svg.style.opacity = '1';
                // small outward scale per pulse
                const expandScale = 1 + (0.01 * (p + 1) * Math.max(1, pulseSize));
                svg.style.transform = `translate(-50%,-50%) scale(${expandScale})`;
                rectEl.style.filter = 'blur(6px)';
            }, delay);

            // fade after fadeMs + delay
            const fadeId = setTimeout(() => {
                rectEl.setAttribute('opacity', '0');
                svg.style.opacity = '0';
                svg.style.transform = `translate(-50%,-50%) scale(${1 + (0.02 * (p + 1) * Math.max(1, pulseSize))})`;
                rectEl.style.filter = 'blur(16px)';
            }, fadeMs + delay);

            const removeId = setTimeout(() => {
                if (svg.parentNode) svg.remove();
            }, fadeMs + delay + 220);

            timers.current.push(revealId, fadeId, removeId);
        }
    }

    return (
        <button
            {...rest}
            ref={ref}
            onMouseMove={handleMove}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onClick={handleClick}
            className={`relative inline-flex focus:outline-none transition-all duration-200 ${className}`}
            style={outerStyle}
        >
            {/* outward pulse now created on document.body so it radiates outside the button */}

            <span style={innerStyle}>
                {/* multicolor blurred background (clipped by inner rounded radius) */}
                <span
                    aria-hidden
                    ref={bgRef}
                    style={{
                        position: 'absolute',
                        inset: 0,
                        transform: `translate3d(0px, 0px,0)`,
                        transition: hover ? 'transform 90ms linear' : 'transform 400ms ease',
                        backgroundImage: `conic-gradient(from ${hueShift}deg, ${baseColors.join(',')})`,
                        filter: 'blur(12px) saturate(140%)',
                        opacity: 0.98,
                        zIndex: 0,
                    }}
                />

                {/* shimmer overlay */}
                <span
                    aria-hidden
                    style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(90deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02), rgba(255,255,255,0.06))',
                        mixBlendMode: 'overlay',
                        pointerEvents: 'none',
                        animation: 'shimmer 2200ms linear infinite',
                        opacity: 0.9,
                        zIndex: 1,
                    }}
                />

                {/* hover pre-pulse glow (inside outer ring) */}
                <span
                    aria-hidden
                    style={{
                        position: 'absolute',
                        inset: -4,
                        borderRadius: '0.375rem',
                        background: `conic-gradient(from ${hueShift}deg, ${compColors.join(',')})`,
                        filter: `blur(${hover ? 18 : 6}px) saturate(140%)`,
                        opacity: hover ? 0.9 : 0.14,
                        transition: 'opacity 180ms ease, filter 180ms ease',
                        pointerEvents: 'none',
                        zIndex: 0,
                    }}
                />

                <span className="relative z-10 font-semibold text-white select-none" style={{ pointerEvents: 'none' }}>
                    {children}
                </span>

                {/* click pulse (consistent) */}
                <span
                    aria-hidden
                    style={{
                        position: 'absolute',
                        left: '50%',
                        top: '50%',
                        transform: clicked ? 'translate(-50%,-50%) scale(1)' : 'translate(-50%,-50%) scale(0.2)',
                        width: clicked ? '240%' : '0%',
                        height: clicked ? '240%' : '0%',
                        borderRadius: '50%',
                        background: `radial-gradient(circle, ${prePulseColor}, rgba(255,255,255,0))`,
                        transition: 'all 420ms cubic-bezier(.2,.8,.2,1)',
                        pointerEvents: 'none',
                        zIndex: 2,
                        opacity: clicked ? 0.9 : 0,
                    }}
                />
            </span>
        </button>
    );
}
