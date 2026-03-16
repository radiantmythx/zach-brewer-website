import React, { useRef, useState, useEffect } from 'react';

export default function RainbowPanel({ children, className = '' }) {
    const ref = useRef();
    const [pos, setPos] = useState({ x: 0.5, y: 0.5 });
    const [t, setT] = useState(0);

    useEffect(() => {
        let raf = null;
        function step() {
            setT((p) => p + 0.008);
            raf = requestAnimationFrame(step);
        }
        raf = requestAnimationFrame(step);
        return () => cancelAnimationFrame(raf);
    }, []);

    function handleMove(e) {
        const r = ref.current.getBoundingClientRect();
        setPos({ x: (e.clientX - r.left) / r.width, y: (e.clientY - r.top) / r.height });
    }

    const hue = Math.floor((t * 60) % 360);
    const comp = (hue + 180) % 360;
    const borderColor = `hsl(${comp} 80% 55%)`;

    return (
        <div
            ref={ref}
            onMouseMove={handleMove}
            className={`relative rounded-xl p-6 overflow-hidden transition-shadow duration-200 ${className}`}
            style={{ boxShadow: `0 8px 30px ${borderColor}22` }}
        >
            <div aria-hidden style={{
                position: 'absolute',
                inset: '-2px',
                background: `conic-gradient(from ${hue}deg, #ff3cac, #ffb86b, #7afcff, #784ba0, #ff3cac)`,
                filter: 'blur(18px) saturate(120%)',
                opacity: 0.9,
                transform: `translate3d(${(pos.x - 0.5) * 20}px, ${(pos.y - 0.5) * 20}px,0)`,
                transition: 'transform 200ms linear',
                zIndex: 0,
                pointerEvents: 'none',
                borderRadius: 12,
            }} />

            <div className="relative bg-white/5 rounded-xl p-4" style={{ zIndex: 5 }}>
                {children}
            </div>
        </div>
    );
}
