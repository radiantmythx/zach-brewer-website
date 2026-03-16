// Simple Tic-Tac-Toe game logic helpers
export function createEmptyBoard() {
    return Array(9).fill(null);
}

export function checkWinner(bd) {
    const lines = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    for (let [a, b, c] of lines) {
        if (bd[a] && bd[a] === bd[b] && bd[a] === bd[c]) return bd[a];
    }
    if (bd.every(Boolean)) return 'draw';
    return null;
}

export function findWinningLine(bd) {
    const lines = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    for (let [a, b, c] of lines) {
        if (bd[a] && bd[a] === bd[b] && bd[a] === bd[c]) return [a, b, c];
    }
    return null;
}

export function availableMoves(bd) {
    return bd.map((v, i) => v ? null : i).filter(v => v !== null);
}

// very small heuristic AI: win if possible, block if necessary, take center, else random
export function aiMove(bd, ai = 'O', human = 'X') {
    // win
    const moves = availableMoves(bd);
    for (let m of moves) {
        const copy = bd.slice(); copy[m] = ai;
        if (checkWinner(copy) === ai) return m;
    }
    // block
    for (let m of moves) {
        const copy = bd.slice(); copy[m] = human;
        if (checkWinner(copy) === human) return m;
    }
    // center
    if (moves.includes(4)) return 4;
    // random corner preferred
    const corners = moves.filter(i => [0, 2, 6, 8].includes(i));
    if (corners.length) return corners[Math.floor(Math.random() * corners.length)];
    // fallback
    return moves[Math.floor(Math.random() * moves.length)];
}
