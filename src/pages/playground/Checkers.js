import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { initialBoard, getMoves, applyMove, aiChoose, checkWinner } from '../../lib/checkers';
import SpacePanel from '../../components/SpacePanel';

function Square({ r, c, value, onClick, selected, isTarget }) {
    const dark = (r + c) % 2 === 1;
    const size = 56;
    const style = {
        width: size,
        height: size,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: dark ? 'linear-gradient(180deg,#071026,#0b1422)' : 'linear-gradient(180deg,#e6e9ef,#f6f7fb)',
        borderRadius: 8,
        boxShadow: dark ? 'inset 0 2px 6px rgba(0,0,0,0.45)' : 'inset 0 1px 0 rgba(255,255,255,0.6)'
    };

    const pieceStyle = {
        width: 40,
        height: 40,
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontWeight: 700,
        boxShadow: '0 6px 18px rgba(0,0,0,0.45), inset 0 2px 6px rgba(255,255,255,0.03)',
        transform: selected ? 'translateY(-4px)' : 'none',
        transition: 'transform 160ms ease'
    };

    let piece = null;
    if (value === 1 || value === 2) piece = (
        <div style={{ ...pieceStyle, background: 'radial-gradient(circle at 30% 30%, #4b5563, #111827)' }}>{value === 2 ? 'K' : ''}</div>
    );
    if (value === -1 || value === -2) piece = (
        <div style={{ ...pieceStyle, background: 'radial-gradient(circle at 30% 30%, #ffb36b, #f97316)' }}>{value === -2 ? 'K' : ''}</div>
    );

    return (
        <div style={style} onClick={onClick}>
            {piece}
            {isTarget && (
                <div aria-hidden style={{ position: 'absolute', width: 14, height: 14, borderRadius: '50%', background: 'rgba(255,255,255,0.18)', boxShadow: '0 6px 18px rgba(0,0,0,0.4)' }} />
            )}
        </div>
    );
}

export default function Checkers() {
    const [board, setBoard] = useState(initialBoard());
    const [selected, setSelected] = useState(null);
    const [moves, setMoves] = useState([]);
    const [targets, setTargets] = useState([]);
    const [turn, setTurn] = useState('player');
    const [status, setStatus] = useState(null);
    const aiThinking = useRef(false);
    const squaresRef = useRef({});
    const containerRef = useRef();

    useEffect(() => {
        setStatus(checkWinner(board));
        if (turn === 'ai' && !status) {
            aiThinking.current = true;
            setTimeout(() => {
                const move = aiChoose(board);
                if (move) {
                    animateAndApply(move, 'player').then(() => { aiThinking.current = false; });
                } else aiThinking.current = false;
            }, 220);
        }
    }, [turn, board, status]);

    function handleSelect(r, c) {
        if (status) return;
        if (turn !== 'player') return;
        const v = board[r][c];
        if (v > 0) {
            setSelected([r, c]);
            const ava = getMoves(board, true, false).filter(m => m.from[0] === r && m.from[1] === c);
            setMoves(getMoves(board, true, false));
            setTargets(ava.map(m => `${m.to[0]}-${m.to[1]}`));
            return;
        }
        if (selected) {
            const available = getMoves(board, true, false);
            const mv = available.find(m => m.from[0] === selected[0] && m.from[1] === selected[1] && m.to[0] === r && m.to[1] === c);
            if (mv) {
                animateAndApply(mv, 'ai');
                setSelected(null);
                setMoves([]);
                setTargets([]);
            }
        }
    }

    function getSquareRect(r, c) {
        const el = squaresRef.current[`${r}-${c}`];
        return el ? el.getBoundingClientRect() : null;
    }

    function animateAndApply(move, nextTurn = 'ai') {
        return new Promise((resolve) => {
            const from = move.from, to = move.to;
            const fromRect = getSquareRect(from[0], from[1]);
            const toRect = getSquareRect(to[0], to[1]);
            if (!fromRect || !toRect) {
                setBoard(b => applyMove(b, move));
                if (nextTurn) setTurn(nextTurn);
                resolve();
                return;
            }

            const pieceVal = board[from[0]][from[1]];
            const originEl = squaresRef.current[`${from[0]}-${from[1]}`];
            let originPieceEl = null;
            if (originEl) {
                const candidates = originEl.getElementsByTagName('*');
                for (let i = 0; i < candidates.length; i++) {
                    const el = candidates[i];
                    if (el.offsetWidth === 40 && el.offsetHeight === 40) { originPieceEl = el; break; }
                }
                if (originPieceEl) originPieceEl.style.visibility = 'hidden';
            }

            const captureEls = (move.captures || []).map(([cr, cc]) => {
                const node = squaresRef.current[`${cr}-${cc}`];
                if (!node) return null;
                const kids = node.getElementsByTagName('*');
                for (let i = 0; i < kids.length; i++) {
                    const el = kids[i];
                    if (el.offsetWidth === 40 && el.offsetHeight === 40) return el;
                }
                return null;
            }).filter(Boolean);

            const floatEl = document.createElement('div');
            floatEl.style.position = 'fixed';
            const startLeft = fromRect.left + fromRect.width / 2 - 20;
            const startTop = fromRect.top + fromRect.height / 2 - 20;
            const endLeft = toRect.left + toRect.width / 2 - 20;
            const endTop = toRect.top + toRect.height / 2 - 20;
            floatEl.style.left = `${startLeft}px`;
            floatEl.style.top = `${startTop}px`;
            floatEl.style.width = '40px';
            floatEl.style.height = '40px';
            floatEl.style.borderRadius = '50%';
            floatEl.style.zIndex = 99999;
            floatEl.style.display = 'flex';
            floatEl.style.alignItems = 'center';
            floatEl.style.justifyContent = 'center';
            floatEl.style.willChange = 'transform, opacity';
            floatEl.style.transform = 'translate3d(0,0,0)';
            if (pieceVal > 0) floatEl.style.background = 'radial-gradient(circle at 30% 30%, #4b5563, #111827)';
            else floatEl.style.background = 'radial-gradient(circle at 30% 30%, #ffb36b, #f97316)';
            floatEl.textContent = Math.abs(pieceVal) === 2 ? 'K' : '';
            document.body.appendChild(floatEl);

            // animate with GSAP
            const dx = endLeft - startLeft;
            const dy = endTop - startTop;
            const tl = gsap.timeline({
                onComplete: async () => {
                    if (floatEl.parentNode) floatEl.remove();
                    try { await Promise.all(capturePromises || []); } catch (e) { }
                    setBoard(b => applyMove(b, move));
                    if (nextTurn) setTurn(nextTurn);
                    if (originPieceEl) originPieceEl.style.visibility = '';
                    resolve();
                }
            });

            // capture animations
            const capturePromises = captureEls.map((el) => new Promise((res) => {
                gsap.to(el, { scale: 1.4, y: -10, rotation: 8, opacity: 0, duration: 0.26, ease: 'power1.in', onComplete: res });
            }));

            tl.to(floatEl, { x: dx, y: dy, duration: 0.36, ease: 'power2.out' }).to(floatEl, { y: `-=${6}`, duration: 0.12, yoyo: true, repeat: 1 }, 0);
        });
    }

    function reset() { setBoard(initialBoard()); setSelected(null); setMoves([]); setTargets([]); setTurn('player'); setStatus(null); }

    const size = 56;

    return (
        <div>
            <h2 className="text-2xl font-semibold">Checkers</h2>
            <p className="text-sm text-gray-600">Basic checkers with GSAP + Framer Motion</p>
            <div className="mt-4 flex gap-6">
                <SpacePanel className="flex-shrink-0">
                    <div ref={containerRef} style={{ display: 'grid', gridTemplateColumns: 'repeat(8,64px)', gap: 8, padding: 8, borderRadius: 12, userSelect: 'none' }}>
                        {board.map((row, r) => row.map((v, c) => (
                            <div key={`${r}-${c}`} onMouseDown={(e) => e.preventDefault()} style={{ position: 'relative' }} ref={el => squaresRef.current[`${r}-${c}`] = el}>
                                <motion.div whileTap={{ scale: 0.98 }} onClick={() => handleSelect(r, c)}>
                                    <Square r={r} c={c} value={v} selected={selected && selected[0] === r && selected[1] === c} isTarget={targets.includes(`${r}-${c}`)} />
                                </motion.div>
                            </div>
                        )))}
                    </div>
                </SpacePanel>
                <SpacePanel className="w-56">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                        <div className="text-sm text-slate-300">Turn</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <div style={{ width: 12, height: 12, borderRadius: 12, background: turn === 'player' ? 'linear-gradient(90deg,#7c3aed,#06b6d4)' : '#334155', boxShadow: turn === 'player' ? '0 6px 18px rgba(124,58,237,0.28)' : 'none', animation: turn === 'player' ? 'checkers-pulse 1100ms infinite linear' : 'none' }} />
                            <div className="text-lg font-semibold">{turn === 'player' ? 'Player' : 'AI'}{aiThinking.current ? ' — thinking…' : ''}</div>
                        </div>
                        <div className="text-sm text-slate-300">Status</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <div style={{ width: 28, height: 28, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', background: status === 'player' ? 'linear-gradient(90deg,#06b6d4,#7c3aed)' : status === 'ai' ? 'linear-gradient(90deg,#f97316,#ffb36b)' : 'transparent', boxShadow: status ? '0 8px 28px rgba(2,6,23,0.35)' : 'none', transition: 'all 240ms ease' }}>
                                {status === 'player' ? '✔' : status === 'ai' ? '✖' : '•'}
                            </div>
                            <div className="text-lg font-medium">{status ? (status === 'player' ? 'You win' : 'AI wins') : 'Ongoing'}</div>
                        </div>
                        <div className="flex gap-2 mt-2">
                            <button onClick={reset} className="px-3 py-2 bg-white/6 hover:bg-white/10 rounded">Reset</button>
                            <button onClick={() => setBoard(initialBoard())} className="px-3 py-2 bg-white/6 hover:bg-white/10 rounded">New</button>
                        </div>
                    </div>
                </SpacePanel>
            </div>
        </div>
    );
}
