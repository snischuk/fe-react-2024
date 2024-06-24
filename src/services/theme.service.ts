import { ThemeMode } from '@interfaces/ThemeMode';

export const saveThemeToLocalStarage = (lsKey: string, lsValue: ThemeMode) => {
    localStorage.setItem(lsKey, lsValue);
    document.documentElement.dataset.theme = lsValue;
};

export const getThemeFromLocalStarage = (lsKey: string): ThemeMode | null => {
    const lsThemeMode = localStorage.getItem(lsKey);
    return (lsThemeMode as ThemeMode) || null;
};

export const getSystemTheme = (): ThemeMode => {
    const isUserSystemThemeLight = window.matchMedia(`(prefers-color-scheme: ${ThemeMode.LIGHT})`).matches;
    return isUserSystemThemeLight ? ThemeMode.LIGHT : ThemeMode.DARK;
};
