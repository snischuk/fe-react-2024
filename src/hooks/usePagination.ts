import { useState } from 'react';

interface PaginationProps {
    totalItems: number;
    itemsPerPage: number;
}

const usePagination = ({ totalItems, itemsPerPage }: PaginationProps) => {
    const [currentPage, setCurrentPage] = useState<number>(1);

    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const onPageChange = (page: number) => {
        setCurrentPage(page);
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

    return {
        currentPage,
        totalPages,
        startIndex,
        endIndex,
        onPageChange,
    };
};

export { usePagination };
