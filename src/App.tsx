import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import type { AddProductToCartHandler, Product } from '@interfaces/Product';
import type { ThemeMode } from '@interfaces/ThemeMode';
import { AboutPage } from '@routes/AboutPage/AboutPage';
import { Layout } from '@routes/Layout/Layout';
import { NotFoundPage } from '@routes/NotFoundPage/NotFoundPage';
import { ProductsPage } from '@routes/ProductsPage/ProductsPage';
import { getSystemTheme, getThemeFromLocalStarage, saveThemeToLocalStarage } from '@services/theme.service';

const LS_KEY_CART = 'MasterAcademyCart';
const LS_KEY_THEME_MODE = 'MasterAcademyThemeMode';

const App: FC = () => {
    const [currentTheme, setCurrentTheme] = useState<ThemeMode>(() => {
        const storedTheme = getThemeFromLocalStarage(LS_KEY_THEME_MODE);
        return storedTheme || getSystemTheme();
    });

    const [productsInCart, setProductsInCart] = useState<Product[]>(() => {
        const lsCart = localStorage.getItem(LS_KEY_CART);
        return lsCart ? JSON.parse(lsCart) : [];
    });

    useEffect(() => {
        saveThemeToLocalStarage(LS_KEY_THEME_MODE, currentTheme);
    }, [currentTheme]);

    useEffect(() => {
        localStorage.setItem(LS_KEY_CART, JSON.stringify(productsInCart));
    }, [productsInCart]);

    const onAddProductToCart: AddProductToCartHandler = (newProduct) => {
        setProductsInCart((previousProducts) => [...previousProducts, newProduct]);
    };

    const onThemeModeClick = (themeMode: ThemeMode) => {
        if (themeMode) {
            setCurrentTheme(themeMode);
        }
    };

    return (
        <>
            <Routes>
                <Route
                    path="/"
                    element={<Layout currentTheme={currentTheme} onThemeModeClick={onThemeModeClick} productsInCart={productsInCart} />}
                >
                    <Route index element={<AboutPage currentTheme={currentTheme} />} />
                    <Route path="products" element={<ProductsPage onAddProductToCart={onAddProductToCart} />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Route>
            </Routes>
        </>
    );
};

export default App;
