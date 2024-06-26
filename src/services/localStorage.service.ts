class LocalStorageService {
    private static Instance: LocalStorageService;

    private constructor() {}

    public static GetInstance(): LocalStorageService {
        if (!LocalStorageService.Instance) {
            LocalStorageService.Instance = new LocalStorageService();
        }
        return LocalStorageService.Instance;
    }

    public getItem<T>(key: string): T | null {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    }

    public setItem<T>(key: string, value: T): void {
        const serializedValue = JSON.stringify(value);
        localStorage.setItem(key, serializedValue);
    }
}

export const localStorageService = LocalStorageService.GetInstance();
