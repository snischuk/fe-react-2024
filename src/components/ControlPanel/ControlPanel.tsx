import type { FC } from 'react';

import IconSearch from '@icons/search.svg?react';

import styles from './ControlPanel.module.css';

const ControlPanel: FC = () => (
    <div className={styles.controlPanel}>
        <div className={styles.searchBar}>
            <input className={styles.searchInput} type="search" placeholder="Search..." />
            <button className={styles.searchBtn}>
                <IconSearch className={styles.searchIcon} />
            </button>
        </div>

        <div className={styles.filterBar}>
            <button className={styles.filterBtn}>Electronics</button>
            <button className={styles.filterBtn}>Shoes</button>
            <button className={styles.filterBtn}>Clothes</button>
        </div>

        <div className={styles.sortBar}>
            <label className={styles.sortLabel} htmlFor="sort">
                Sort by:
            </label>
            <select className={styles.sortSelect} name="sort" id="sort">
                <option value="Price (High - Low)">Price (Hight - Low)</option>
                <option value="Price (Low - High)">Price (Low - High)</option>
                <option value="Newest">Newest</option>
                <option value="Oldest">Oldest</option>
            </select>
        </div>
    </div>
);

export { ControlPanel };
