import React, { useState, useEffect, useRef } from 'react';
import { initialBoard, getMoves, applyMove, aiChoose, checkWinner } from '../../lib/checkers';

function Square({ r, c, value, onClick }) {
    const dark = (r + c) % 2 === 1;
    const style = {
        width: 56,
        height: 56,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: dark ? '#0b1220' : '#cfd8e3',
        borderRadius: 4,
    };
    const pieceStyle = {
        width: 36,
        height: 36,
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontWeight: 700,
    };
    let piece = null;
    if (value === 1 || value === 2) piece = <div style={{ ...pieceStyle, background: '#1f2937' }}>{value === 2 ? 'K' : ''}</div>;
    if (value === -1 || value === -2) piece = <div style={{ ...pieceStyle, background: '#f97316' }}>{value === -2 ? 'K' : ''}</div>;

    return (
        <div style={style} onClick={onClick}>
            {piece}
        </div>
    );
}

export default function Checkers() {
    const [board, setBoard] = useState(initialBoard());
    const [selected, setSelected] = useState(null);
    const [moves, setMoves] = useState([]);
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
            const ms = getMoves(board, true).filter(m => m.from[0] === r && m.from[1] === c).map(m => m.to.map(x=>x));
            setMoves(getMoves(board, true));
            return;
        }
        if (selected) {
            const available = getMoves(board, true);
            const mv = available.find(m => m.from[0] === selected[0] && m.from[1] === selected[1] && m.to[0]===r && m.to[1]===c);
            if (mv) {
                setBoard(b => applyMove(b, mv));
                setSelected(null);
                setMoves([]);
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
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8,56px)', gap: 6 }}>
                    {board.map((row, r) => row.map((v, c) => (
                        <div key={`${r}-${c}`} onClick={() => handleSelect(r,c)}>
                            <Square r={r} c={c} value={v} />
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
