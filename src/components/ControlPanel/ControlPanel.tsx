import type { FC } from 'react';

import { SelectCustom } from '@components/ui/SelectCustom/SelectCustom';
import IconSearch from '@icons/search.svg?react';
import type { SortOptionProps } from '@interfaces/SortOption';

import styles from './ControlPanel.module.css';

const ControlPanel: FC<SortOptionProps> = ({ selectedSortOption, onSortOptionChange }) => (
    <fieldset className={styles.controlPanel}>
        <fieldset className={styles.searchBar}>
            <input className={styles.searchInput} type="search" placeholder="Search..." />
            <button className={styles.searchBtn}>
                <IconSearch className={styles.searchIcon} />
            </button>
        </fieldset>

        <fieldset className={styles.filterBar}>
            <button className={styles.filterBtn}>Electronics</button>
            <button className={styles.filterBtn}>Shoes</button>
            <button className={styles.filterBtn}>Clothes</button>
        </fieldset>

        <SelectCustom selectedSortOption={selectedSortOption} onSortOptionChange={onSortOptionChange} />
    </fieldset>
);

export { ControlPanel };
