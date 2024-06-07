import type { FC, MouseEvent } from 'react';

import IconCart from '@icons/cart.svg?react';
import IconLogo from '@icons/logo.svg?react';
import IconMenuBurger from '@icons/menu-burger.svg?react';
import IconSignin from '@icons/sign-in.svg?react';
import IconSignup from '@icons/sign-up.svg?react';
import IconThemeDark from '@icons/theme-mode-dark.svg?react';
import IconThemeDivider from '@icons/theme-mode-divider.svg?react';
import IconThemeLight from '@icons/theme-mode-light.svg?react';
import { PageName } from '@interfaces/PageName';
import type { Product } from '@interfaces/Product';
import { ThemeMode } from '@interfaces/ThemeMode';
import { combineClasses } from '@services/styles.service';

import styles from './Header.module.css';

interface HeaderProps {
    pageActive: PageName;
    productsInCart: Product[];
    onPageLinkClick: (event: MouseEvent<HTMLAnchorElement>) => void;
    currentTheme: ThemeMode;
    onThemeModeClick: (event: MouseEvent<HTMLButtonElement>) => void;
}

const Header: FC<HeaderProps> = ({ pageActive, productsInCart, onPageLinkClick, currentTheme, onThemeModeClick }) => {
    const getPageClassName = (pageName: PageName) =>
        pageName === pageActive ? `${styles.headerPageLink} ${styles.headerPageLinkActive}` : styles.headerPageLink;

    const getThemeClassName = (themeName: ThemeMode) =>
        themeName === currentTheme ? `${styles.headerThemeModeBtn} ${styles.headerThemeModeBtnActive}` : styles.headerThemeModeBtn;

    return (
        <header className={styles.header}>
            <div className={styles.headerContainer}>
                <a href="./">
                    <IconLogo className={styles.headerLogoIcon} />
                </a>

                <div className={styles.headerThemeModeBtns}>
                    <button className={getThemeClassName(ThemeMode.LIGHT)} data-theme-mode="light" onClick={onThemeModeClick}>
                        <IconThemeLight className={styles.headerThemeModeBtnIcon} />
                    </button>
                    <IconThemeDivider />
                    <button className={getThemeClassName(ThemeMode.DARK)} data-theme-mode="dark" onClick={onThemeModeClick}>
                        <IconThemeDark className={styles.headerThemeModeBtnIcon} />
                    </button>
                </div>

                <div className={styles.headerPageLinks}>
                    <a className={getPageClassName(PageName.ABOUT)} href="#about" data-page="about" onClick={onPageLinkClick}>
                        About
                    </a>
                    <a className={getPageClassName(PageName.PRODUCTS)} href="#products" data-page="products" onClick={onPageLinkClick}>
                        Products
                    </a>
                </div>

                <button className={styles.headerCartBtn}>
                    <IconCart className={styles.headerCartIcon} />
                    {productsInCart.length > 0 && <span className={styles.headerCartQuantity}>{productsInCart.length}</span>}
                </button>

                <div className={styles.headerAuthBtns}>
                    <button className={combineClasses(styles.headerAuthBtn, styles.headerAuthBtnDark)}>
                        <IconSignin className={styles.headerAuthBtnIcon} />
                        Login
                    </button>
                    <button className={combineClasses(styles.headerAuthBtn, styles.headerAuthBtnAccent)}>
                        <IconSignup className={styles.headerAuthBtnIcon} />
                        Sign up
                    </button>
                </div>

                <button className={styles.headerBurgerBtn}>
                    <IconMenuBurger className={styles.headerBurgerIcon} />
                </button>
            </div>
        </header>
    );
};

export { Header };
