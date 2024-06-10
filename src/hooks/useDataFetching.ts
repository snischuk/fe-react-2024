import { useEffect, useState } from 'react';

interface DataFetchingProps {
    url: string;
}

interface DataFetchingResult<T> {
    data: T | null;
    isFetching: boolean;
    errorInfo: string | null;
}

export const useDataFetching = <T>({ url }: DataFetchingProps): DataFetchingResult<T> => {
    const [data, setData] = useState<T | null>(null);
    const [isFetching, setIsFetching] = useState<boolean>(true);
    const [errorInfo, setErrorInfo] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const jsonData: T = await response.json();
                setData(jsonData);
            } catch (error: any) {
                console.error('Error fetching data:', error);
                setErrorInfo(error.message);
            } finally {
                setIsFetching(false);
            }
        };

        fetchData();
    }, [url]);

    return { data, isFetching, errorInfo };
};
