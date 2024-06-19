export class ApiService {
    private baseURL: string;
    private static Instance: ApiService;

    private constructor() {
        this.baseURL = 'https://ma-backend-api.mocintra.com/api/v1';
    }

    public static GetInstance(): ApiService {
        if (!ApiService.Instance) {
            ApiService.Instance = new ApiService();
        }

        return ApiService.Instance;
    }

    public async get<T>(url: string): Promise<T> {
        await new Promise((resolve) => setTimeout(resolve, 2000));

        const response = await fetch(`${this.baseURL}/${url}`);

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        return response.json() as Promise<T>;
    }

    public async post<T>(url: string, data: T): Promise<T> {
        const response = await fetch(`${this.baseURL}/${url}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        return response.json() as Promise<T>;
    }
}
