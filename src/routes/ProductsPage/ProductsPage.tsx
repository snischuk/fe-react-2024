import type { FC } from 'react';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ControlPanel } from '@components/ControlPanel/ControlPanel';
import { Loader } from '@components/Loader/Loader';
import { Pagination } from '@components/Pagination/Pagination';
import { ProductsList } from '@components/ProductsList/ProductsList';
import { getURLSearchParameters } from '@helpers/getURLSearchParameters';
import type { SortOptionClickHandler } from '@interfaces/ControlPanel';
import { SortOption } from '@interfaces/ControlPanel';
import type { AddProductToCartHandler, Product, ProductCategory, ProductFilterByCategory } from '@interfaces/Product';
import { ApiService } from '@services/fetch.service';

import styles from './ProductsPage.module.css';

interface ProductsPageProps {
    onAddProductToCart: AddProductToCartHandler;
}

const sortOptionByPrice: { [key in SortOption]: 'asc' | 'desc' } = {
    [SortOption.PRICE_HIGH_TO_LOW]: 'desc',
    [SortOption.PRICE_LOW_TO_HIGH]: 'asc',
};

const ProductsPage: FC<ProductsPageProps> = ({ onAddProductToCart }) => {
    const navigate = useNavigate();
    const [isFetching, setIsFetching] = useState<boolean>(true);
    const [fetchError, setFetchError] = useState<string | null>(null);
    const [categories, setCategories] = useState<ProductCategory[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [productsCount, setProductsCount] = useState<number>(0);

    const [inputSearch, setInputSearch] = useState<string>('');
    const [selectedSortOption, setSelectedSortOption] = useState<SortOption>(SortOption.PRICE_HIGH_TO_LOW);
    const [selectedFilterByCategory, setSelectedFilterByCategory] = useState<ProductFilterByCategory>({} as ProductFilterByCategory);

    const searchInputReference = useRef<HTMLInputElement>(null);

    const [currentPaginatonPage, setCurrentPaginatonPage] = useState(1);
    const PRODUCTS_PER_PAGE = 8;
    const totalPaginatonPages = Math.ceil(productsCount / PRODUCTS_PER_PAGE);

    useEffect(() => {
        const fetchData = async () => {
            setIsFetching(true);
            try {
                const responseCategories: ProductCategory[] = await ApiService.GetInstance().get('categories');
                setCategories(responseCategories);

                const queryParameters = {
                    limitQuery: PRODUCTS_PER_PAGE,
                    offsetQuery: 0,
                    searchQuery: '',
                    filterQuery: 0,
                    sortQuery: sortOptionByPrice[SortOption.PRICE_HIGH_TO_LOW],
                };

                const queryParametersString = getURLSearchParameters(queryParameters);

                navigate({
                    search: queryParametersString,
                });

                const responseProducts: { products: Product[]; total: number } = await ApiService.GetInstance().get(
                    `products?${queryParametersString}`,
                );

                setProducts(responseProducts.products);
                setProductsCount(responseProducts.total);
            } catch (error: any) {
                setFetchError(error.message);
            } finally {
                setIsFetching(false);
            }
        };

        fetchData();
    }, [navigate]);

    useEffect(() => {
        const fetchData = async () => {
            setIsFetching(true);
            try {
                const queryParameters = {
                    limitQuery: PRODUCTS_PER_PAGE,
                    offsetQuery: (currentPaginatonPage - 1) * PRODUCTS_PER_PAGE,
                    searchQuery: inputSearch,
                    filterQuery: selectedFilterByCategory.id,
                    sortQuery: sortOptionByPrice[selectedSortOption],
                };
                const queryParametersString = getURLSearchParameters(queryParameters);

                navigate({
                    search: queryParametersString,
                });

                const responseProducts: { products: Product[]; total: number } = await ApiService.GetInstance().get(
                    `products?${queryParametersString}`,
                );

                setProducts(responseProducts.products);
                setProductsCount(responseProducts.total);
            } catch (error: any) {
                setFetchError(error.message);
            } finally {
                setIsFetching(false);
            }
        };

        fetchData();
    }, [inputSearch, selectedSortOption, selectedFilterByCategory, currentPaginatonPage, navigate]);

    const onSearchButtonClick = () => {
        if (searchInputReference.current) {
            setInputSearch(searchInputReference.current.value.trim());
            searchInputReference.current.value = '';
        }
        setCurrentPaginatonPage(1);
    };

    const onSortOptionClick: SortOptionClickHandler = (sortOption) => {
        setSelectedSortOption(sortOption);
        setCurrentPaginatonPage(1);
    };

    const onFilterByCategoryClick = (filterOption: ProductFilterByCategory) => {
        setSelectedFilterByCategory((previousFilter) => (previousFilter === filterOption ? ({} as ProductFilterByCategory) : filterOption));
        setCurrentPaginatonPage(1);
    };

    const onPaginatonPageChange = (page: number) => {
        setCurrentPaginatonPage(page);
    };

    return (
        <>
            <ControlPanel
                filtersOptionsByCategory={categories}
                selectedSortOption={selectedSortOption}
                onSortOptionClick={onSortOptionClick}
                onFilterByCategoryClick={onFilterByCategoryClick}
                selectedFilterByCategory={selectedFilterByCategory}
                searchInputRef={searchInputReference}
                onSearchBtnClick={onSearchButtonClick}
            />

            {isFetching && <Loader />}
            {!isFetching && fetchError && <p className={styles.productsPageErrorText}>{`${fetchError}... Check your connection!`}</p>}
            {!isFetching && !fetchError && products.length === 0 && <p className={styles.productsNotFoundText}>Products not found :(</p>}
            {!isFetching && !fetchError && products.length > 0 && (
                <>
                    <ProductsList products={products} onAddProductToCart={onAddProductToCart} />
                    <Pagination
                        totalPaginatonPages={totalPaginatonPages}
                        currentPaginatonPage={currentPaginatonPage}
                        onPaginatonPageChange={onPaginatonPageChange}
                    />
                </>
            )}
        </>
    );
};

export { ProductsPage };
