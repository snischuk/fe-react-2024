import { LS_KEY_CART } from '@constants/localStorage';
import type { Product } from '@interfaces/Product';

export const getCartFromLocalStorage = (): Product[] => {
    const lsCart = localStorage.getItem(LS_KEY_CART);
    return lsCart ? JSON.parse(lsCart) : [];
};

export const saveCartToLocalStorage = (cart: Product[]): void => {
    localStorage.setItem(LS_KEY_CART, JSON.stringify(cart));
};

export const addProductToCart = (currentCart: Product[], newProduct: Product): Product[] => {
    let isProductExists = false;
    const updatedCart = currentCart.map((product) => {
        if (product.id === newProduct.id) {
            isProductExists = true;
            return { ...product, count: (product.count || 0) + 1 };
        }
        return product;
    });

    if (!isProductExists) {
        updatedCart.push({ ...newProduct, count: 1 });
    }

    saveCartToLocalStorage(updatedCart);
    return updatedCart;
};
