import IconCart from '../../assets/images/icons/cart.svg?react';
import IconLogo from '../../assets/images/icons/logo.svg?react';
import IconMenuBurger from '../../assets/images/icons/menu-burger.svg?react';
import IconSignin from '../../assets/images/icons/sign-in.svg?react';
import IconSignup from '../../assets/images/icons/sign-up.svg?react';
import IconThemeDark from '../../assets/images/icons/theme-mode-dark.svg?react';
import IconThemeDivider from '../../assets/images/icons/theme-mode-divider.svg?react';
import IconThemeLight from '../../assets/images/icons/theme-mode-light.svg?react';
import { combineClasses } from '../../utils/combineClasses';

import styles from './header.module.css';

function Header() {
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

                    <button className={combineClasses([styles.headerThemeModeBtn, styles.headerThemeModeBtnActive])}>
                        <IconThemeDark className={styles.headerThemeModeBtnIcon} />
                    </button>
                </div>

                <div className={styles.headerPageLinks}>
                    <a className={combineClasses([styles.headerPageLink, styles.headerPageLinkActive])} href="#about">
                        About
                    </a>
                    <a className={styles.headerPageLink} href="#products">
                        Products
                    </a>
                </div>

                <button className={styles.headerCartBtn}>
                    <IconCart className={styles.headerCartIcon} />
                </button>

                <div className={styles.headerAuthBtns}>
                    <button className={combineClasses([styles.headerAuthBtn, styles.headerAuthBtnDark])}>
                        <IconSignin className={styles.headerAuthBtnIcon} />
                        Login
                    </button>

                    <button className={combineClasses([styles.headerAuthBtn, styles.headerAuthBtnAccent])}>
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
}

export { Header };
