import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Loader } from '@components/Loader/Loader';
import { useCart } from '@contexts/CartContext';
import IconArrowLeft from '@icons/arrow-left.svg?react';
import IconArrowRight from '@icons/arrow-right.svg?react';
import IconCart from '@icons/cart.svg?react';
import type { Product } from '@interfaces/Product';
import { apiService } from '@services/fetch.service';

import styles from './ProductPage.module.css';

const ProductPage: FC = () => {
    const { addProductToCart } = useCart();
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [isFetching, setIsFetching] = useState<boolean>(true);
    const [fetchError, setFetchError] = useState<string | null>(null);
    const [product, setProduct] = useState<Product>({} as Product);

    useEffect(() => {
        const fetchProduct = async () => {
            setIsFetching(true);
            try {
                const responseProduct: Product = await apiService.get(`products/${id}`);
                setProduct(responseProduct);
            } catch (error: any) {
                setFetchError(error.message);
            } finally {
                setIsFetching(false);
            }
        };

        fetchProduct();
    }, [id]);

    const onGoBack = () => {
        navigate(-1);
    };

    const onCartButtonClick = () => {
        addProductToCart(product);
    };
    return (
        <>
            {isFetching && <Loader />}
            {!isFetching && fetchError && <p className={styles.productPageErrorText}>Failed to fetch product. Please try again later...</p>}
            {!isFetching && !fetchError && !product && <p className={styles.productNotFoundText}>Product not found</p>}
            {!isFetching && !fetchError && product && (
                <article className={styles.product}>
                    <div className={styles.productSlider}>
                        <div className={styles.productSliderMain}>
                            <button className={styles.productSliderBtn}>
                                <IconArrowLeft />
                            </button>
                            <img className={styles.productSliderImageBig} src={product.images[0]} alt="main" />
                            <button className={styles.productSliderBtn}>
                                <IconArrowRight />
                            </button>
                        </div>
                        <div className={styles.productSliderSecondary}>
                            {product.images.slice(1).map((image, index) => (
                                <img
                                    className={styles.productSliderImageSmall}
                                    key={`${product.title}${index}`}
                                    src={image}
                                    alt={product.title}
                                />
                            ))}
                        </div>
                    </div>

                    <div className={styles.productContent}>
                        <p className={styles.productPrice}>
                            <span className={styles.productPriceValue}>{product.price}</span>₴
                        </p>
                        <h2 className={styles.productTitle}>{product.title}</h2>
                        <div className={styles.productCategories}>
                            <span className={styles.productCategory}>{product.category.name}</span>
                        </div>
                        <p className={styles.productDescription}>{product.description}</p>
                        <div className={styles.productActions}>
                            <button className={styles.productBtn} onClick={onGoBack}>
                                <IconArrowLeft />
                                Back
                            </button>
                            <button className={styles.productBtnAccent} onClick={onCartButtonClick}>
                                <IconCart />
                                Add to cart
                            </button>
                        </div>
                    </div>
                </article>
            )}
        </>
    );
};

export { ProductPage };
