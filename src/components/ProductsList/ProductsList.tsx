import type { FC } from 'react';

import { ControlPanel } from '@components/ControlPanel/ControlPanel';
import { ProductCard } from '@components/ProductCard/ProductCard';
import type { AddToCartHandler } from '@interfaces/Handlers';
import type { Product } from '@interfaces/Product';

import styles from './ProductsList.module.css';

interface ProductsListProps {
    products: Product[];
    onAddToCart: AddToCartHandler;
}

const ProductsList: FC<ProductsListProps> = ({ products, onAddToCart }) => (
    <>
        <ControlPanel />
        <ul className={styles.cards}>
            {products.map((product: Product) => (
                <li className={styles.cardsItem} key={`${product.id}${product.title}`}>
                    <ProductCard product={product} onAddToCart={onAddToCart} />
                </li>
            ))}
        </ul>
    </>
);

export { ProductsList };
