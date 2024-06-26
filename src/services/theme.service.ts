import { ThemeMode } from '@interfaces/ThemeMode';
import { localStorageService } from '@services/localStorage.service';

class ThemeService {
    private static Instance: ThemeService;
    private localStorageService = localStorageService;

    private constructor() {}

    public static GetInstance(): ThemeService {
        if (!ThemeService.Instance) {
            ThemeService.Instance = new ThemeService();
        }
        return ThemeService.Instance;
    }

    public getSystemTheme(): ThemeMode {
        const isUserSystemThemeLight = window.matchMedia(`(prefers-color-scheme: ${ThemeMode.LIGHT})`).matches;
        return isUserSystemThemeLight ? ThemeMode.LIGHT : ThemeMode.DARK;
    }

    public saveThemeToLocalStorage(lsKey: string, lsValue: ThemeMode): void {
        this.localStorageService.setItem(lsKey, lsValue.toString());
        document.documentElement.dataset.theme = lsValue;
    }

    public getThemeFromLocalStorage(lsKey: string): ThemeMode {
        const themeModeString = this.localStorageService.getItem<string>(lsKey);

        if (!themeModeString) {
            return this.getSystemTheme();
        }

        const parsedThemeMode = themeModeString as ThemeMode;
        return parsedThemeMode === ThemeMode.LIGHT || parsedThemeMode === ThemeMode.DARK ? parsedThemeMode : this.getSystemTheme();
    }
}

export const themeService = ThemeService.GetInstance();
