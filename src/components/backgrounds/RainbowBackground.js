import React, { useRef, useEffect } from 'react';

export default function RainbowBackground() {
    const canvasRef = useRef();

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let w = (canvas.width = window.innerWidth);
        let h = (canvas.height = window.innerHeight);
        let t = 0;
        let mouseX = w / 2;
        let mouseY = h / 2;
        let lastMove = 0;

        function onMove(e) {
            mouseX = e.clientX;
            mouseY = e.clientY;
            lastMove = Date.now();
        }
        window.addEventListener('mousemove', onMove);

        function draw() {
            // speed up when mouse moved recently
            const since = Date.now() - lastMove;
            const speedFactor = since < 600 ? 1.5 : 1.0;
            t += 0.005 * speedFactor;
            // gradient influenced by mouse position
            const gx1 = Math.max(0, Math.min(w, mouseX - w * 0.25));
            const gy1 = Math.max(0, Math.min(h, mouseY - h * 0.25));
            const gx2 = Math.max(0, Math.min(w, mouseX + w * 0.25));
            const gy2 = Math.max(0, Math.min(h, mouseY + h * 0.25));
            const grad = ctx.createLinearGradient(gx1, gy1, gx2, gy2);
            // animated stops
            for (let i = 0; i <= 1; i += 0.125) {
                const hue = Math.floor(((i + t) % 1) * 360);
                grad.addColorStop(i, `hsla(${hue},90%,60%,0.55)`);
            }
            ctx.fillStyle = grad;
            ctx.fillRect(0, 0, w, h);

            // subtle flowing waves
            ctx.globalCompositeOperation = 'lighter';
            for (let i = 0; i < 6; i++) {
                ctx.beginPath();
                const amp = 80 + i * 20;
                ctx.fillStyle = `hsla(${(i * 60 + t * 200) % 360},80%,60%,0.06)`;
                ctx.moveTo(0, h);
                for (let x = 0; x <= w; x += 20) {
                    const y = h / 2 + Math.sin((x / w) * Math.PI * 4 + t * (1 + i * 0.2)) * amp;
                    ctx.lineTo(x, y + i * 20);
                }
                ctx.lineTo(w, h);
                ctx.closePath();
                ctx.fill();
            }
            ctx.globalCompositeOperation = 'source-over';

            requestAnimationFrame(draw);
        }

        draw();

        function onResize() {
            w = canvas.width = window.innerWidth;
            h = canvas.height = window.innerHeight;
        }

        window.addEventListener('resize', onResize);
        return () => {
            window.removeEventListener('resize', onResize);
            window.removeEventListener('mousemove', onMove);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="pointer-events-none fixed inset-0 -z-10"
            style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1, pointerEvents: 'none' }}
        />
    );
}
