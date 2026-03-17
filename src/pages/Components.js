import React from 'react';
import { Link } from 'react-router-dom';

import ThemeButton from '../components/themes/ThemeButton';
import RainbowPanel from '../components/RainbowPanel';
import SpacePanel from '../components/SpacePanel';
import ThemePanel from '../components/themes/ThemePanel';
import ThemeCard from '../components/themes/ThemeCard';

export default function Components() {
    return (
        <div className="max-w-5xl mx-auto px-4 py-6 space-y-8">
            <h1 className="text-3xl font-semibold">Components</h1>
            <p className="mt-2 text-gray-700 dark:text-gray-300">A collection of small components and visual themes you can copy into your projects.</p>

            {/* Rainbow Section */}
            <section>
                <h2 className="text-2xl font-semibold">Rainbow</h2>
                <div className="mt-4 grid md:grid-cols-2 gap-6">
                    <div>
                        <h4 className="font-medium">Buttons</h4>
                        <div className="mt-3 flex items-center gap-3">
                            <ThemeButton theme="rainbow">Filled</ThemeButton>
                            <ThemeButton theme="rainbow" variant="border">Border</ThemeButton>
                            <ThemeButton theme="rainbow" variant="border" textRainbow>Text</ThemeButton>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-medium">Panels & Cards</h4>
                        <div className="mt-3 space-y-3">
                            <RainbowPanel>
                                <p>Example content inside a glowing rainbow frame.</p>
                            </RainbowPanel>
                            <ThemeCard theme="rainbow" title="Spectral">Spectral card content</ThemeCard>
                        </div>
                    </div>
                </div>
            </section>

            {/* Space Section */}
            <section>
                <h2 className="text-2xl font-semibold">Space</h2>
                <div className="mt-4 grid md:grid-cols-2 gap-6">
                    <div>
                        <h4 className="font-medium">Buttons</h4>
                        <div className="mt-3 flex items-center gap-3">
                            <ThemeButton theme="space">Filled</ThemeButton>
                            <ThemeButton theme="space" variant="border">Border</ThemeButton>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-medium">Panels & Cards</h4>
                        <div className="mt-3 space-y-3">
                            <SpacePanel>
                                <p>Example content inside a space-themed panel.</p>
                            </SpacePanel>
                            <ThemeCard theme="space" title="Orbit">Cosmic card content</ThemeCard>
                        </div>
                    </div>
                </div>
            </section>

            {/* Elemental Section */}
            <section>
                <h2 className="text-2xl font-semibold">Elemental</h2>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">Switch between Fire, Water, Air, and Earth styles.</p>
                <div className="mt-4 grid md:grid-cols-3 gap-6">
                    <div>
                        <h4 className="font-medium">Buttons</h4>
                        <div className="mt-3 flex flex-col gap-3">
                            <div className="flex items-center gap-3">
                                <ThemeButton theme="fire">Fire</ThemeButton>
                                <ThemeButton theme="fire" variant="border">Border</ThemeButton>
                            </div>
                            <div className="flex items-center gap-3">
                                <ThemeButton theme="water">Water</ThemeButton>
                                <ThemeButton theme="water" variant="border">Border</ThemeButton>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-medium">Panels</h4>
                        <div className="mt-3 space-y-3">
                            <ThemePanel theme="air">Light panel content</ThemePanel>
                            <ThemePanel theme="earth">Grounded panel content</ThemePanel>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-medium">Cards</h4>
                        <div className="mt-3 space-y-3">
                            <ThemeCard theme="fire" title="Ember">Hot</ThemeCard>
                            <ThemeCard theme="water" title="Tide">Cool</ThemeCard>
                        </div>
                    </div>
                </div>
            </section>

            <div className="pt-2">
                <h3 className="font-semibold">Playground</h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">Small experiments and playable demos. Try the Tic-Tac-Toe demo <Link to="/playground/tictactoe" className="text-blue-600 hover:underline">here</Link>.</p>
            </div>
        </div>
    );
}
