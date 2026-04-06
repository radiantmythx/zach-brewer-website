import React from 'react';

export default function ThemeBreadcrumbs({ items = [], className = '' }) {
    return (
        <nav className={className} aria-label="breadcrumbs">
            <ol className="flex gap-2 text-sm">
                {items.map((it, i) => <li key={i}>{it}</li>)}
            </ol>
        </nav>
    );
}
