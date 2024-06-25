import type { AxiosInstance, AxiosResponse } from 'axios';
import axios from 'axios';

class ApiService {
    private baseURL: string;
    private axiosInstance: AxiosInstance;
    private static Instance: ApiService;

    private constructor() {
        this.baseURL = 'https://ma-backend-api.mocintra.com/api/v1';
        this.axiosInstance = axios.create({
            baseURL: this.baseURL,
            timeout: 2000,
        });
    }

    public static GetInstance(): ApiService {
        if (!ApiService.Instance) {
            ApiService.Instance = new ApiService();
        }

        return ApiService.Instance;
    }

    public async get<T>(url: string): Promise<T> {
        await new Promise((resolve) => setTimeout(resolve, 500));

        try {
            const response: AxiosResponse<T> = await this.axiosInstance.get<T>(url);
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                throw new Error(error.response.statusText);
            }
            throw error;
        }
    }

    public async post<T>(url: string, data: T): Promise<T> {
        try {
            const response: AxiosResponse<T> = await this.axiosInstance.post<T>(url, data, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                throw new Error(error.response.statusText);
            }
            throw error;
        }
    }
}

export const apiService = ApiService.GetInstance();
