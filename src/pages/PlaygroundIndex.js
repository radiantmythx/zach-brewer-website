import React from 'react';
import { Link } from 'react-router-dom';

export default function PlaygroundIndex() {
    return (
        <div className="max-w-3xl mx-auto px-4 py-6">
            <h1 className="text-3xl font-semibold">Playground</h1>
            <p className="mt-2 text-gray-700 dark:text-gray-300">A collection of small components, experiments, and mini-games.</p>
            <ul className="mt-4 list-disc list-inside">
                <li>
                    <Link to="/playground/dice" className="text-blue-600 hover:underline">Dice Roller (example)</Link>
                </li>
            </ul>
        </div>
    );
}
