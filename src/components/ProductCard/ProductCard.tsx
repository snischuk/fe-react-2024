import type { FC, MouseEvent } from 'react';
import { Link } from 'react-router-dom';

import { useCart } from '@contexts/CartContext';
import IconCart from '@icons/cart.svg?react';
import type { Product } from '@interfaces/Product';

import styles from './ProductCard.module.css';

interface ProductCardProps {
    product: Product;
}

const ProductCard: FC<ProductCardProps> = ({ product }) => {
    const { currentCart, addProductToCart } = useCart();

    const currentProduct = currentCart.find((cartProduct) => cartProduct.id === product.id);
    const productsInOneCard = currentProduct ? currentProduct.count || 0 : 0;

    const onCartButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        addProductToCart(product);
    };

    return (
        <Link className={styles.card} to={`/products/${product.id}`}>
            <div className={styles.cardImageWrapper}>
                <img className={styles.cardImage} src={product.images[0]} alt={product.title} height={200} />
            </div>
            <div className={styles.cardBody}>
                <h2 className={styles.cardTitle}>{product.title}</h2>
                <div className={styles.cardFooter}>
                    <span className={styles.cardPrice}>
                        <span className={styles.cardPriceValue}>{product.price}</span>₴
                    </span>

                    <button className={styles.cardCartBtn} onClick={onCartButtonClick}>
                        <IconCart className={styles.cardCartIcon} />
                        {productsInOneCard > 0 && <span className={styles.cardCartQuantity}>{productsInOneCard}</span>}
                    </button>
                </div>
            </div>
        </Link>
    );
};

export { ProductCard };
