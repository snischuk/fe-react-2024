import type { FC, ReactNode } from 'react';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PuffLoader } from 'react-spinners';

import { getURLSearchParameters } from '@helpers/getURLSearchParameters';
import IconArrowLeft from '@icons/arrow-left.svg?react';
import IconArrowRight from '@icons/arrow-right.svg?react';
import { SortOption } from '@interfaces/ControlPanel';
import type { Product, ProductFilterByCategory } from '@interfaces/Product';
import { apiService } from '@services/fetch.service';
import { combineClasses } from '@utils/combineClasses';

import styles from './Pagination.module.css';

interface PaginationProps {
    children: (products: Product[]) => ReactNode;
    currentPaginationPage: number;
    onPaginationPageChange: (page: number) => void;
    inputSearch: string;
    selectedFilterByCategory: ProductFilterByCategory;
    selectedSortOption: SortOption;
}

const PRODUCTS_PER_PAGE = 8;
const sortOptionByPrice: { [key in SortOption]: 'asc' | 'desc' } = {
    [SortOption.PRICE_HIGH_TO_LOW]: 'desc',
    [SortOption.PRICE_LOW_TO_HIGH]: 'asc',
};

const Pagination: FC<PaginationProps> = ({
    children,
    onPaginationPageChange,
    currentPaginationPage,
    inputSearch,
    selectedSortOption,
    selectedFilterByCategory,
}) => {
    const navigate = useNavigate();
    const [products, setProducts] = useState<Product[]>([]);
    const [isFetching, setIsFetching] = useState<boolean>(true);
    const [fetchError, setFetchError] = useState<string | null>(null);
    const [totalPaginationPages, setTotalPaginatonPages] = useState<number>(0);

    const fetchProducts = useCallback(
        async (page: number) => {
            setIsFetching(true);
            try {
                const parameters = getURLSearchParameters({
                    limitQuery: PRODUCTS_PER_PAGE,
                    offsetQuery: (page - 1) * PRODUCTS_PER_PAGE,
                    searchQuery: inputSearch,
                    filterQuery: selectedFilterByCategory.id,
                    sortQuery: sortOptionByPrice[selectedSortOption],
                });

                navigate({
                    search: parameters,
                });

                const responseProducts: { products: Product[]; total: number } = await apiService.get(`products?${parameters}`);

                setProducts(responseProducts.products);
                setTotalPaginatonPages(Math.ceil(responseProducts.total / PRODUCTS_PER_PAGE));
            } catch (error: any) {
                setFetchError(error.message);
            } finally {
                setIsFetching(false);
            }
        },
        [inputSearch, selectedFilterByCategory.id, selectedSortOption, navigate],
    );

    useEffect(() => {
        fetchProducts(currentPaginationPage);
    }, [fetchProducts, currentPaginationPage, inputSearch, selectedFilterByCategory.id, selectedSortOption]);

    const onPreviousPage = useCallback(() => {
        if (currentPaginationPage > 1) {
            onPaginationPageChange(currentPaginationPage - 1);
        }
    }, [currentPaginationPage, onPaginationPageChange]);

    const onNextPage = useCallback(() => {
        if (currentPaginationPage < totalPaginationPages) {
            onPaginationPageChange(currentPaginationPage + 1);
        }
    }, [currentPaginationPage, onPaginationPageChange, totalPaginationPages]);

    const onPageClick = useCallback(
        (page: number) => {
            onPaginationPageChange(page);
        },
        [onPaginationPageChange],
    );

    const generatePageNumbers = useCallback(() => {
        const pageNumbers: (number | string)[] = [];
        if (totalPaginationPages <= 5) {
            for (let index = 1; index <= totalPaginationPages; index += 1) {
                pageNumbers.push(index);
            }
        } else {
            pageNumbers.push(1);
            if (currentPaginationPage > 3) {
                pageNumbers.push('...');
            }
            for (
                let index = Math.max(2, currentPaginationPage - 1);
                index <= Math.min(totalPaginationPages - 1, currentPaginationPage + 1);
                index += 1
            ) {
                pageNumbers.push(index);
            }
            if (currentPaginationPage < totalPaginationPages - 2) {
                pageNumbers.push('...');
            }
            pageNumbers.push(totalPaginationPages);
        }
        return pageNumbers;
    }, [currentPaginationPage, totalPaginationPages]);

    const generatedPageNumbers = generatePageNumbers();

    return (
        <div className={styles.paginationWrapper}>
            {isFetching && <PuffLoader color="#EF4934" cssOverride={{ top: '40%' }} />}
            {!isFetching && fetchError && (
                <p className={styles.productsPageErrorText}>Failed to fetch products. Please try again later...</p>
            )}
            {!isFetching && !fetchError && products.length === 0 && <p className={styles.productsNotFoundText}>Products not found :(</p>}
            {!isFetching && !fetchError && products.length > 0 && (
                <>
                    {children(products)}
                    <div className={styles.pagination}>
                        <button
                            className={combineClasses(styles.paginationBtn, currentPaginationPage === 1 && styles.paginationBtnDisabled)}
                            onClick={onPreviousPage}
                            disabled={currentPaginationPage === 1}
                        >
                            <IconArrowLeft />
                        </button>
                        {generatedPageNumbers.map((page, index) => (
                            <button
                                key={index}
                                className={combineClasses(
                                    styles.paginationBtn,
                                    page === '...' && styles.paginationBtnMore,
                                    page === currentPaginationPage && styles.paginationBtnActive,
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
                                currentPaginationPage === totalPaginationPages && styles.paginationBtnDisabled,
                            )}
                            onClick={onNextPage}
                            disabled={currentPaginationPage === totalPaginationPages}
                        >
                            <IconArrowRight />
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export { Pagination };
