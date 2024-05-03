import type { FC } from 'react';

import type { Product as ProductCardProps } from '@interfaces/Product';

import styles from './productCard.module.css';

const ProductCard: FC<ProductCardProps> = () => <div className={styles.text}>lorem ipsum</div>;

export { ProductCard };
