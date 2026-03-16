import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState('space'); // 'space' or 'rainbow'

    const toggleTheme = () => setTheme((t) => (t === 'space' ? 'rainbow' : 'space'));

    useEffect(() => {
        // apply lightweight body class for dark/light interplay
        if (theme === 'space') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    return useContext(ThemeContext);
}

export default ThemeContext;
