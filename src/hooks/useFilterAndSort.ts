import { useMemo } from 'react';

import { SortOption } from '@interfaces/ControlPanel';
import type { Product, ProductCategoryName } from '@interfaces/Product';

type SortFunction = (a: Product, b: Product) => number;

const sortFunctions: Record<SortOption, SortFunction> = {
    [SortOption.PRICE_HIGH_LOW]: (a, b) => b.price - a.price,
    [SortOption.PRICE_LOW_HIGH]: (a, b) => a.price - b.price,
    [SortOption.NEWEST]: (a, b) => new Date(b.creationAt).getTime() - new Date(a.creationAt).getTime(),
    [SortOption.OLDEST]: (a, b) => new Date(a.creationAt).getTime() - new Date(b.creationAt).getTime(),
};

interface FilterAndSortParameters {
    products: Product[] | null;
    searchQuery: string;
    selectedFiltersByCategory: ProductCategoryName[];
    selectedSortOption: SortOption;
}

const useFilterAndSort = ({ products, searchQuery, selectedFiltersByCategory, selectedSortOption }: FilterAndSortParameters) =>
    useMemo(() => {
        if (!products) return [];

        let filteredProducts = products;
        if (filteredProducts) {
            if (searchQuery.trim() !== '') {
                filteredProducts = filteredProducts.filter((product: Product) =>
                    product.title.toLowerCase().includes(searchQuery.toLowerCase()),
                );
            }
            if (selectedFiltersByCategory.length > 0) {
                filteredProducts = filteredProducts.filter((product: Product) => selectedFiltersByCategory.includes(product.category.name));
            }
            const sortFunction = sortFunctions[selectedSortOption];
            return [...filteredProducts].sort(sortFunction);
        } else {
            return [];
        }
    }, [products, searchQuery, selectedSortOption, selectedFiltersByCategory]);

export { useFilterAndSort };
