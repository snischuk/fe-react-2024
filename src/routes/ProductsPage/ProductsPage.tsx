import type { FC } from 'react';
import { useEffect, useRef, useState } from 'react';
import { isMobile } from 'react-device-detect';

import { ControlPanel } from '@components/ControlPanel/ControlPanel';
import { InfiniteScroll } from '@components/InfiniteScroll/InfiniteScroll';
import { Pagination } from '@components/Pagination/Pagination';
import { ProductsList } from '@components/ProductsList/ProductsList';
import type { SortOptionClickHandler } from '@interfaces/ControlPanel';
import { SortOption } from '@interfaces/ControlPanel';
import type { Product, ProductCategory, ProductFilterByCategory } from '@interfaces/Product';
import { apiService } from '@services/fetch.service';

const ProductsPage: FC = () => {
    const [categories, setCategories] = useState<ProductCategory[]>([]);
    const [currentPaginationPage, setCurrentPaginationPage] = useState<number>(1);

    const [selectedSortOption, setSelectedSortOption] = useState<SortOption>(SortOption.PRICE_HIGH_TO_LOW);
    const [selectedFilterByCategory, setSelectedFilterByCategory] = useState<ProductFilterByCategory>({} as ProductFilterByCategory);
    const [inputSearch, setInputSearch] = useState<string>('');

    const searchInputReference = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const fetchCategories = async () => {
            const responseCategories: ProductCategory[] = await apiService.get('categories');
            setCategories(responseCategories);
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

    const onSearchEnterPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
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
                {isMobile ? (
                    <InfiniteScroll
                        inputSearch={inputSearch}
                        selectedSortOption={selectedSortOption}
                        selectedFilterByCategory={selectedFilterByCategory}
                    >
                        {(products: Product[]) => <ProductsList products={products} />}
                    </InfiniteScroll>
                ) : (
                    <Pagination
                        currentPaginationPage={currentPaginationPage}
                        onPaginationPageChange={onPaginationPageChange}
                        inputSearch={inputSearch}
                        selectedSortOption={selectedSortOption}
                        selectedFilterByCategory={selectedFilterByCategory}
                    >
                        {(products: Product[]) => <ProductsList products={products} />}
                    </Pagination>
                )}
            </>
        </>
    );
};

export { ProductsPage };
