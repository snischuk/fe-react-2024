import type { FC } from 'react';

import { SelectCustom } from '@components/ui/SelectCustom/SelectCustom';
import IconSearch from '@icons/search.svg?react';
import type { FilterByCategory, SortOptionProps } from '@interfaces/ControlPanel';
import type { Product, ProductCategoryName } from '@interfaces/Product';

import { getUniqueProductCategoryNames } from '@/utils/product.service';

import styles from './ControlPanel.module.css';

const ControlPanel: FC<SortOptionProps & FilterByCategory & { products: Product[] }> = ({
    selectedSortOption,
    onSortOptionChange,
    products,
    selectedFiltersByCategory,
    onFilterByCategoryClick,
}) => {
    const uniqueProductCategoriesNames = getUniqueProductCategoryNames(products);

    const getFilterButtonClassName = (filterButtonName: ProductCategoryName) =>
        selectedFiltersByCategory.includes(filterButtonName) ? `${styles.filterBtn} ${styles.filterBtnActive}` : styles.filterBtn;

    return (
        <fieldset className={styles.controlPanel}>
            <fieldset className={styles.searchBar}>
                <input className={styles.searchInput} type="search" placeholder="Search..." />
                <button className={styles.searchBtn}>
                    <IconSearch className={styles.searchIcon} />
                </button>
            </fieldset>

            <fieldset className={styles.filterBar}>
                {uniqueProductCategoriesNames.map((categoryName: ProductCategoryName) => (
                    <button
                        className={getFilterButtonClassName(categoryName)}
                        key={categoryName}
                        onClick={() => onFilterByCategoryClick(categoryName)}
                    >
                        {categoryName}
                    </button>
                ))}
            </fieldset>

            <SelectCustom selectedSortOption={selectedSortOption} onSortOptionChange={onSortOptionChange} />
        </fieldset>
    );
};

export { ControlPanel };
