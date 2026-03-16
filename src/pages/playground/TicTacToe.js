import React, { useState, useMemo, useRef, useEffect } from 'react';
import RainbowPanel from '../../components/RainbowPanel';
import RainbowResetButton from '../../components/RainbowResetButton';
import { createEmptyBoard, checkWinner, aiMove, findWinningLine } from '../../lib/ticTacToe';

function SVGX({ id, winning }) {
    return (
        <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" className="w-3/4 h-3/4">
            {winning ? (
                <>
                    <defs>
                        <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#ff007f" />
                            <stop offset="40%" stopColor="#ff8a00" />
                            <stop offset="70%" stopColor="#00fff6" />
                            <stop offset="100%" stopColor="#7a2cff" />
                        </linearGradient>
                    </defs>
                    <g stroke={`url(#${id})`} strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" fill="none">
                        <path d="M20 20 L80 80" />
                        <path d="M80 20 L20 80" />
                    </g>
                </>
            ) : (
                <g stroke="#ffffff" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" fill="none">
                    <path d="M20 20 L80 80" />
                    <path d="M80 20 L20 80" />
                </g>
            )}
        </svg>
    );
}

function SVGO({ id, winning }) {
    return (
        <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" className="w-3/4 h-3/4">
            {winning ? (
                <>
                    <defs>
                        <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#ff007f" />
                            <stop offset="40%" stopColor="#ff8a00" />
                            <stop offset="70%" stopColor="#00fff6" />
                            <stop offset="100%" stopColor="#7a2cff" />
                        </linearGradient>
                    </defs>
                    <circle cx="50" cy="50" r="30" stroke={`url(#${id})`} strokeWidth="10" fill="none" strokeLinecap="round" />
                </>
            ) : (
                <circle cx="50" cy="50" r="30" stroke="#ffffff" strokeWidth="10" fill="none" strokeLinecap="round" />
            )}
        </svg>
    );
}

function Cell({ value, onClick, idx, uid, winning }) {
    const id = `g-${uid}-${idx}`;
    return (
        <button
            onClick={onClick}
            onMouseDown={(e) => e.preventDefault()}
            aria-label={`cell-${idx}`}
            tabIndex={-1}
            style={{ userSelect: 'none' }}
            className="w-24 h-24 md:w-28 md:h-28 flex items-center justify-center bg-transparent p-0 m-0">
            {value === 'X' && <SVGX id={id} winning={winning} />}
            {value === 'O' && <SVGO id={id} winning={winning} />}
        </button>
    );
}

export default function TicTacToe() {
    const [board, setBoard] = useState(createEmptyBoard());
    const [status, setStatus] = useState('Your move');
    const [thinking, setThinking] = useState(false);
    const [winningLine, setWinningLine] = useState(null);
    const [winningPlayer, setWinningPlayer] = useState(null);
    const [lineCoords, setLineCoords] = useState(null);
    const boardRef = useRef();
    const [lastSelected, setLastSelected] = useState(null);

    const uid = useMemo(() => Date.now().toString(36) + Math.random().toString(36).slice(2), []);

    function reset() {
        setBoard(createEmptyBoard());
        setStatus('Your move');
        setThinking(false);
        setWinningLine(null);
        setWinningPlayer(null);
        setLineCoords(null);
        setLastSelected(null);
    }

    function handlePlayerMove(i) {
        if (board[i] || checkWinner(board) || thinking) return;
        const copy = board.slice();
        copy[i] = 'X';
        setBoard(copy);
        // small local selection pulse
        setLastSelected(i);
        setTimeout(() => setLastSelected(null), 560);
        const winner = checkWinner(copy);
        if (winner) {
            setStatus(winner === 'draw' ? 'Draw' : (winner === 'X' ? 'You Win' : 'You Lose'));
            const line = findWinningLine(copy);
            if (line) {
                setWinningLine(line);
                setWinningPlayer(winner === 'draw' ? null : winner);
            }
            return;
        }

        // AI move with small delay for smoothness
        setThinking(true);
        setStatus('AI thinking...');
        setTimeout(() => {
            const aiIdx = aiMove(copy, 'O', 'X');
            if (aiIdx != null) {
                copy[aiIdx] = 'O';
                setBoard(copy.slice());
            }
            const winner2 = checkWinner(copy);
            if (winner2) {
                setStatus(winner2 === 'draw' ? 'Draw' : (winner2 === 'X' ? 'You Win' : 'You Lose'));
                const line2 = findWinningLine(copy);
                if (line2) {
                    setWinningLine(line2);
                    setWinningPlayer(winner2 === 'draw' ? null : winner2);
                }
            } else {
                setStatus('Your move');
            }
            setThinking(false);
        }, 300);
    }

    const gradient = 'conic-gradient(from 120deg, #ff007f, #ff8a00, #00fff6, #7a2cff, #ff007f)';
    const gameOver = Boolean(checkWinner(board));

    useEffect(() => {
        if (!winningLine) return;
        // compute center coords for first and last cell relative to boardRef
        const container = boardRef.current;
        if (!container) return;
        const first = container.querySelector(`[aria-label="cell-${winningLine[0]}"]`);
        const last = container.querySelector(`[aria-label="cell-${winningLine[2]}"]`);
        if (!first || !last) return;
        const crect = container.getBoundingClientRect();
        const f = first.getBoundingClientRect();
        const l = last.getBoundingClientRect();
        const x1 = f.left + f.width / 2 - crect.left;
        const y1 = f.top + f.height / 2 - crect.top;
        const x2 = l.left + l.width / 2 - crect.left;
        const y2 = l.top + l.height / 2 - crect.top;
        setLineCoords({ x1, y1, x2, y2 });
    }, [winningLine]);

    return (
        <div className="max-w-md mx-auto px-4 py-6">
            <h1 className="text-2xl font-semibold">Tic-Tac-Toe</h1>
            <p className="text-sm text-gray-400">Play against a simple AI. X = you, O = AI.</p>

            <div className="mt-4 space-y-3">
                <div style={{ padding: 6, borderRadius: 12, background: gradient }}>
                    <div ref={boardRef} style={{ position: 'relative', borderRadius: 8, overflow: 'hidden', background: 'rgba(6,6,8,0.9)', padding: 8 }}>
                        <style>{`
              .cell-available{transition: transform 160ms ease, box-shadow 160ms ease;}
              .cell-available:hover{transform: translateY(-3px) scale(1.03); box-shadow: 0 10px 30px rgba(122,44,255,0.12), 0 0 18px rgba(255,120,200,0.06);}
              .cell-selected{animation: selectPulse 560ms cubic-bezier(.2,.8,.2,1);}
              @keyframes selectPulse{0%{transform:scale(1);filter:drop-shadow(0 0 0 rgba(0,0,0,0));}50%{transform:scale(1.06);filter:drop-shadow(0 12px 30px rgba(122,44,255,0.18));}100%{transform:scale(1);filter:drop-shadow(0 0 0 rgba(0,0,0,0));}}
              .cell-winning{animation: winPulse 1200ms ease-in-out infinite;}
              @keyframes winPulse{0%{filter:drop-shadow(0 0 0 rgba(122,44,255,0));}50%{filter:drop-shadow(0 18px 40px rgba(122,44,255,0.35));}100%{filter:drop-shadow(0 0 0 rgba(122,44,255,0));}}
            `}</style>
                        <div className="grid grid-cols-3 gap-2" style={{ pointerEvents: winningLine ? 'none' : 'auto' }}>
                            {board.map((v, i) => {
                                const available = !v && !winningLine && !thinking;
                                const isSelected = lastSelected === i;
                                const isWinning = winningLine && winningLine.includes(i);
                                return (
                                    <div key={i} className={`flex items-center justify-center ${available ? 'cell-available' : ''} ${isWinning ? 'cell-winning' : ''}`} style={{ border: '1px solid rgba(255,255,255,0.06)', borderRadius: 4 }}>
                                        <Cell idx={i} uid={uid} value={v} onClick={() => handlePlayerMove(i)} winning={isWinning} />
                                        {/* overlay to animate selection when user clicked */}
                                        {isSelected && <div style={{ position: 'absolute', width: '100%', height: '100%', left: 0, top: 0, borderRadius: 6, pointerEvents: 'none' }} className="cell-selected" />}
                                    </div>
                                );
                            })}
                        </div>

                        {/* winning overlay line */}
                        {lineCoords && (
                            <svg style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
                                <defs>
                                    <linearGradient id="winGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="#ff007f" />
                                        <stop offset="40%" stopColor="#ff8a00" />
                                        <stop offset="70%" stopColor="#00fff6" />
                                        <stop offset="100%" stopColor="#7a2cff" />
                                    </linearGradient>
                                </defs>
                                <line x1={lineCoords.x1} y1={lineCoords.y1} x2={lineCoords.x2} y2={lineCoords.y2} stroke="url(#winGrad)" strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.6))', strokeDasharray: 1000, strokeDashoffset: 1000, animation: 'drawLine 700ms ease forwards' }} />
                                <style>{`@keyframes drawLine { to { stroke-dashoffset: 0; } }`}</style>
                            </svg>
                        )}
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <div className="text-lg font-medium">Status: <span className="font-bold">{status}</span></div>
                    <div>
                        <style>{`
              .reset-idle{animation: idlePulse 2400ms ease-in-out infinite;}
              @keyframes idlePulse{0%{transform:translateY(0) scale(1);box-shadow:0 0 0 rgba(0,0,0,0);}50%{transform:translateY(-2px) scale(1.02);box-shadow:0 8px 20px rgba(122,44,255,0.06);}100%{transform:translateY(0) scale(1);box-shadow:0 0 0 rgba(0,0,0,0);}}
              .reset-urgent{animation: urgentPulse 1000ms cubic-bezier(.2,.8,.2,1) infinite;}
              @keyframes urgentPulse{0%{transform:scale(1);box-shadow:0 0 0 rgba(122,44,255,0);}50%{transform:scale(1.04);box-shadow:0 18px 40px rgba(122,44,255,0.22);}100%{transform:scale(1);box-shadow:0 0 0 rgba(122,44,255,0);}}
            `}</style>
                        <RainbowResetButton onClick={reset} pulses={2} pulseSize={1} fadeTime={0.6} bgAlpha={0} borderAlpha={1} className={gameOver ? 'reset-urgent' : 'reset-idle'}>Reset</RainbowResetButton>
                    </div>
                </div>
            </div>
        </div>
    );
}
