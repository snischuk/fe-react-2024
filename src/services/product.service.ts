import type { Product, ProductCategoryName } from '@interfaces/Product';

export const getUniqueProductCategoryNames = (products: Product[] | null): ProductCategoryName[] =>
    products ? [...new Set(products.map(({ category }) => category.name))] : [];
