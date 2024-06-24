import type { FC, ReactNode } from 'react';
import { createContext, useContext, useEffect, useState } from 'react';

import { LS_KEY_THEME_MODE } from '@constants/localStorage';
import type { ThemeMode } from '@interfaces/ThemeMode';
import { getSystemTheme, getThemeFromLocalStarage, saveThemeToLocalStarage } from '@services/theme.service';

interface ThemeContextProps {
    currentTheme: ThemeMode;
    setCurrentTheme: (theme: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

interface ThemeProviderProps {
    children: ReactNode;
}

export const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
    const [currentTheme, setCurrentTheme] = useState<ThemeMode>(() => {
        const storedTheme = getThemeFromLocalStarage(LS_KEY_THEME_MODE);
        return storedTheme || getSystemTheme();
    });

    useEffect(() => {
        saveThemeToLocalStarage(LS_KEY_THEME_MODE, currentTheme);
    }, [currentTheme]);

    return <ThemeContext.Provider value={{ currentTheme, setCurrentTheme }}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
