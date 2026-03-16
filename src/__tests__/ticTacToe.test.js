import { createEmptyBoard, checkWinner, aiMove } from '../lib/ticTacToe';

test('empty board has no winner', () => {
    const b = createEmptyBoard();
    expect(checkWinner(b)).toBeNull();
});

test('detect X winning', () => {
    const b = ['X', 'X', 'X', null, null, null, null, null, null];
    expect(checkWinner(b)).toBe('X');
});

test('detect draw', () => {
    const b = ['X', 'O', 'X', 'X', 'O', 'O', 'O', 'X', 'X'];
    expect(checkWinner(b)).toBe('draw');
});

test('ai blocks immediate win', () => {
    // human (X) is about to win at index 2
    const b = ['X', 'X', null, null, 'O', null, null, null, 'O'];
    const move = aiMove(b, 'O', 'X');
    expect(move).toBe(2);
});

test('ai takes winning move', () => {
    // AI can win by playing index 2
    const b = ['O', 'O', null, 'X', 'X', null, null, null, null];
    const move = aiMove(b, 'O', 'X');
    expect(move).toBe(2);
});
