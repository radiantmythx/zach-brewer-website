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

export default function RainbowResetButton({ children, className = '', pulses = 1, pulseSize = 1, fadeTime = 0.5, bgAlpha = 0, borderAlpha = 1, textRainbow = false, ...rest }) {
    const ref = useRef();
    const timers = useRef([]);
    const tRef = useRef(0);
    const targetPos = useRef({ x: 0.5, y: 0.5 });
    const displayPos = useRef({ x: 0.5, y: 0.5 });
    const [clicked, setClicked] = useState(false);

    const baseColors = ['#ff007f', '#ff8a00', '#00fff6', '#7a2cff', '#ff007f'];
    const ringWidth = 1; // px — keep ring a consistent 1px

    // compute complementary colors like RainbowButton so the ring matches
    const compColors = baseColors.map((hex) => {
        const { r, g, b } = hexToRgb(hex);
        const { h, s, l } = rgbToHsl(r, g, b);
        const compH = (h + 180) % 360;
        return hslString(compH, Math.max(60, s), Math.min(65, l + 5));
    });
    const svgRingRef = useRef(null);

    useEffect(() => {
        let raf = null;
        function step() {
            tRef.current += 0.008;
            displayPos.current.x += (targetPos.current.x - displayPos.current.x) * 0.18;
            displayPos.current.y += (targetPos.current.y - displayPos.current.y) * 0.18;
            if (ref.current) {
                const hueShift = Math.floor((tRef.current * 60) % 360);
                // ensure outer element box sizing and radius
                ref.current.style.boxSizing = 'border-box';
                ref.current.style.background = 'transparent';
                ref.current.style.borderRadius = '0.5rem';

                // create or update an SVG ring overlay (rounded 1px stroke) so center stays transparent
                const rect = ref.current.getBoundingClientRect();
                let svg = svgRingRef.current;
                const id = `rbg-reset-ring-${String(ref.current ? ref.current.dataset.rbgResetId : '') || '0'}`;
                if (!svg) {
                    svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                    svg.setAttribute('aria-hidden', 'true');
                    svg.style.position = 'absolute';
                    svg.style.left = '0';
                    svg.style.top = '0';
                    svg.style.width = '100%';
                    svg.style.height = '100%';
                    svg.style.pointerEvents = 'none';
                    svg.style.zIndex = '0';
                    svgRingRef.current = svg;
                    // prepend so it sits behind text but above background
                    ref.current.insertBefore(svg, ref.current.firstChild);
                }

                const w = Math.max(1, Math.round(rect.width));
                const h = Math.max(1, Math.round(rect.height));
                svg.setAttribute('width', String(w));
                svg.setAttribute('height', String(h));
                svg.setAttribute('viewBox', `0 0 ${w} ${h}`);

                // create defs/gradient and rect if missing
                let grad = svg.querySelector('defs > linearGradient');
                if (!grad) {
                    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
                    grad = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
                    grad.setAttribute('id', id + '-grad');
                    grad.setAttribute('x1', '0%');
                    grad.setAttribute('y1', '0%');
                    grad.setAttribute('x2', '100%');
                    grad.setAttribute('y2', '0%');
                    defs.appendChild(grad);
                    svg.appendChild(defs);
                }

                // update gradient stops
                while (grad.firstChild) grad.removeChild(grad.firstChild);
                compColors.forEach((c, i) => {
                    const stop = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
                    stop.setAttribute('offset', `${(i / (compColors.length - 1)) * 100}%`);
                    stop.setAttribute('stop-color', c);
                    grad.appendChild(stop);
                });
                grad.setAttribute('gradientTransform', `rotate(${hueShift})`);

                let rectEl = svg.querySelector('rect.rbg-reset-ring');
                if (!rectEl) {
                    rectEl = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
                    rectEl.classList.add('rbg-reset-ring');
                    rectEl.setAttribute('fill', 'none');
                    rectEl.setAttribute('stroke-linecap', 'round');
                    rectEl.setAttribute('stroke-linejoin', 'round');
                    svg.appendChild(rectEl);
                }

                const strokeW = Math.max(1, ringWidth);
                const inset = strokeW / 2;
                const rx = Math.max(0, Math.min(12, parseFloat(window.getComputedStyle(ref.current).borderRadius) || 8));
                rectEl.setAttribute('x', String(inset));
                rectEl.setAttribute('y', String(inset));
                rectEl.setAttribute('width', String(Math.max(0, w - strokeW)));
                rectEl.setAttribute('height', String(Math.max(0, h - strokeW)));
                rectEl.setAttribute('rx', String(rx));
                rectEl.setAttribute('ry', String(rx));
                rectEl.setAttribute('stroke-width', String(strokeW));
                rectEl.setAttribute('stroke', `url(#${id}-grad)`);
            }
            raf = requestAnimationFrame(step);
        }
        raf = requestAnimationFrame(step);
        return () => cancelAnimationFrame(raf);
    }, [borderAlpha]);

    useEffect(() => {
        return () => {
            timers.current.forEach((id) => clearTimeout(id));
            try {
                if (svgRingRef.current && svgRingRef.current.parentNode) svgRingRef.current.remove();
            } catch (err) {
                // ignore
            }
        };
    }, []);

    function handleMove(e) {
        const r = ref.current.getBoundingClientRect();
        targetPos.current = { x: (e.clientX - r.left) / r.width, y: (e.clientY - r.top) / r.height };
    }

    function handleClick(e) {
        // clear pending timers
        timers.current.forEach((id) => clearTimeout(id));
        timers.current.length = 0;
        // remove any existing pulse svgs immediately to avoid "burn" on spam click
        try {
            document.querySelectorAll('svg[data-rbg-rst]').forEach((el) => el.remove());
        } catch (err) {
            // ignore in non-browser environments
        }
        setClicked(true);
        const t1 = setTimeout(() => setClicked(false), 360);
        timers.current.push(t1);
        createBodyPulse();
        if (rest.onClick) rest.onClick(e);
    }

    const outerStyle = {
        padding: `${ringWidth}px`,
        borderRadius: '0.5rem',
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
        borderRadius: `calc(0.5rem - ${ringWidth}px)`,
        position: 'relative',
        overflow: 'hidden',
        background: bgAlpha ? `rgba(255,255,255,${bgAlpha})` : 'transparent',
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
            const id = `rbg-rst-${Date.now()}-${p}`;
            svg.setAttribute('data-rbg-rst', id);
            svg.classList.add('rbg-rst-pulse');
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

            baseColors.forEach((hex, i) => {
                const { r, g, b } = hexToRgb(hex);
                const { h, s, l } = rgbToHsl(r, g, b);
                const color = hslString((h + 180) % 360, Math.max(60, s), Math.min(65, l + 5), borderAlpha);
                const stop = document.createElementNS(svgNS, 'stop');
                stop.setAttribute('offset', `${(i / (baseColors.length - 1)) * 100}%`);
                stop.setAttribute('stop-color', color);
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

            const delay = p * stagger;
            const revealId = setTimeout(() => {
                svg.style.opacity = '1';
                const expandScale = 1 + (0.01 * (p + 1) * Math.max(1, pulseSize));
                svg.style.transform = `translate(-50%,-50%) scale(${expandScale})`;
                rectEl.style.filter = 'blur(6px)';
            }, delay);

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

    const textColor = `rgba(255,255,255,${Math.min(1, Math.max(0, 0.95 - bgAlpha))})`;
    const hueShiftRender = Math.floor((tRef.current * 60) % 360);
    const textStyle = textRainbow
        ? {
              backgroundImage: `conic-gradient(from ${hueShiftRender}deg, ${baseColors.join(',')})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
          }
        : { color: textColor };

    return (
        <button
            {...rest}
            ref={ref}
            onMouseMove={handleMove}
            onClick={handleClick}
            className={`relative inline-flex focus:outline-none transition-all duration-200 ${className}`}
            style={outerStyle}
        >
            <span style={innerStyle}>
                {/* background gradient removed from inner area so interior stays transparent; border is painted on the outer button element */}

                <span className="relative z-10 font-semibold select-none" style={{ pointerEvents: 'none', ...textStyle }}>
                    {children}
                </span>

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
                        background: `radial-gradient(circle, rgba(255,255,255,0.08), rgba(255,255,255,0))`,
                        transition: 'all 420ms cubic-bezier(.2,.8,.2,1)',
                        pointerEvents: 'none',
                        zIndex: 2,
                        opacity: clicked ? 0.9 : 0,
                    }}
                />
            </span>
        </button >
    );
}
