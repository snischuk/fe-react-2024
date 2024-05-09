import { type FC, useState } from 'react';

import IconCart from '@icons/cart.svg?react';
import type { AddToCartHandler } from '@interfaces/Handlers';
import type { Product } from '@interfaces/Product';

import styles from './ProductCard.module.css';

interface ProductCardProps {
    product: Product;
    productsInCart: Product[];
    onAddToCart: AddToCartHandler;
}

const ProductCard: FC<ProductCardProps> = ({ product, productsInCart, onAddToCart }) => {
    const [isCartActive, setIsCartActive] = useState<boolean>(false);

    const onClick = () => {
        setIsCartActive(!isCartActive);
        onAddToCart(product);
    };

    const cartButtonClasses = isCartActive ? `${styles.cardCartBtn} ${styles.cardCartBtnActive}` : styles.cardCartBtn;

    return (
        <article className={styles.card}>
            <div className={styles.cardImageWrapper}>
                <img className={styles.cardImage} src={product.images[0]} alt={product.title} />
            </div>
            <div className={styles.cardBody}>
                <h2 className={styles.cardTitle}>{product.title}</h2>
                <div className={styles.cardFooter}>
                    <span className={styles.cardPrice}>
                        <span className={styles.cardPriceValue}>{product.price}</span>₴
                    </span>
                    <button className={cartButtonClasses} onClick={onClick}>
                        <IconCart className={styles.cardCartIcon} />
                    </button>
                </div>
            </div>
        </article>
    );
};

export { ProductCard };
