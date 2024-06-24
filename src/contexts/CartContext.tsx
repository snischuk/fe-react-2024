import type { FC, ReactNode } from 'react';
import { createContext, useContext, useEffect, useState } from 'react';

import type { Product } from '@interfaces/Product';
import { cartService } from '@services/cart.service';

interface CartContextProps {
    currentCart: Product[];
    setCurrentCart: (cart: Product[]) => void;
    addProductToCart: (product: Product) => void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

interface CartProviderProps {
    children: ReactNode;
}

export const CartProvider: FC<CartProviderProps> = ({ children }) => {
    const [currentCart, setCurrentCart] = useState<Product[]>(() => cartService.getCartFromLocalStorage());

    useEffect(() => {
        cartService.saveCartToLocalStorage(currentCart);
    }, [currentCart]);

    const addProductToCart = (newProduct: Product) => {
        const updatedCart = cartService.addProductToCart(currentCart, newProduct);
        setCurrentCart(updatedCart);
    };

    return <CartContext.Provider value={{ currentCart, setCurrentCart, addProductToCart }}>{children}</CartContext.Provider>;
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
