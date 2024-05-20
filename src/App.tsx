import type { FC, MouseEvent } from 'react';
import { useEffect, useState } from 'react';

import { About } from '@components/About/About';
import { Footer } from '@components/Footer/Footer';
import { Header } from '@components/Header/Header';
import { ProductsList } from '@components/ProductsList/ProductsList';
import type { AddToCartHandler } from '@interfaces/Handlers';
import { PageName } from '@interfaces/PageName';
import type { Product } from '@interfaces/Product';
import { ThemeMode } from '@interfaces/ThemeMode';

import { MOCK_PRODUCTS } from '@/data/mock-products';

import styles from './App.module.css';

type PagesType = {
    [key in PageName]: React.ReactNode;
};

const LS_KEY_CART = 'MasterAcademyCart';
const LS_KEY_THEME_MODE = 'MasterAcademyThemeMode';

const App: FC = () => {
    const [pageActive, setPageActive] = useState<PageName>(PageName.ABOUT);

    const [currentTheme, setCurrentTheme] = useState<ThemeMode>(() => {
        const isUserSystemThemeLight = window.matchMedia('(prefers-color-scheme: light)').matches;
        const lsThemeMode = localStorage.getItem(LS_KEY_THEME_MODE) as ThemeMode;

        if (lsThemeMode) {
            return JSON.parse(lsThemeMode);
        } else {
            return isUserSystemThemeLight ? ThemeMode.LIGHT : ThemeMode.DARK;
        }
    });

    const [productsInCart, setProductsInCart] = useState<Product[]>(() => {
        const lsCart = localStorage.getItem(LS_KEY_CART);
        return lsCart ? JSON.parse(lsCart) : [];
    });

    useEffect(() => {
        localStorage.setItem(LS_KEY_CART, JSON.stringify(productsInCart));
    }, [productsInCart]);

    useEffect(() => {
        localStorage.setItem(LS_KEY_THEME_MODE, JSON.stringify(currentTheme));
        document.documentElement.dataset.theme = currentTheme;
    }, [currentTheme]);

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

    const onThemeModeClick = (event: MouseEvent<HTMLButtonElement>) => {
        const clickedThemeMode = event.currentTarget.dataset.themeMode;

        if (clickedThemeMode) {
            setCurrentTheme(clickedThemeMode as ThemeMode);
        }
    };

    const PAGES: PagesType = {
        [PageName.ABOUT]: <About currentTheme={currentTheme} />,
        [PageName.PRODUCTS]: <ProductsList products={MOCK_PRODUCTS} productsInCart={productsInCart} onAddToCart={onAddToCart} />,
    };

    const content = PAGES[pageActive] || <div>Page not found... :(</div>;

    return (
        <>
            <Header
                pageActive={pageActive}
                productsInCart={productsInCart}
                onPageLinkClick={onPageLinkClick}
                currentTheme={currentTheme}
                onThemeModeClick={onThemeModeClick}
            />
            <main className={styles.main}>{content}</main>
            <Footer />
        </>
    );
};

export default App;
