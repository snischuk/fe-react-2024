import { LS_KEY_CART } from '@constants/localStorage';
import type { Product } from '@interfaces/Product';
import { localStorageService } from '@services/localStorage.service';

class CartService {
    private static Instance: CartService;
    private localStorageService = localStorageService;

    private constructor() {}

    public static GetInstance(): CartService {
        if (!CartService.Instance) {
            CartService.Instance = new CartService();
        }
        return CartService.Instance;
    }

    public getCartFromLocalStorage(): Product[] {
        const cartJson = this.localStorageService.getItem<string>(LS_KEY_CART);
        if (cartJson) {
            try {
                return JSON.parse(cartJson) as Product[];
            } catch (error) {
                console.error('Error parsing cart from local storage:', error);
                return [];
            }
        }
        return [];
    }

    public saveCartToLocalStorage(cart: Product[]): void {
        try {
            const cartJson = JSON.stringify(cart);
            this.localStorageService.setItem(LS_KEY_CART, cartJson);
        } catch (error) {
            console.error('Error saving cart to local storage:', error);
        }
    }

    public addProductToCart(currentCart: Product[], newProduct: Product): Product[] {
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

        this.saveCartToLocalStorage(updatedCart);
        return updatedCart;
    }
}

export const cartService = CartService.GetInstance();
