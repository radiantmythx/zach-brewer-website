import React from 'react';

function Projects() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-6">
            <h1 className="text-3xl font-semibold mt-4">My Projects</h1>
            <p className="mt-4 text-gray-700 dark:text-gray-300">A selection of notable work and experiments. Click any card to learn more.</p>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
                <article className="p-4 rounded-xl bg-white shadow-lg dark:bg-gray-800 hover:scale-105 transform transition">
                    <h3 className="text-xl font-semibold">Personal Website</h3>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">This portfolio, rebuilt with a focus on performance and mobile-first design.</p>
                </article>

                <article className="p-4 rounded-xl bg-white shadow-lg dark:bg-gray-800 hover:scale-105 transform transition">
                    <h3 className="text-xl font-semibold">Tooling & Experiments</h3>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">Playground experiments and small utilities. Many are lazy-loaded to keep the bundle small.</p>
                </article>
            </div>

            <h2 className="mt-8 text-xl font-medium">Personal Github Heatmap (Previous Year)</h2>
            <img src="https://ghchart.rshah.org/radiantmythx" alt="GitHub Contributions" className="w-full max-w-xl mt-3 rounded-md shadow" />
        </div>
    );
}

export default Projects;