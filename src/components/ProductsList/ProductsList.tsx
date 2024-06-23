import type { FC } from 'react';

import { ProductCard } from '@components/ProductCard/ProductCard';
import type { AddProductToCartHandler, Product } from '@interfaces/Product';

import styles from './ProductsList.module.css';

interface ProductsListProps {
    products: Product[];
    onAddProductToCart: AddProductToCartHandler;
}

const ProductsList: FC<ProductsListProps> = ({ products, onAddProductToCart }) => (
    <ul className={styles.cards}>
        {products.map((product: Product, index: number) => (
            <li className={styles.cardsItem} key={`${product.title}${index}`}>
                <ProductCard product={product} onAddProductToCart={onAddProductToCart} />
            </li>
        ))}
    </ul>
);

export { ProductsList };
