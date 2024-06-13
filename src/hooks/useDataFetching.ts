import { useEffect, useState } from 'react';

interface DataFetchingResult<T> {
    fetchedData: T | null;
    isFetching: boolean;
    errorInfo: string | null;
}

export const useDataFetching = <T>(url: string): DataFetchingResult<T> => {
    const [fetchedData, setFetchedData] = useState<T | null>(null);
    const [isFetching, setIsFetching] = useState<boolean>(true);
    const [errorInfo, setErrorInfo] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }

                const responseData: T = await response.json();
                setFetchedData(responseData);
                return responseData;
            } catch (error: any) {
                setErrorInfo(error.message);
                throw error;
            } finally {
                setIsFetching(false);
            }
        };

        fetchData();
    }, [url]);

    return { fetchedData, isFetching, errorInfo };
};
