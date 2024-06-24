import type { FC, ReactNode } from 'react';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Loader } from '@components/Loader/Loader';
import { getURLSearchParameters } from '@helpers/getURLSearchParameters';
import { SortOption } from '@interfaces/ControlPanel';
import type { Product, ProductFilterByCategory } from '@interfaces/Product';
import { apiService } from '@services/fetch.service';

import styles from './InfiniteScroll.module.css';

interface InfiniteScrollProps {
    children: (products: Product[]) => ReactNode;
    inputSearch: string;
    selectedFilterByCategory: ProductFilterByCategory;
    selectedSortOption: SortOption;
}

const PRODUCTS_PER_PAGE = 8;
const sortOptionByPrice: { [key in SortOption]: 'asc' | 'desc' } = {
    [SortOption.PRICE_HIGH_TO_LOW]: 'desc',
    [SortOption.PRICE_LOW_TO_HIGH]: 'asc',
};

const InfiniteScroll: FC<InfiniteScrollProps> = ({ children, inputSearch, selectedSortOption, selectedFilterByCategory }) => {
    const navigate = useNavigate();
    const [products, setProducts] = useState<Product[]>([]);
    const [isFetching, setIsFetching] = useState<boolean>(false);
    const [fetchError, setFetchError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [hasMoreProducts, setHasMoreProducts] = useState<boolean>(true);

    const fetchProducts = useCallback(
        async (page: number = 0, isLoadMore: boolean = false) => {
            setIsFetching(true);
            try {
                const offset = isLoadMore ? page * PRODUCTS_PER_PAGE : 0;

                const parameters = getURLSearchParameters({
                    limitQuery: PRODUCTS_PER_PAGE,
                    offsetQuery: offset,
                    searchQuery: inputSearch,
                    filterQuery: selectedFilterByCategory.id,
                    sortQuery: sortOptionByPrice[selectedSortOption],
                });

                navigate({
                    search: parameters,
                });

                const responseProducts: { products: Product[]; total: number } = await apiService.get(`products?${parameters}`);

                if (isLoadMore) {
                    setProducts((previousProducts) => [...previousProducts, ...responseProducts.products]);
                } else {
                    setProducts(responseProducts.products);
                    setCurrentPage(0);
                }

                setCurrentPage((previousPage) => previousPage + 1);
                setHasMoreProducts(responseProducts.products.length >= PRODUCTS_PER_PAGE);
            } catch (error: any) {
                setFetchError(error.message);
            } finally {
                setIsFetching(false);
            }
        },
        [inputSearch, selectedFilterByCategory.id, selectedSortOption, navigate],
    );

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    useEffect(() => {
        const onScroll = () => {
            const { clientHeight, scrollHeight, scrollTop } = document.documentElement;
            if (clientHeight + scrollTop >= scrollHeight - 100 && !isFetching && hasMoreProducts) {
                fetchProducts(currentPage, true);
            }
        };

        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, [fetchProducts, isFetching, hasMoreProducts, currentPage]);

    return (
        <div className={styles.infiniteScroll}>
            {!isFetching && fetchError && <p className={styles.productsPageErrorText}>{`${fetchError}... Check your connection!`}</p>}
            {!isFetching && !fetchError && products.length === 0 && <p className={styles.productsNotFoundText}>Products not found :(</p>}
            {!isFetching && products.length > 0 && <>{children(products)}</>}
            {isFetching && <Loader />}
        </div>
    );
};

export { InfiniteScroll };
