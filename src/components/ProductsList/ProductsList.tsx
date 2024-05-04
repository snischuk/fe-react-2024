import type { FC } from 'react';

import { ProductCard } from '@components/ProductCard/ProductCard';
import type { Product } from '@interfaces/Product';

import styles from './ProductsList.module.css';

interface ProductsListProps {
    products: Product[];
}

const ProductsList: FC<ProductsListProps> = ({ products }) => (
    <ul className={styles.cards}>
        {products.map((product: Product) => (
            <li className={styles.cardsItem} key={`${product.id}${product.title}`}>
                <ProductCard product={product} />
            </li>
        ))}
    </ul>
);

export { ProductsList };
