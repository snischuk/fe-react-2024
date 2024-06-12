import type { FC } from 'react';
import { Outlet } from 'react-router-dom';

import { Footer } from '@components/Footer/Footer';
import { Header } from '@components/Header/Header';
import type { Product } from '@interfaces/Product';
import type { ThemeMode } from '@interfaces/ThemeMode';

import styles from './Layout.module.css';

interface LayoutProps {
    currentTheme: ThemeMode;
    onThemeModeClick: (theme: ThemeMode) => void;
    productsInCart: Product[];
}

const Layout: FC<LayoutProps> = ({ currentTheme, onThemeModeClick, productsInCart }) => (
    <>
        <Header productsInCart={productsInCart} currentTheme={currentTheme} onThemeModeClick={onThemeModeClick} />
        <main className={styles.main}>
            <Outlet />
        </main>
        <Footer />
    </>
);

export { Layout };
