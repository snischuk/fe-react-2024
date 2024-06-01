import type { FC } from 'react';
import { useMemo, useState } from 'react';

import { ControlPanel } from '@components/ControlPanel/ControlPanel';
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
    const [selectedSortOption, setSelectedSortOption] = useState<SortOption>(SortOption.PRICE_HIGH_LOW);
    const [selectedFiltersByCategory, setSelectedFilterByCategory] = useState<ProductCategoryName[]>([]);

    const onFilterByCategoryClick = (filterOption: ProductCategoryName) => {
        const categoryIndex = selectedFiltersByCategory.indexOf(filterOption);
        if (categoryIndex === -1) {
            setSelectedFilterByCategory([...selectedFiltersByCategory, filterOption]);
        } else {
            const updatedFilters = [...selectedFiltersByCategory];
            updatedFilters.splice(categoryIndex, 1);
            setSelectedFilterByCategory(updatedFilters);
        }
    };

    const onSortOptionChange: SortOptionChangeHandler = (sortOption) => {
        setSelectedSortOption(sortOption);
    };

    const filteredAndSortedProducts = useMemo(() => {
        let filteredProducts = products;

        if (selectedFiltersByCategory.length > 0) {
            filteredProducts = filteredProducts.filter((product) => selectedFiltersByCategory.includes(product.category.name));
        }

        const sortFunction = sortFunctions[selectedSortOption];
        return [...filteredProducts].sort(sortFunction);
    }, [products, selectedSortOption, selectedFiltersByCategory]);

    return (
        <>
            <ControlPanel
                selectedSortOption={selectedSortOption}
                onSortOptionChange={onSortOptionChange}
                products={products}
                selectedFiltersByCategory={selectedFiltersByCategory}
                onFilterByCategoryClick={onFilterByCategoryClick}
            />

            <ul className={styles.cards}>
                {filteredAndSortedProducts.map((product: Product) => (
                    <li className={styles.cardsItem} key={`${product.id}${product.title}`}>
                        <ProductCard product={product} onAddProductToCart={onAddProductToCart} />
                    </li>
                ))}
            </ul>
        </>
    );
};
export { ProductsList };
