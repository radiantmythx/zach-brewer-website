import React, { useState, useEffect, useRef } from 'react';
import { initialBoard, getMoves, applyMove, aiChoose, checkWinner } from '../../lib/checkers';

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

    useEffect(() => {
        setStatus(checkWinner(board));
        if (turn === 'ai' && !status) {
            aiThinking.current = true;
            setTimeout(() => {
                const move = aiChoose(board);
                if (move) {
                    setBoard(b => applyMove(b, move));
                }
                setTurn('player');
                aiThinking.current = false;
            }, 350);
        }
    }, [turn, board]);

    function handleSelect(r,c) {
        if (status) return;
        if (turn !== 'player') return;
        const v = board[r][c];
        if (v > 0) {
            setSelected([r,c]);
            const ava = getMoves(board, true).filter(m => m.from[0] === r && m.from[1] === c);
            setMoves(getMoves(board, true));
            setTargets(ava.map(m => `${m.to[0]}-${m.to[1]}`));
            return;
        }
        if (selected) {
            const available = getMoves(board, true);
            const mv = available.find(m => m.from[0] === selected[0] && m.from[1] === selected[1] && m.to[0]===r && m.to[1]===c);
            if (mv) {
                setBoard(b => applyMove(b, mv));
                setSelected(null);
                setMoves([]);
                setTargets([]);
                setTurn('ai');
            }
        }
    }

    function reset() { setBoard(initialBoard()); setSelected(null); setMoves([]); setTurn('player'); setStatus(null); }

    return (
        <div>
            <h2 className="text-2xl font-semibold">Checkers</h2>
            <p className="text-sm text-gray-600">Basic checkers with a simple AI (captures preferred).</p>
            <div className="mt-4 flex gap-6">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8,64px)', gap: 8, padding: 8, background: 'linear-gradient(180deg,#0b1220,#071022)', borderRadius: 12 }}>
                    {board.map((row, r) => row.map((v, c) => (
                        <div key={`${r}-${c}`} onClick={() => handleSelect(r,c)} style={{ position: 'relative' }}>
                            <Square r={r} c={c} value={v} selected={selected && selected[0]===r && selected[1]===c} isTarget={targets.includes(`${r}-${c}`)} />
                        </div>
                    )))}
                </div>
                <div>
                    <div className="mb-2">Turn: {turn}{aiThinking.current ? ' (AI thinking...)' : ''}</div>
                    <div className="mb-2">Status: {status || 'ongoing'}</div>
                    <div className="flex gap-2">
                        <button onClick={reset} className="px-3 py-2 bg-gray-200 rounded">Reset</button>
                        <button onClick={() => setBoard(initialBoard())} className="px-3 py-2 bg-gray-200 rounded">New</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
