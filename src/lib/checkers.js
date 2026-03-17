// Basic Checkers game logic and a simple AI (random + greedy capture preference)
// Board representation: 8x8 array, 0 = empty, 1 = player piece, 2 = player king, -1 = ai piece, -2 = ai king

export function initialBoard() {
    const b = Array.from({ length: 8 }, () => Array(8).fill(0));
    for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 8; c++) {
            if ((r + c) % 2 === 1) b[r][c] = -1; // ai starts top
        }
    }
    for (let r = 5; r < 8; r++) {
        for (let c = 0; c < 8; c++) {
            if ((r + c) % 2 === 1) b[r][c] = 1; // player starts bottom
        }
    }
    return b;
}

export function cloneBoard(b) {
    return b.map(r => r.slice());
}

function inBounds(r, c) { return r >= 0 && r < 8 && c >= 0 && c < 8; }

export function getMoves(board, isPlayer = true, forceCapture = true) {
    // returns array of {from:[r,c], to:[r,c], captures: [[r,c], ...]} moves
    const moves = [];
    const me = isPlayer ? 1 : -1;
    const kingVal = isPlayer ? 2 : -2;

    // first compute capturing moves (forced)
    const captures = [];

    function tryCapture(r, c, dr, dc, visited, curBoard, origin, captured) {
        const nr = r + dr, nc = c + dc;
        const jr = r + dr * 2, jc = c + dc * 2;
        if (!inBounds(jr, jc)) return null;
        const mid = curBoard[nr][nc];
        if (mid === 0 || Math.sign(mid) === Math.sign(curBoard[r][c])) return null;
        if (curBoard[jr][jc] !== 0) return null;
        return { to: [jr, jc], captures: [...captured, [nr, nc]] };
    }

    for (let r = 0; r < 8; r++) for (let c = 0; c < 8; c++) {
        const v = board[r][c];
        if (v === 0 || Math.sign(v) !== Math.sign(me)) continue;
        const isKing = Math.abs(v) === 2;
        const dirs = isKing ? [[1, 1], [1, -1], [-1, 1], [-1, -1]] : (me === 1 ? [[-1, 1], [-1, -1]] : [[1, 1], [1, -1]]);
        for (const [dr, dc] of dirs) {
            const cap = tryCapture(r, c, dr, dc, null, board, [r, c], []);
            if (cap) captures.push({ from: [r, c], to: cap.to, captures: cap.captures });
        }
    }

    if (captures.length > 0 && forceCapture) return captures;

    // non-captures
    for (let r = 0; r < 8; r++) for (let c = 0; c < 8; c++) {
        const v = board[r][c];
        if (v === 0 || Math.sign(v) !== Math.sign(me)) continue;
        const isKing = Math.abs(v) === 2;
        const dirs = isKing ? [[1, 1], [1, -1], [-1, 1], [-1, -1]] : (me === 1 ? [[-1, 1], [-1, -1]] : [[1, 1], [1, -1]]);
        for (const [dr, dc] of dirs) {
            const nr = r + dr, nc = c + dc;
            if (!inBounds(nr, nc)) continue;
            if (board[nr][nc] === 0) moves.push({ from: [r, c], to: [nr, nc], captures: [] });
        }
    }
    // if forceCapture was true and captures existed we'd have returned above.
    // here return non-captures (or all moves when forceCapture is false)
    return moves.concat(captures);
}

export function applyMove(board, move) {
    const b = cloneBoard(board);
    const [fr, fc] = move.from; const [tr, tc] = move.to;
    const v = b[fr][fc];
    b[fr][fc] = 0;
    b[tr][tc] = v;
    if (move.captures && move.captures.length) {
        for (const [cr, cc] of move.captures) b[cr][cc] = 0;
    }
    // kinging
    if (v === 1 && tr === 0) b[tr][tc] = 2;
    if (v === -1 && tr === 7) b[tr][tc] = -2;
    return b;
}

export function checkWinner(board) {
    const playerMoves = getMoves(board, true);
    const aiMoves = getMoves(board, false);
    const playerPieces = board.flat().filter(x => x > 0).length;
    const aiPieces = board.flat().filter(x => x < 0).length;
    if (playerPieces === 0 || playerMoves.length === 0) return 'ai';
    if (aiPieces === 0 || aiMoves.length === 0) return 'player';
    return null;
}

// Simple AI: prefer captures, then prefer moves that advance towards kinging, else random
export function aiChoose(board) {
    const moves = getMoves(board, false);
    if (!moves || moves.length === 0) return null;
    // prefer captures
    const caps = moves.filter(m => m.captures && m.captures.length);
    if (caps.length) return caps[Math.floor(Math.random() * caps.length)];
    // greedy: choose move that goes closer to row 7 (ai wants to reach bottom to king)
    const scored = moves.map(m => {
        const tr = m.to[0];
        return { m, score: tr };
    });
    scored.sort((a, b) => b.score - a.score);
    // pick among top 3
    const top = scored.slice(0, Math.max(1, Math.min(3, scored.length)));
    return top[Math.floor(Math.random() * top.length)].m;
}
