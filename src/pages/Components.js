import React from 'react';
import { Link } from 'react-router-dom';

import RainbowButton from '../components/RainbowButton';
import SpaceButton from '../components/SpaceButton';
import RainbowPanel from '../components/RainbowPanel';
import SpacePanel from '../components/SpacePanel';
import RainbowResetButton from '../components/RainbowResetButton';

export default function Components() {
    return (
        <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
            <h1 className="text-3xl font-semibold">Components</h1>
            <p className="mt-2 text-gray-700 dark:text-gray-300">A collection of small components and visual themes you can copy into your projects.</p>

            <div className="grid md:grid-cols-2 gap-4">
                <div>
                    <h3 className="font-semibold">Rainbow Button</h3>
                    <div className="mt-3">
                        <RainbowButton>Click Me</RainbowButton>
                    </div>
                    <pre className="mt-3 p-3 bg-gray-100 dark:bg-gray-800 rounded text-sm overflow-auto">{`import RainbowButton from '.../components/RainbowButton'\n\n<RainbowButton>Click me</RainbowButton>`}</pre>
                </div>

                <div>
                    <h3 className="font-semibold">Space Button</h3>
                    <div className="mt-3">
                        <SpaceButton>Launch</SpaceButton>
                    </div>
                    <pre className="mt-3 p-3 bg-gray-100 dark:bg-gray-800 rounded text-sm overflow-auto">{`import SpaceButton from '.../components/SpaceButton'\n\n<SpaceButton>Launch</SpaceButton>`}</pre>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
                <div>
                    <h3 className="font-semibold">Rainbow Reset Button</h3>
                    <div className="mt-3">
                        <RainbowResetButton bgAlpha={0.04} borderAlpha={1}>Reset</RainbowResetButton>
                    </div>
                    <pre className="mt-3 p-3 bg-gray-100 dark:bg-gray-800 rounded text-sm overflow-auto">{`import RainbowResetButton from '.../components/RainbowResetButton'\n\n<RainbowResetButton bgAlpha={0.04} borderAlpha={1}>Reset</RainbowResetButton>`}</pre>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
                <div>
                    <h3 className="font-semibold">Rainbow Panel</h3>
                    <div className="mt-3">
                        <RainbowPanel>
                            <p>Example content inside a glowing rainbow frame.</p>
                        </RainbowPanel>
                    </div>
                    <pre className="mt-3 p-3 bg-gray-100 dark:bg-gray-800 rounded text-sm overflow-auto">{`import RainbowPanel from '.../components/RainbowPanel'\n\n<RainbowPanel>Content</RainbowPanel>`}</pre>
                </div>

                <div>
                    <h3 className="font-semibold">Space Panel</h3>
                    <div className="mt-3">
                        <SpacePanel>
                            <p>Example content inside a space-themed panel.</p>
                        </SpacePanel>
                    </div>
                    <pre className="mt-3 p-3 bg-gray-100 dark:bg-gray-800 rounded text-sm overflow-auto">{`import SpacePanel from '.../components/SpacePanel'\n\n<SpacePanel>Content</SpacePanel>`}</pre>
                </div>
            </div>

            <div className="pt-2">
                <h3 className="font-semibold">Playground</h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">Small experiments and playable demos. Try the Tic-Tac-Toe demo <Link to="/playground/tictactoe" className="text-blue-600 hover:underline">here</Link>.</p>
            </div>
        </div>
    );
}
