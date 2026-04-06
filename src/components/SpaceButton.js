import React, { useRef, useEffect, useState } from 'react';
import themePresets from './themes/themePresets';

function rand(min, max) {
    return Math.random() * (max - min) + min;
}

export default function SpaceButton({ children, className = '', variant = 'filled', novas = false, stars = 18, ...rest }) {
    const ref = useRef();
    const farRef = useRef();
    const nearRef = useRef();
    const timers = useRef([]);
    const tRef = useRef(0);
    const targetPos = useRef({ x: 0.5, y: 0.5 });
    const displayPos = useRef({ x: 0.5, y: 0.5 });
    const [hover, setHover] = useState(false);

    useEffect(() => {
        // populate star layers
        function makeStars(container, count, sizeRange, opacityRange) {
            if (!container || !ref.current) return;
            const rect = ref.current.getBoundingClientRect();
            container.innerHTML = '';
            for (let i = 0; i < count; i++) {
                const el = document.createElement('span');
                const s = Math.round(rand(sizeRange[0], sizeRange[1]));
                el.style.position = 'absolute';
                el.style.left = `${rand(0, 100)}%`;
                el.style.top = `${rand(0, 100)}%`;
                el.style.width = `${s}px`;
                el.style.height = `${s}px`;
                el.style.borderRadius = '50%';
                el.style.background = 'radial-gradient(circle, #fff 0%, rgba(255,255,255,0.6) 40%, rgba(255,255,255,0) 100%)';
                el.style.opacity = String(rand(opacityRange[0], opacityRange[1]));
                el.style.pointerEvents = 'none';
                el.style.transform = `translate3d(0,0,0)`;
                el.className = 'space-star';
                container.appendChild(el);
            }
        }

        makeStars(farRef.current, Math.max(6, Math.floor(stars * 0.6)), [1, 3], [0.08, 0.28]);
        makeStars(nearRef.current, Math.max(8, Math.floor(stars * 0.9)), [2, 4], [0.18, 0.9]);

        return () => {
            // cleanup
            timers.current.forEach((id) => clearTimeout(id));
            timers.current.length = 0;
        };
    }, [stars]);

    useEffect(() => {
        let raf = null;
        function step() {
            tRef.current += 0.01;
            displayPos.current.x += (targetPos.current.x - displayPos.current.x) * 0.14;
            displayPos.current.y += (targetPos.current.y - displayPos.current.y) * 0.14;

            if (farRef.current) {
                const fx = (displayPos.current.x - 0.5) * 6;
                const fy = (displayPos.current.y - 0.5) * 6;
                farRef.current.style.transform = `translate3d(${fx}px, ${fy}px, 0) scale(1)`;
                farRef.current.style.opacity = String(0.9 - Math.min(0.5, Math.abs(displayPos.current.x - 0.5) + Math.abs(displayPos.current.y - 0.5)));
            }
            if (nearRef.current) {
                const nx = (displayPos.current.x - 0.5) * 14;
                const ny = (displayPos.current.y - 0.5) * 14;
                nearRef.current.style.transform = `translate3d(${nx}px, ${ny}px, 0) scale(1)`;
            }

            raf = requestAnimationFrame(step);
        }
        raf = requestAnimationFrame(step);
        return () => cancelAnimationFrame(raf);
    }, []);

    function handleMove(e) {
        const r = ref.current.getBoundingClientRect();
        targetPos.current = { x: (e.clientX - r.left) / r.width, y: (e.clientY - r.top) / r.height };
    }

    function createBodyStars(ev) {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const svgNS = 'http://www.w3.org/2000/svg';

        const total = 10 + Math.floor(Math.random() * 12);
        for (let i = 0; i < total; i++) {
            const svg = document.createElementNS(svgNS, 'svg');
            const w = 8 + Math.random() * 8;
            const h = w;
            svg.setAttribute('width', String(w));
            svg.setAttribute('height', String(h));
            svg.setAttribute('viewBox', `0 0 ${w} ${h}`);
            svg.style.position = 'fixed';
            svg.style.left = `${cx}px`;
            svg.style.top = `${cy}px`;
            svg.style.pointerEvents = 'none';
            svg.style.zIndex = '9999';
            svg.style.transform = 'translate(-50%,-50%)';
            svg.style.opacity = '1';

            const circle = document.createElementNS(svgNS, 'circle');
            circle.setAttribute('cx', String(w / 2));
            circle.setAttribute('cy', String(h / 2));
            circle.setAttribute('r', String(w / 2));
            circle.setAttribute('fill', 'white');
            circle.setAttribute('opacity', String(rand(0.6, 1)));
            svg.appendChild(circle);
            document.body.appendChild(svg);

            const angle = rand(0, Math.PI * 2);
            const distance = rand(60, 360);
            const dx = Math.cos(angle) * distance;
            const dy = Math.sin(angle) * distance;
            const dur = rand(520, 1200);

            // animate using CSS transitions
            setTimeout(() => {
                svg.style.transition = `transform ${dur}ms cubic-bezier(.1,.9,.2,1), opacity ${dur}ms ease`;
                svg.style.transform = `translate(${dx}px, ${dy}px) translate(-50%,-50%) rotate(${rand(-120, 120)}deg) scale(${rand(0.6, 1.6)})`;
                svg.style.opacity = '0';
            }, 16);

            const removeId = setTimeout(() => {
                if (svg.parentNode) svg.remove();
            }, dur + 80);

            timers.current.push(removeId);
        }

        // optional novas: larger burst
        if (novas) {
            const burstCount = 2 + Math.floor(Math.random() * 3);
            for (let b = 0; b < burstCount; b++) {
                const svg = document.createElementNS(svgNS, 'svg');
                const size = 28 + Math.random() * 36;
                svg.setAttribute('width', String(size));
                svg.setAttribute('height', String(size));
                svg.setAttribute('viewBox', `0 0 ${size} ${size}`);
                svg.style.position = 'fixed';
                svg.style.left = `${cx}px`;
                svg.style.top = `${cy}px`;
                svg.style.pointerEvents = 'none';
                svg.style.zIndex = '9999';
                svg.style.transform = 'translate(-50%,-50%)';

                const g = document.createElementNS(svgNS, 'g');
                const gradId = `sp-gn-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
                const defs = document.createElementNS(svgNS, 'defs');
                const radial = document.createElementNS(svgNS, 'radialGradient');
                radial.setAttribute('id', gradId);
                const stop1 = document.createElementNS(svgNS, 'stop');
                stop1.setAttribute('offset', '0%'); stop1.setAttribute('stop-color', '#fff'); stop1.setAttribute('stop-opacity', '1');
                const stop2 = document.createElementNS(svgNS, 'stop');
                stop2.setAttribute('offset', '100%'); stop2.setAttribute('stop-color', '#ffd6a5'); stop2.setAttribute('stop-opacity', '0');
                radial.appendChild(stop1); radial.appendChild(stop2);
                defs.appendChild(radial);
                svg.appendChild(defs);

                const circ = document.createElementNS(svgNS, 'circle');
                circ.setAttribute('cx', String(size / 2)); circ.setAttribute('cy', String(size / 2)); circ.setAttribute('r', String(size / 2));
                circ.setAttribute('fill', `url(#${gradId})`);
                svg.appendChild(circ);
                document.body.appendChild(svg);

                const angle = rand(0, Math.PI * 2);
                const distance = rand(140, 420);
                const dx = Math.cos(angle) * distance;
                const dy = Math.sin(angle) * distance;
                const dur = rand(700, 1300);

                setTimeout(() => {
                    svg.style.transition = `transform ${dur}ms cubic-bezier(.2,.8,.2,1), opacity ${dur}ms ease`;
                    svg.style.transform = `translate(${dx}px, ${dy}px) translate(-50%,-50%) scale(${rand(0.8, 1.2)})`;
                    svg.style.opacity = '0';
                }, 16 + Math.random() * 120);

                const removeId = setTimeout(() => {
                    if (svg.parentNode) svg.remove();
                }, dur + 160);
                timers.current.push(removeId);
            }
        }
    }

    function handleClick(e) {
        // remove lingering stars created by previous clicks
        try { document.querySelectorAll('svg[data-space-star]').forEach(el => el.remove()); } catch (err) { }
        createBodyStars(e);
        if (rest.onClick) rest.onClick(e);
    }

    const spaceColors = (themePresets && themePresets.space && themePresets.space.baseColors) || ['#6fc3ff', '#0b2b4a', '#0f172a'];

    const ringWidth = 1; // px

    const outerStyle = variant === 'border'
        ? {
            padding: `${ringWidth}px`,
            borderRadius: '0.5rem',
            background: 'transparent',
            WebkitTapHighlightColor: 'transparent',
            boxShadow: '0 6px 20px rgba(30,41,59,0.08)'
        }
        : { borderRadius: '0.5rem' };

    const svgRingRef = useRef(null);

    useEffect(() => {
        if (variant !== 'border' || !ref.current) return;
        let raf = null;

        function step() {
            if (!ref.current) return;
            const rect = ref.current.getBoundingClientRect();
            let svg = svgRingRef.current;
            const id = `sp-ring-${String(ref.current ? ref.current.dataset.spRingId : '') || '0'}`;
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
                ref.current.insertBefore(svg, ref.current.firstChild);
            }

            const w = Math.max(1, Math.round(rect.width));
            const h = Math.max(1, Math.round(rect.height));
            svg.setAttribute('width', String(w));
            svg.setAttribute('height', String(h));
            svg.setAttribute('viewBox', `0 0 ${w} ${h}`);

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

            while (grad.firstChild) grad.removeChild(grad.firstChild);
            spaceColors.forEach((c, i) => {
                const stop = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
                stop.setAttribute('offset', `${(i / (spaceColors.length - 1)) * 100}%`);
                stop.setAttribute('stop-color', c);
                grad.appendChild(stop);
            });

            let rectEl = svg.querySelector('rect.sp-ring');
            if (!rectEl) {
                rectEl = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
                rectEl.classList.add('sp-ring');
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

            raf = requestAnimationFrame(step);
        }

        raf = requestAnimationFrame(step);
        return () => {
            cancelAnimationFrame(raf);
            try {
                if (svgRingRef.current && svgRingRef.current.parentNode) svgRingRef.current.remove();
            } catch (err) { }
        };
    }, [variant, spaceColors]);

    const innerStyle = {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        paddingLeft: '1rem',
        paddingRight: '1rem',
        paddingTop: '0.5rem',
        paddingBottom: '0.5rem',
        borderRadius: variant === 'border' ? '0.3125rem' : '0.375rem',
        position: 'relative',
        overflow: 'hidden',
        background: variant === 'border' ? 'transparent' : 'linear-gradient(180deg, rgba(15,23,42,0.95), rgba(3,7,18,1))',
        color: 'white'
    };

    // Text style for `text` variant (space-colored text using background-clip)
    const textStyleBase = variant === 'text'
        ? { backgroundImage: `conic-gradient(from 120deg, ${spaceColors.join(',')})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }
        : { color: 'white' };

    // For border variant, always apply a subtle dark outline so text remains visible on light pages
    const outlineWhenBorder = variant === 'border'
        ? { WebkitTextStroke: '0.6px rgba(0,0,0,0.72)', textShadow: '-1px -1px 0 rgba(0,0,0,0.45), 1px -1px 0 rgba(0,0,0,0.45), -1px 1px 0 rgba(0,0,0,0.45), 1px 1px 0 rgba(0,0,0,0.45)' }
        : {};

    const textStyle = { ...textStyleBase, ...outlineWhenBorder };

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
            <span style={innerStyle}>
                {/* far background layer (small faint stars) */}
                <span
                    ref={farRef}
                    aria-hidden
                    style={{
                        position: 'absolute',
                        inset: 0,
                        zIndex: 0,
                        transform: 'translate3d(0,0,0)',
                        transition: 'transform 220ms linear',
                        pointerEvents: 'none',
                    }}
                />

                {/* near background layer (brighter stars) */}
                <span
                    ref={nearRef}
                    aria-hidden
                    style={{
                        position: 'absolute',
                        inset: 0,
                        zIndex: 1,
                        transform: 'translate3d(0,0,0)',
                        transition: 'transform 160ms linear',
                        pointerEvents: 'none',
                    }}
                />

                {/* shimmer + subtle nebula */}
                <span
                    aria-hidden
                    style={{
                        position: 'absolute',
                        inset: 0,
                        zIndex: 2,
                        background: 'radial-gradient(120px 60px at 20% 30%, rgba(120,97,255,0.08), transparent), radial-gradient(90px 40px at 80% 70%, rgba(34,211,238,0.04), transparent)',
                        mixBlendMode: 'screen',
                        pointerEvents: 'none'
                    }}
                />

                <span className="relative z-10 font-semibold" style={{ pointerEvents: 'none', ...textStyle }}>{children}</span>
            </span>
        </button>
    );
}
