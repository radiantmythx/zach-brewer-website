import React from 'react';
import { Link } from 'react-router-dom';

import RainbowButton from '../components/RainbowButton';
import SpaceButton from '../components/SpaceButton';
import RainbowPanel from '../components/RainbowPanel';
import SpacePanel from '../components/SpacePanel';
// Checkers is available as a separate playground route

export default function PlaygroundIndex() {
    return (
        <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
            <h1 className="text-3xl font-semibold">Playground</h1>
            <p className="mt-2 text-gray-700 dark:text-gray-300">Playable demos and small apps — click a card to open an experiment.</p>

            <div className="grid md:grid-cols-2 gap-4 mt-6">
                <Link to="/playground/tictactoe" className="block p-4 rounded-lg border border-white/6 bg-gradient-to-b from-gray-900/70 to-gray-900/50 hover:scale-105 transform transition">
                    <h3 className="text-lg font-semibold">Tic-Tac-Toe</h3>
                    <p className="mt-2 text-sm text-gray-400">Play against a simple AI. Uses the rainbow panels and buttons.</p>
                </Link>

                <Link to="/playground/checkers" className="block p-4 rounded-lg border border-white/6 bg-gradient-to-b from-gray-900/10 to-gray-900/0 hover:scale-105 transform transition">
                    <h3 className="text-lg font-semibold">Checkers</h3>
                    <p className="mt-2 text-sm text-gray-500">Play a basic game of Checkers against a simple AI.</p>
                </Link>
            </div>
        </div>
    );
}
