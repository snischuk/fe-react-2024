import type { Product, ProductCategoryName } from '@interfaces/Product';

export const getUniqueProductCategoryNames = (products: Product[] | null): ProductCategoryName[] => {
    if (!Array.isArray(products)) {
        return [];
    }

    return [...new Set(products.map(({ category }) => category.name))];
};
