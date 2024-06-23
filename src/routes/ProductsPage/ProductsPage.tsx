import type { FC, KeyboardEvent } from 'react';
import { useEffect, useRef, useState } from 'react';

import { ControlPanel } from '@components/ControlPanel/ControlPanel';
import { InfiniteScroll } from '@components/InfiniteScroll/InfiniteScroll';
import { Pagination } from '@components/Pagination/Pagination';
import { ProductsList } from '@components/ProductsList/ProductsList';
import type { SortOptionClickHandler } from '@interfaces/ControlPanel';
import { SortOption } from '@interfaces/ControlPanel';
import type { AddProductToCartHandler, Product, ProductCategory, ProductFilterByCategory } from '@interfaces/Product';
import { ApiService } from '@services/fetch.service';
import { checkIsMobileDevice } from '@utils/checkIsMobileDevice';

interface ProductsPageProps {
    onAddProductToCart: AddProductToCartHandler;
}

const ProductsPage: FC<ProductsPageProps> = ({ onAddProductToCart }) => {
    const [isMobileDevice, setIsMobileDevice] = useState<boolean>(true);
    const [categories, setCategories] = useState<ProductCategory[]>([]);

    const [currentPaginationPage, setCurrentPaginationPage] = useState<number>(1);

    const [selectedSortOption, setSelectedSortOption] = useState<SortOption>(SortOption.PRICE_HIGH_TO_LOW);
    const [selectedFilterByCategory, setSelectedFilterByCategory] = useState<ProductFilterByCategory>({} as ProductFilterByCategory);
    const [inputSearch, setInputSearch] = useState<string>('');

    const searchInputReference = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setIsMobileDevice(checkIsMobileDevice());

        const fetchCategories = async () => {
            try {
                const responseCategories: ProductCategory[] = await ApiService.GetInstance().get('categories');
                setCategories(responseCategories);
            } catch (error: any) {
                console.error(error);
            }
        };

        fetchCategories();
    }, []);

    const onPaginationPageChange = (page: number) => {
        setCurrentPaginationPage(page);
    };

    const onSearchButtonClick = () => {
        if (searchInputReference.current) {
            setInputSearch(searchInputReference.current.value.trim());
        }
        setCurrentPaginationPage(1);
    };

    const onSearchEnterPress = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            onSearchButtonClick();
        }
    };

    const onFilterByCategoryClick = (filterOption: ProductFilterByCategory) => {
        setSelectedFilterByCategory((previousFilter) => (previousFilter === filterOption ? ({} as ProductFilterByCategory) : filterOption));
        setCurrentPaginationPage(1);
    };

    const onSortOptionClick: SortOptionClickHandler = (sortOption) => {
        setSelectedSortOption(sortOption);
        setCurrentPaginationPage(1);
    };
    return (
        <>
            <ControlPanel
                filtersOptionsByCategory={categories}
                selectedSortOption={selectedSortOption}
                onSortOptionClick={onSortOptionClick}
                selectedFilterByCategory={selectedFilterByCategory}
                onFilterByCategoryClick={onFilterByCategoryClick}
                searchInputReference={searchInputReference}
                onSearchButtonClick={onSearchButtonClick}
                onSearchEnterPress={onSearchEnterPress}
            />

            <>
                {isMobileDevice ? (
                    <InfiniteScroll
                        onAddProductToCart={onAddProductToCart}
                        inputSearch={inputSearch}
                        selectedSortOption={selectedSortOption}
                        selectedFilterByCategory={selectedFilterByCategory}
                    >
                        {(products: Product[]) => <ProductsList products={products} onAddProductToCart={onAddProductToCart} />}
                    </InfiniteScroll>
                ) : (
                    <Pagination
                        onAddProductToCart={onAddProductToCart}
                        currentPaginationPage={currentPaginationPage}
                        onPaginationPageChange={onPaginationPageChange}
                        inputSearch={inputSearch}
                        selectedSortOption={selectedSortOption}
                        selectedFilterByCategory={selectedFilterByCategory}
                    >
                        {(products: Product[]) => <ProductsList products={products} onAddProductToCart={onAddProductToCart} />}
                    </Pagination>
                )}
            </>
        </>
    );
};

export { ProductsPage };
