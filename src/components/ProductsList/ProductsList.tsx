import type { FC } from 'react';
import { useMemo, useState } from 'react';

import { ControlPanel } from '@components/ControlPanel/ControlPanel';
import { ProductCard } from '@components/ProductCard/ProductCard';
import type { AddToCartHandler } from '@interfaces/Handlers';
import type { Product } from '@interfaces/Product';
import type { SortOptionChangeHandler } from '@interfaces/SortOption';
import { SortOption } from '@interfaces/SortOption';

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
    onAddToCart: AddToCartHandler;
}

const ProductsList: FC<ProductsListProps> = ({ products, onAddToCart }) => {
    const [selectedSortOption, setSelectedSortOption] = useState<SortOption>(SortOption.PRICE_HIGH_LOW);

    const onSortOptionChange: SortOptionChangeHandler = (sortOption: SortOption) => {
        setSelectedSortOption(sortOption);
    };

    const sortedProducts = useMemo(() => {
        const sortFunction = sortFunctions[selectedSortOption];
        return [...products].sort(sortFunction);
    }, [products, selectedSortOption]);

    return (
        <>
            <ControlPanel selectedSortOption={selectedSortOption} onSortOptionChange={onSortOptionChange} />

            <ul className={styles.cards}>
                {sortedProducts.map((product: Product) => (
                    <li className={styles.cardsItem} key={`${product.id}${product.title}`}>
                        <ProductCard product={product} onAddToCart={onAddToCart} />
                    </li>
                ))}
            </ul>
        </>
    );
};
export { ProductsList };
