import React from 'react';

export default function ThemeAccordion({ items = [], className = '' }) {
    return (
        <div className={className}>
            {items.map((it, idx) => (
                <details key={idx} className="mb-2">
                    <summary className="cursor-pointer">{it.title}</summary>
                    <div className="mt-2">{it.content}</div>
                </details>
            ))}
        </div>
    );
}
