import { useEffect, useState } from 'react';

interface DataFetchingProps<T> {
    url: string;
    parseData: (data: any) => T;
}

interface DataFetchingResult<T> {
    data: T | null;
    isFetching: boolean;
    errorInfo: string | null;
}

export const useDataFetching = <T>({ url, parseData }: DataFetchingProps<T>): DataFetchingResult<T> => {
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
                const parsedData = parseData(jsonData);
                setData(parsedData);
            } catch (error: any) {
                console.error('Error fetching data:', error);
                setErrorInfo(error.message);
            } finally {
                setIsFetching(false);
            }
        };

        fetchData();
    }, [url, parseData]);

    return { data, isFetching, errorInfo };
};
