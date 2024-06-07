import type { Product, ProductCategoryName } from '@interfaces/Product';

export const getUniqueProductCategoryNames = (products: Product[]): ProductCategoryName[] => [
    ...new Set(products.map(({ category }) => category.name)),
];
