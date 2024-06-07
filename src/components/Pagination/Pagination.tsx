import type { FC } from 'react';

import IconArrowLeft from '@icons/arrow-left.svg?react';
import IconArrowRight from '@icons/arrow-right.svg?react';
import { combineClasses } from '@services/styles.service';

import styles from './Pagination.module.css';

interface PaginationProps {
    totalProducts: number;
    productsPerPage: number;
    currentPage: number;
    onPageChange: (page: number) => void;
}

const Pagination: FC<PaginationProps> = ({ totalProducts, productsPerPage, currentPage, onPageChange }) => {
    const totalPages = Math.ceil(totalProducts / productsPerPage);

    const onPreviousPage = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const onNextPage = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    const onPageClick = (page: number) => {
        onPageChange(page);
    };

    const generatePageNumbers = () => {
        const pageNumbers: (number | string)[] = [];
        if (totalPages <= 5) {
            for (let index = 1; index <= totalPages; index++) {
                pageNumbers.push(index);
            }
        } else {
            pageNumbers.push(1);
            if (currentPage > 3) {
                pageNumbers.push('...');
            }
            for (let index = Math.max(2, currentPage - 1); index <= Math.min(totalPages - 1, currentPage + 1); index++) {
                pageNumbers.push(index);
            }
            if (currentPage < totalPages - 2) {
                pageNumbers.push('...');
            }
            pageNumbers.push(totalPages);
        }
        return pageNumbers;
    };

    return (
        <div className={styles.pagination}>
            <button
                className={combineClasses(styles.paginationBtn, currentPage === 1 && styles.paginationBtnDisabled)}
                onClick={onPreviousPage}
                disabled={currentPage === 1}
            >
                <IconArrowLeft />
            </button>
            {generatePageNumbers().map((page, index) => (
                <button
                    key={index}
                    className={combineClasses(
                        styles.paginationBtn,
                        page === '...' && styles.paginationBtnMore,
                        page === currentPage && styles.paginationBtnActive,
                    )}
                    onClick={() => typeof page === 'number' && onPageClick(page)}
                    disabled={page === '...'}
                >
                    {page}
                </button>
            ))}
            <button
                className={combineClasses(styles.paginationBtn, currentPage === totalPages && styles.paginationBtnDisabled)}
                onClick={onNextPage}
                disabled={currentPage === totalPages}
            >
                <IconArrowRight />
            </button>
        </div>
    );
};

export { Pagination };
