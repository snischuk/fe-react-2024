import type { FC } from 'react';
import { Route, Routes } from 'react-router-dom';

import { CartProvider } from '@contexts/CartContext';
import { ThemeProvider } from '@contexts/ThemeContext';
import { AboutPage } from '@routes/AboutPage/AboutPage';
import { Layout } from '@routes/Layout/Layout';
import { NotFoundPage } from '@routes/NotFoundPage/NotFoundPage';
import { ProductPage } from '@routes/ProductPage/ProductPage';
import { ProductsPage } from '@routes/ProductsPage/ProductsPage';

const App: FC = () => (
    <ThemeProvider>
        <CartProvider>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<AboutPage />} />
                    <Route path="products" element={<ProductsPage />} />
                    <Route path="/products/:id" element={<ProductPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Route>
            </Routes>
        </CartProvider>
    </ThemeProvider>
);
export default App;
