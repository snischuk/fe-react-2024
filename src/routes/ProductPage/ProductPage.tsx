import type { FC } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { BASE_URL } from '@constants/apiUrl';
import { useDataFetching } from '@hooks/useDataFetching';
import IconArrowLeft from '@icons/arrow-left.svg?react';
import IconArrowRight from '@icons/arrow-right.svg?react';
import IconCart from '@icons/cart.svg?react';
import type { Product } from '@interfaces/Product';

import styles from './ProductPage.module.css';

const ProductPage: FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const { fetchedData: product, isFetching, errorInfo } = useDataFetching<Product>(`${BASE_URL}${id}`);

    const onGoBack = () => {
        navigate(-1);
    };

    if (isFetching) {
        return <p className={styles.productPageLoaderText}>Loading product...</p>;
    } else if (errorInfo) {
        return <p className={styles.productPageErrorText}>{`${errorInfo}... Check your connection!`}</p>;
    } else if (!product) {
        return <p className={styles.productNotFoundText}>Product not found</p>;
    }

    return (
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
                        <img className={styles.productSliderImageSmall} key={`${product.title}${index}`} src={image} alt={product.title} />
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
                    <button className={styles.productBtnAccent}>
                        <IconCart />
                        Add to cart
                    </button>
                </div>
            </div>
        </article>
    );
};

export { ProductPage };
