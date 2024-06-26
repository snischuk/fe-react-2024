import { toast } from 'react-toastify';

import type { AxiosResponse } from 'axios';
import axios from 'axios';

class ApiService {
    private baseURL: string = 'https://ma-backend-api.mocintra.com/api/v1';
    private static Instance: ApiService;

    private constructor() {
        axios.defaults.baseURL = this.baseURL;
        axios.interceptors.response.use(
            (response) => response,
            (error) => {
                toast.error('Failed to fetch...');
                return Promise.reject(error);
            },
        );
    }

    public static GetInstance(): ApiService {
        if (!ApiService.Instance) {
            ApiService.Instance = new ApiService();
        }

        return ApiService.Instance;
    }

    public async get<T>(url: string): Promise<T> {
        await new Promise((resolve) => setTimeout(resolve, 500));

        const response: AxiosResponse = await axios.get(url);
        return response.data as T;
    }

    public async post<T>(url: string, data: any): Promise<T> {
        const response: AxiosResponse = await axios.post(url, data);
        return response.data as T;
    }
}

export const apiService = ApiService.GetInstance();
