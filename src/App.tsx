import type { FC, MouseEvent } from 'react';
import { useEffect, useState } from 'react';

import { About } from '@components/About/About';
import { Footer } from '@components/Footer/Footer';
import { Header } from '@components/Header/Header';
import { ProductsList } from '@components/ProductsList/ProductsList';
import type { AddToCartHandler } from '@interfaces/Handlers';
import { PageName } from '@interfaces/PageName';
import type { Product } from '@interfaces/Product';

import { MOCK_PRODUCTS } from '@/data/mock-products';

import styles from './App.module.css';

type PagesType = {
    [key in PageName]: React.ReactNode;
};

const LS_KEY = 'cartMasterAcademy';

const App: FC = () => {
    const [pageActive, setPageActive] = useState<PageName>(PageName.ABOUT);
    const [productsInCart, setProductsInCart] = useState<Product[]>(() => {
        const lsCart = localStorage.getItem(LS_KEY);
        return lsCart ? JSON.parse(lsCart) : [];
    });

    useEffect(() => {
        localStorage.setItem(LS_KEY, JSON.stringify(productsInCart));
    }, [productsInCart]);

    const onAddToCart: AddToCartHandler = (newProduct) => {
        setProductsInCart((previousProducts) => [...previousProducts, newProduct]);
    };

    const onPageLinkClick = (event: MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        const clickedPageLink = event.currentTarget.dataset.page;

        if (clickedPageLink) {
            setPageActive(clickedPageLink as PageName);
        }
    };

    const PAGES: PagesType = {
        [PageName.ABOUT]: <About />,
        [PageName.PRODUCTS]: <ProductsList products={MOCK_PRODUCTS} productsInCart={productsInCart} onAddToCart={onAddToCart} />,
    };

    const content = PAGES[pageActive] || <div>Page not found... :(</div>;

    return (
        <>
            <Header pageActive={pageActive} productsInCart={productsInCart} onPageLinkClick={onPageLinkClick} />
            <main className={styles.main}>{content}</main>
            <Footer />
        </>
    );
};

export default App;
