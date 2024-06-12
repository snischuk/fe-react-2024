import type { FC } from 'react';

import { ProductCard } from '@components/ProductCard/ProductCard';
import type { Product } from '@interfaces/Product';

import styles from './ProductsList.module.css';

interface ProductsListProps {
    products: Product[];
    onAddProductToCart: (product: Product) => void;
}

const ProductsList: FC<ProductsListProps> = ({ products, onAddProductToCart }) => (
    <ul className={styles.cards}>
        {products.map((product: Product) => (
            <li className={styles.cardsItem} key={`${product.id}${product.title}`}>
                <ProductCard product={product} onAddProductToCart={onAddProductToCart} />
            </li>
        ))}
    </ul>
);

export { ProductsList };
