import { type FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import IconCart from '@icons/cart.svg?react';
import type { AddProductToCartHandler, Product } from '@interfaces/Product';

import styles from './ProductCard.module.css';

interface ProductCardProps {
    product: Product;
    onAddProductToCart: AddProductToCartHandler;
}

const ProductCard: FC<ProductCardProps> = ({ product, onAddProductToCart }) => {
    const LS_KEY_PRODUCTS_IN_ONE_CARD = `MasterAcademyProductsInOneCard_${product.id}`;

    const [productsInOneCard, setProductsInOneCard] = useState<number>(() => {
        const lsProductsInOneCard = localStorage.getItem(LS_KEY_PRODUCTS_IN_ONE_CARD);
        return lsProductsInOneCard ? Number(lsProductsInOneCard) : 0;
    });

    useEffect(() => {
        localStorage.setItem(LS_KEY_PRODUCTS_IN_ONE_CARD, String(productsInOneCard));
    }, [productsInOneCard, LS_KEY_PRODUCTS_IN_ONE_CARD]);

    const onClick = () => {
        setProductsInOneCard(productsInOneCard + 1);
        onAddProductToCart(product);
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

                    <button className={styles.cardCartBtn} onClick={onClick}>
                        <IconCart className={styles.cardCartIcon} />
                        {productsInOneCard > 0 && <span className={styles.cardCartQuantity}>{productsInOneCard}</span>}
                    </button>
                </div>
            </div>
        </Link>
    );
};

export { ProductCard };
