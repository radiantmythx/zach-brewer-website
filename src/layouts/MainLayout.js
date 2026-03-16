import React from 'react';

export default function MainLayout({ children }) {
    return (
        <div className="min-h-screen flex flex-col">
            <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
                {children}
            </main>
        </div>
    );
}
