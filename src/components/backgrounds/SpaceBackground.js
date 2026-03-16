import React, { useRef, useEffect } from 'react';

export default function SpaceBackground() {
    const canvasRef = useRef();

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let w = (canvas.width = window.innerWidth);
        let h = (canvas.height = window.innerHeight);

        const stars = [];
        const count = Math.floor((w * h) / 9000);

        for (let i = 0; i < count; i++) {
            stars.push({
                x: Math.random() * w,
                y: Math.random() * h,
                r: Math.random() * 1.2 + 0.2,
                vx: (Math.random() - 0.5) * 0.1,
                vy: (Math.random() - 0.5) * 0.1,
                alpha: Math.random() * 0.8 + 0.2,
            });
        }

        let mouseX = w / 2;
        let mouseY = h / 2;

        function onMove(e) {
            mouseX = e.clientX;
            mouseY = e.clientY;
        }

        window.addEventListener('mousemove', onMove);

        function draw() {
            ctx.clearRect(0, 0, w, h);

            // subtle background gradient
            const g = ctx.createLinearGradient(0, 0, w, h);
            g.addColorStop(0, '#07031a');
            g.addColorStop(1, '#0b1022');
            ctx.fillStyle = g;
            ctx.fillRect(0, 0, w, h);

            // draw stars with parallax
            stars.forEach((s) => {
                const dx = (mouseX - w / 2) * (s.r * 0.002);
                const dy = (mouseY - h / 2) * (s.r * 0.002);

                s.x += s.vx;
                s.y += s.vy;

                if (s.x < 0) s.x = w;
                if (s.x > w) s.x = 0;
                if (s.y < 0) s.y = h;
                if (s.y > h) s.y = 0;

                ctx.beginPath();
                ctx.fillStyle = `rgba(255,255,255,${s.alpha})`;
                ctx.arc(s.x + dx, s.y + dy, s.r, 0, Math.PI * 2);
                ctx.fill();
            });

            requestAnimationFrame(draw);
        }

        draw();

        function onResize() {
            w = canvas.width = window.innerWidth;
            h = canvas.height = window.innerHeight;
        }

        window.addEventListener('resize', onResize);

        return () => {
            window.removeEventListener('mousemove', onMove);
            window.removeEventListener('resize', onResize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="pointer-events-none fixed inset-0 -z-10"
            style={{ display: 'block', position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1, pointerEvents: 'none' }}
        />
    );
}
