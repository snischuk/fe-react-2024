import type { FC } from 'react';

import IconArrowLeft from '@icons/arrow-left.svg?react';
import IconArrowRight from '@icons/arrow-right.svg?react';

import { combineClasses } from '@/utils/combineClasses';

import styles from './Pagination.module.css';

interface PaginationProps {
    totalPaginatonPages: number;
    currentPaginatonPage: number;
    onPaginatonPageChange: (page: number) => void;
}

const Pagination: FC<PaginationProps> = ({ totalPaginatonPages, currentPaginatonPage, onPaginatonPageChange }) => {
    const onPreviousPage = () => {
        if (currentPaginatonPage > 1) {
            onPaginatonPageChange(currentPaginatonPage - 1);
        }
    };

    const onNextPage = () => {
        if (currentPaginatonPage < totalPaginatonPages) {
            onPaginatonPageChange(currentPaginatonPage + 1);
        }
    };

    const onPageClick = (page: number) => {
        onPaginatonPageChange(page);
    };

    const generatePageNumbers = () => {
        const pageNumbers: (number | string)[] = [];
        if (totalPaginatonPages <= 5) {
            for (let index = 1; index <= totalPaginatonPages; index++) {
                pageNumbers.push(index);
            }
        } else {
            pageNumbers.push(1);
            if (currentPaginatonPage > 3) {
                pageNumbers.push('...');
            }
            for (
                let index = Math.max(2, currentPaginatonPage - 1);
                index <= Math.min(totalPaginatonPages - 1, currentPaginatonPage + 1);
                index++
            ) {
                pageNumbers.push(index);
            }
            if (currentPaginatonPage < totalPaginatonPages - 2) {
                pageNumbers.push('...');
            }
            pageNumbers.push(totalPaginatonPages);
        }
        return pageNumbers;
    };

    return (
        <div className={styles.pagination}>
            <button
                className={combineClasses(styles.paginationBtn, currentPaginatonPage === 1 && styles.paginationBtnDisabled)}
                onClick={onPreviousPage}
                disabled={currentPaginatonPage === 1}
            >
                <IconArrowLeft />
            </button>
            {generatePageNumbers().map((page, index) => (
                <button
                    key={index}
                    className={combineClasses(
                        styles.paginationBtn,
                        page === '...' && styles.paginationBtnMore,
                        page === currentPaginatonPage && styles.paginationBtnActive,
                    )}
                    onClick={() => typeof page === 'number' && onPageClick(page)}
                    disabled={page === '...'}
                >
                    {page}
                </button>
            ))}
            <button
                className={combineClasses(
                    styles.paginationBtn,
                    currentPaginatonPage === totalPaginatonPages && styles.paginationBtnDisabled,
                )}
                onClick={onNextPage}
                disabled={currentPaginatonPage === totalPaginatonPages}
            >
                <IconArrowRight />
            </button>
        </div>
    );
};

export { Pagination };
