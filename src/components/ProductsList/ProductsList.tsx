import type { FC } from 'react';
import { useMemo, useRef, useState } from 'react';

import { ControlPanel } from '@components/ControlPanel/ControlPanel';
import { Pagination } from '@components/Pagination/Pagination';
import { ProductCard } from '@components/ProductCard/ProductCard';
import type { SortOptionChangeHandler } from '@interfaces/ControlPanel';
import { SortOption } from '@interfaces/ControlPanel';
import type { AddProductToCartHandler, Product, ProductCategoryName } from '@interfaces/Product';

import styles from './ProductsList.module.css';

type SortFunction = (a: Product, b: Product) => number;

const sortFunctions: Record<SortOption, SortFunction> = {
    [SortOption.PRICE_HIGH_LOW]: (a, b) => b.price - a.price,
    [SortOption.PRICE_LOW_HIGH]: (a, b) => a.price - b.price,
    [SortOption.NEWEST]: (a, b) => new Date(b.creationAt).getTime() - new Date(a.creationAt).getTime(),
    [SortOption.OLDEST]: (a, b) => new Date(a.creationAt).getTime() - new Date(b.creationAt).getTime(),
};

interface ProductsListProps {
    products: Product[];
    onAddProductToCart: AddProductToCartHandler;
}

const ProductsList: FC<ProductsListProps> = ({ products, onAddProductToCart }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedFiltersByCategory, setSelectedFilterByCategory] = useState<ProductCategoryName[]>([]);
    const [selectedSortOption, setSelectedSortOption] = useState<SortOption>(SortOption.PRICE_HIGH_LOW);
    const [currentPage, setCurrentPage] = useState(1);

    const searchInputReference = useRef<HTMLInputElement>(null);

    const PRODUCTS_PER_PAGE = 8;

    const onSearchButtonClick = () => {
        if (searchInputReference.current) {
            setSearchQuery(searchInputReference.current.value);
            setCurrentPage(1);
        }
    };

    const onFilterByCategoryClick = (filterOption: ProductCategoryName) => {
        const categoryIndex = selectedFiltersByCategory.indexOf(filterOption);
        if (categoryIndex === -1) {
            setSelectedFilterByCategory([...selectedFiltersByCategory, filterOption]);
        } else {
            const updatedFilters = [...selectedFiltersByCategory];
            updatedFilters.splice(categoryIndex, 1);
            setSelectedFilterByCategory(updatedFilters);
        }
        setCurrentPage(1);
    };

    const onSortOptionChange: SortOptionChangeHandler = (sortOption) => {
        setSelectedSortOption(sortOption);
        setCurrentPage(1);
    };

    const onPageChange = (page: number) => {
        setCurrentPage(page);
    };

    const filteredAndSortedProducts = useMemo(() => {
        let filteredProducts = products;

        if (searchQuery.trim() !== '') {
            filteredProducts = filteredProducts.filter((product) => product.title.toLowerCase().includes(searchQuery.toLowerCase()));
        }

        if (selectedFiltersByCategory.length > 0) {
            filteredProducts = filteredProducts.filter((product) => selectedFiltersByCategory.includes(product.category.name));
        }

        const sortFunction = sortFunctions[selectedSortOption];
        return [...filteredProducts].sort(sortFunction);
    }, [products, searchQuery, selectedSortOption, selectedFiltersByCategory]);

    const displayedProducts = useMemo(() => {
        const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
        return filteredAndSortedProducts.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);
    }, [filteredAndSortedProducts, currentPage]);

    return (
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

            <ul className={styles.cards}>
                {displayedProducts.map((product: Product) => (
                    <li className={styles.cardsItem} key={`${product.id}${product.title}`}>
                        <ProductCard product={product} onAddProductToCart={onAddProductToCart} />
                    </li>
                ))}
            </ul>

            <Pagination
                totalProducts={filteredAndSortedProducts.length}
                productsPerPage={PRODUCTS_PER_PAGE}
                currentPage={currentPage}
                onPageChange={onPageChange}
            />
        </>
    );
};

export { ProductsList };
