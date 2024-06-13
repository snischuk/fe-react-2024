import type { FC } from 'react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { ControlPanel } from '@components/ControlPanel/ControlPanel';
import { Pagination } from '@components/Pagination/Pagination';
import { ProductsList } from '@components/ProductsList/ProductsList';
import { BASE_URL } from '@constants/apiUrl';
import { PRODUCTS_PER_PAGE } from '@constants/pagination';
import { useDataFetching } from '@hooks/useDataFetching';
import { useFilterAndSort } from '@hooks/useFilterAndSort';
import { usePagination } from '@hooks/usePagination';
import type { SortOptionChangeHandler } from '@interfaces/ControlPanel';
import { SortOption } from '@interfaces/ControlPanel';
import type { AddProductToCartHandler, Product, ProductCategoryName } from '@interfaces/Product';

import styles from './ProductsPage.module.css';

interface ProductsPageProps {
    onAddProductToCart: AddProductToCartHandler;
}

const ProductsPage: FC<ProductsPageProps> = ({ onAddProductToCart }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedFiltersByCategory, setSelectedFilterByCategory] = useState<ProductCategoryName[]>([]);
    const [selectedSortOption, setSelectedSortOption] = useState<SortOption>(SortOption.PRICE_HIGH_LOW);
    const [products, setProducts] = useState<Product[]>([]);

    const searchInputReference = useRef<HTMLInputElement>(null);

    const { fetchedData, isFetching, errorInfo } = useDataFetching<{ products: Product[] }>(BASE_URL);
    const fetchedProducts = fetchedData?.products;

    useEffect(() => {
        if (fetchedProducts && fetchedProducts.length > 0) {
            setProducts(fetchedProducts as Product[]);
        }
    }, [fetchedProducts]);

    const filteredAndSortedProducts = useFilterAndSort({
        products,
        searchQuery,
        selectedFiltersByCategory,
        selectedSortOption,
    });

    const { currentPage, totalPages, onPageChange, startIndex, endIndex } = usePagination({
        totalItems: filteredAndSortedProducts.length,
        itemsPerPage: PRODUCTS_PER_PAGE,
    });
    const onSearchButtonClick = useCallback(() => {
        if (searchInputReference.current) {
            setSearchQuery(searchInputReference.current.value);
            onPageChange(1);
        }
    }, [onPageChange]);

    const onFilterByCategoryClick = useCallback(
        (filterOption: ProductCategoryName) => {
            setSelectedFilterByCategory((previous) => {
                const categoryIndex = previous.indexOf(filterOption);
                if (categoryIndex === -1) {
                    return [...previous, filterOption];
                } else {
                    const updatedFilters = [...previous];
                    updatedFilters.splice(categoryIndex, 1);
                    return updatedFilters;
                }
            });
            onPageChange(1);
        },
        [onPageChange],
    );

    const onSortOptionChange: SortOptionChangeHandler = useCallback(
        (sortOption) => {
            setSelectedSortOption(sortOption);
            onPageChange(1);
        },
        [onPageChange],
    );

    const displayedProductsPerPage = useMemo(
        () => filteredAndSortedProducts.slice(startIndex, endIndex),
        [filteredAndSortedProducts, startIndex, endIndex],
    );

    const renderLoader = () => <p className={styles.productsPageLoaderText}>Loading products...</p>;
    const renderError = () => <p className={styles.productsPageErrorText}>{`${errorInfo}... Check your connection!`}</p>;
    const renderContent = () =>
        filteredAndSortedProducts.length === 0 ? (
            <p className={styles.productsNotFoundText}>Products not found :(</p>
        ) : (
            <>
                <ControlPanel
                    selectedSortOption={selectedSortOption}
                    onSortOptionChange={onSortOptionChange}
                    products={products}
                    selectedFiltersByCategory={selectedFiltersByCategory}
                    onFilterByCategoryClick={onFilterByCategoryClick}
                    onSearchBtnClick={onSearchButtonClick}
                    searchInputRef={searchInputReference}
                />
                <ProductsList products={displayedProductsPerPage} onAddProductToCart={onAddProductToCart} />
                <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={onPageChange} />
            </>
        );

    if (isFetching) {
        return renderLoader();
    } else if (errorInfo) {
        return renderError();
    } else return renderContent();
};

export { ProductsPage };
