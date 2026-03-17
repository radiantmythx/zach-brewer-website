import React, { useRef, useEffect } from 'react';

function rand(min, max) { return Math.random() * (max - min) + min; }

export default function SpacePanel({ children, className = '' }) {
    const ref = useRef();
    const far = useRef();
    const near = useRef();

    useEffect(() => {
        function make(container, count, sizeR, opacityR) {
            if (!container || !ref.current) return;
            container.innerHTML = '';
            for (let i = 0; i < count; i++) {
                const el = document.createElement('span');
                const s = Math.round(rand(sizeR[0], sizeR[1]));
                el.style.position = 'absolute';
                el.style.left = `${rand(0, 100)}%`;
                el.style.top = `${rand(0, 100)}%`;
                el.style.width = `${s}px`;
                el.style.height = `${s}px`;
                el.style.borderRadius = '50%';
                el.style.background = 'radial-gradient(circle, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.5) 40%, rgba(255,255,255,0) 100%)';
                el.style.opacity = String(rand(opacityR[0], opacityR[1]));
                el.style.pointerEvents = 'none';
                container.appendChild(el);
            }
        }

        make(far.current, 28, [1, 3], [0.04, 0.16]);
        make(near.current, 36, [2, 5], [0.08, 0.9]);

        let raf = null;
        const target = { x: 0.5, y: 0.5 };
        const disp = { x: 0.5, y: 0.5 };

        function step() {
            disp.x += (target.x - disp.x) * 0.08;
            disp.y += (target.y - disp.y) * 0.08;
            if (far.current) far.current.style.transform = `translate3d(${(disp.x - 0.5) * 8}px, ${(disp.y - 0.5) * 8}px,0)`;
            if (near.current) near.current.style.transform = `translate3d(${(disp.x - 0.5) * 18}px, ${(disp.y - 0.5) * 18}px,0)`;
            raf = requestAnimationFrame(step);
        }
        raf = requestAnimationFrame(step);

        return () => cancelAnimationFrame(raf);
    }, []);

    return (
        <div ref={ref} className={`relative rounded-lg p-6 bg-gradient-to-br from-gray-900/70 to-black/60 border border-white/5 shadow-xl overflow-hidden ${className}`}>
            <span ref={far} aria-hidden style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }} />
            <span ref={near} aria-hidden style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none' }} />
            <div aria-hidden style={{ position: 'absolute', inset: 0, zIndex: 2, background: 'radial-gradient(200px 80px at 20% 30%, rgba(120,97,255,0.06), transparent), radial-gradient(140px 60px at 80% 70%, rgba(34,211,238,0.03), transparent)', pointerEvents: 'none' }} />
            <div style={{ position: 'relative', zIndex: 3 }}>{children}</div>
        </div>
    );
}
