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
import { combineClasses } from '@utils/combineClasses';

import styles from './Header.module.css';

interface HeaderProps {
    pageActive: PageName;
    productsInCart: Product[];
    onPageLinkClick: (event: MouseEvent<HTMLAnchorElement>) => void;
}

const Header: FC<HeaderProps> = ({ pageActive, productsInCart, onPageLinkClick }) => {
    const getClassName = (pageName: PageName) =>
        pageName === pageActive ? `${styles.headerPageLink} ${styles.headerPageLinkActive}` : styles.headerPageLink;

    return (
        <header className={styles.header}>
            <div className={styles.headerContainer}>
                <a href="./">
                    <IconLogo className={styles.headerLogoIcon} />
                </a>

                <div className={styles.headerThemeModeBtns}>
                    <button className={styles.headerThemeModeBtn}>
                        <IconThemeLight className={styles.headerThemeModeBtnIcon} />
                    </button>
                    <IconThemeDivider />
                    <button className={combineClasses(styles.headerThemeModeBtn, styles.headerThemeModeBtnActive)}>
                        <IconThemeDark className={styles.headerThemeModeBtnIcon} />
                    </button>
                </div>

                <div className={styles.headerPageLinks}>
                    <a className={getClassName(PageName.ABOUT)} href="#about" data-page="about" onClick={onPageLinkClick}>
                        About
                    </a>
                    <a className={getClassName(PageName.PRODUCTS)} href="#products" data-page="products" onClick={onPageLinkClick}>
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
